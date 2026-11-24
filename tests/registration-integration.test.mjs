/**
 * MarkChat Batch 5: Registration & Provisioning Integration Verification Tests
 *
 * Verifies that the marketing registration frontend integrates directly with the
 * Control Plane registration saga API (/api/v1/registration), ensures durable
 * idempotency, implements polling for asynchronous provisioning, handles SSO
 * redirection, and sanitizes errors without leaking stack traces.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const marketingRoot = path.resolve(__dirname, '..');

describe('Batch 5: Registration and Provisioning Integration', () => {
  const registerFormPath = path.join(
    marketingRoot,
    'src',
    'components',
    'forms',
    'RegisterForm.astro'
  );
  const registerFormSource = fs.readFileSync(registerFormPath, 'utf8');

  test('RegisterForm includes API URL data attribute and honeypot field', () => {
    assert.match(
      registerFormSource,
      /data-api-url=\{controlPlaneUrl\}/,
      'Form must include data-api-url configured for Control Plane API'
    );
    assert.match(
      registerFormSource,
      /name="_gotcha"/,
      'Form must include hidden honeypot input for anti-bot defense'
    );
  });

  test('RegisterForm submit handler generates and persists Idempotency-Key in sessionStorage', () => {
    assert.match(
      registerFormSource,
      /sessionStorage\.getItem\(['"]markchat_reg_idempotency_key['"]\)/,
      'Must check sessionStorage for durable idempotency key'
    );
    assert.match(
      registerFormSource,
      /'Idempotency-Key':\s*idempotencyKey/,
      'Must inject Idempotency-Key header into registration request'
    );
    assert.match(
      registerFormSource,
      /sessionStorage\.setItem\(['"]markchat_reg_idempotency_key['"]/,
      'Must persist generated key in sessionStorage'
    );
  });

  test('Form payload matches Control Plane registration contract', () => {
    // Check that all required contract fields are gathered
    assert.match(registerFormSource, /businessName/, 'Payload must contain businessName');
    assert.match(registerFormSource, /fullName/, 'Payload must contain fullName');
    assert.match(registerFormSource, /email/, 'Payload must contain email');
    assert.match(registerFormSource, /password/, 'Payload must contain password');
    assert.match(registerFormSource, /planId/, 'Payload must contain planId');

    // Verify endpoint path
    assert.match(
      registerFormSource,
      /\/api\/v1\/registration/,
      'Must dispatch to /api/v1/registration'
    );
  });

  test('Asynchronous saga polling loop handles status lifecycle', () => {
    assert.match(
      registerFormSource,
      /\/api\/v1\/registration\/\$\{registrationId\}/,
      'Must query registration status endpoint during polling'
    );
    assert.match(
      registerFormSource,
      /statusData\.status === 'completed'/,
      'Must check for completed saga status'
    );
    assert.match(
      registerFormSource,
      /statusData\.status === 'failed'/,
      'Must check for failed saga status'
    );
    assert.match(
      registerFormSource,
      /maxAttempts/,
      'Must enforce a bounded maximum polling count to prevent infinite polling'
    );
  });

  test('SSO redirect and error sanitization integrity', () => {
    assert.match(
      registerFormSource,
      /statusData\.ssoUrl/,
      'Must consume ssoUrl provided by Control Plane on completion'
    );
    assert.match(
      registerFormSource,
      /sessionStorage\.removeItem\(['"]markchat_reg_idempotency_key['"]\)/,
      'Must clear idempotency key upon successful provisioning'
    );
    assert.match(
      registerFormSource,
      /!errData\.message\.includes\(['"]stack['"]\)/,
      'Must sanitize error messages to prevent exposing stack traces to customers'
    );
  });
});
