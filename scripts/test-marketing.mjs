/**
 * Cross-platform full Marketing test suite runner.
 * Requires a successful static build before testing.
 * The runner owns the preview process to avoid tests accidentally hitting a stale website.
 */
import { spawn } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { createServer } from 'node:net';

const port = '4321';
const url = 'http://localhost:' + port + '/';
if (!existsSync(path.resolve('dist/index.html'))) {
  console.error('Missing dist/index.html: run npm run build before npm test.');
  process.exit(1);
}

// Run Astro directly instead of spawning npm, so shutdown does not orphan a child.
let preview;

let previewOutput = '';

async function waitForPreview() {
  for (let attempt = 0; attempt < 60; attempt++) {
    if (preview?.exitCode !== null) break;
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(700) });
      if (response.ok) return;
    } catch {
      /* still initializing */
    }
    await delay(350);
  }
  throw new Error(
    'Astro preview did not become available on port ' + port + '. ' + previewOutput.slice(-1500)
  );
}

async function assertPortFree() {
  const probe = createServer();
  await new Promise((resolve, reject) => {
    probe.once('error', reject);
    probe.listen(Number(port), '127.0.0.1', resolve);
  });
  await new Promise((resolve) => probe.close(resolve));
}

async function run() {
  try {
    // Refuse to run tests against some other existing site on the same port.
    await assertPortFree();
    preview = spawn(
      process.execPath,
      [
        path.resolve('node_modules/astro/astro.js'),
        'preview',
        '--host',
        'localhost',
        '--port',
        port,
      ],
      { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'] }
    );
    preview.stdout?.on('data', (chunk) => {
      previewOutput += String(chunk);
    });
    preview.stderr?.on('data', (chunk) => {
      previewOutput += String(chunk);
    });
    await waitForPreview();
    const tests = readdirSync('tests')
      .filter((filename) => filename.endsWith('.test.mjs'))
      .sort();
    const runner = spawn(
      process.execPath,
      ['--experimental-strip-types', '--test', ...tests.map((name) => path.join('tests', name))],
      {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'test' },
      }
    );
    const code = await new Promise((resolve) => {
      runner.on('error', (error) => {
        console.error(error);
        resolve(1);
      });
      runner.on('exit', (status) => resolve(status ?? 1));
    });
    process.exitCode = code;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    preview?.kill();
  }
}

await run();
