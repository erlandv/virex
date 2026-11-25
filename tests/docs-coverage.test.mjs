import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DOCS_DIR = path.resolve(process.cwd(), 'src/content/docs');

test('Documentation Coverage & Frontmatter Integrity', async (t) => {
  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

  await t.test('documents collection has at least 20 comprehensive guides', () => {
    assert.ok(files.length >= 20, `Expected at least 20 doc files, found ${files.length}`);
  });

  const parsedDocs = [];
  const slugs = new Set();

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const slug = file.replace(/\.(md|mdx)$/, '');
    slugs.add(slug);

    // Parse frontmatter
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(match, `File ${file} must have valid YAML frontmatter delimiters`);

    const fmLines = match[1].split(/\r?\n/);
    const fm = {};
    for (const line of fmLines) {
      const kv = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
      if (kv) {
        let val = kv[2].trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        fm[kv[1]] = val;
      }
    }

    parsedDocs.push({ file, slug, fm, content });
  }

  await t.test('all docs have mandatory frontmatter fields', () => {
    for (const doc of parsedDocs) {
      assert.ok(doc.fm.title, `${doc.file} missing title`);
      assert.ok(doc.fm.description, `${doc.file} missing description`);
      assert.ok(doc.fm.category, `${doc.file} missing category`);
      assert.ok(doc.fm.icon, `${doc.file} missing icon`);
      assert.ok(doc.fm.order !== undefined, `${doc.file} missing order`);
    }
  });

  await t.test('all internal /docs/ links reference valid documentation slugs', () => {
    for (const doc of parsedDocs) {
      const linkMatches = [...doc.content.matchAll(/\[([^\]]+)\]\((\/docs\/[a-z0-9-]+)\)/g)];
      for (const m of linkMatches) {
        const targetSlug = m[2].replace('/docs/', '');
        assert.ok(
          slugs.has(targetSlug),
          `${doc.file} references invalid internal link: ${m[2]} (slug "${targetSlug}" does not exist)`
        );
      }
    }
  });

  await t.test('all expected categories are covered with dedicated articles', () => {
    const categories = new Set(parsedDocs.map((d) => d.fm.category));
    const requiredCategories = [
      'Getting Started',
      'Channels',
      'Fintech & M-Pesa',
      'Team Operations',
      'AI Automation',
      'Developer APIs',
      'Troubleshooting',
    ];

    for (const reqCat of requiredCategories) {
      assert.ok(
        categories.has(reqCat),
        `Required category "${reqCat}" must be present across documentation set`
      );
    }
  });

  await t.test('all 6 core communication channels are documented', () => {
    assert.ok(slugs.has('whatsapp-cloud'), 'WhatsApp Cloud documentation missing');
    assert.ok(slugs.has('website-live-chat'), 'Website Live Chat documentation missing');
    assert.ok(slugs.has('facebook-messenger'), 'Facebook Messenger documentation missing');
    assert.ok(slugs.has('instagram-dm'), 'Instagram DM documentation missing');
    assert.ok(slugs.has('telegram-bot'), 'Telegram Bot documentation missing');
    assert.ok(slugs.has('sms-gateway'), 'SMS Gateway documentation missing');
    assert.ok(slugs.has('email-inbox'), 'Email Inbox documentation missing');
  });

  await t.test('all developer APIs and webhooks are documented', () => {
    assert.ok(slugs.has('api-overview'), 'API Overview documentation missing');
    assert.ok(slugs.has('contacts-api'), 'Contacts API documentation missing');
    assert.ok(slugs.has('conversations-api'), 'Conversations API documentation missing');
    assert.ok(slugs.has('webhooks'), 'Webhooks documentation missing');
  });

  await t.test('Kenyan mobile money modes are documented', () => {
    assert.ok(slugs.has('mpesa-setup'), 'M-Pesa Setup documentation missing');
    assert.ok(slugs.has('daraja-c2b-callbacks'), 'Daraja C2B Callbacks documentation missing');
    assert.ok(slugs.has('pochi-android-bridge'), 'Pochi Android Bridge documentation missing');
  });
});
