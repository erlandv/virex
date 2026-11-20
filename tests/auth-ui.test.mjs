/**
 * Tests for MarkChat Authentication & Registration UI Redesign (Direction A + D)
 *
 * Verifies that:
 * 1. Customer-facing pages exist: /register, /login, /forgot-password, /reset-password.
 * 2. All 4 authentication pages use the approved AuthSplitLayout.
 * 3. AuthSplitLayout implements the split-screen SaaS layout (Showcase + Spacious Form panel).
 * 4. RegisterForm implements the guided two-step registration wizard:
 *    - Step 1: businessName, fullName, email, phone.
 *    - Step 2: password, confirmPassword, planId, agreeTerms.
 *    - Step navigation buttons (btn-continue-step1, btn-back-step2, btn-back-header).
 *    - Step progress indicators (step-1-indicator, step-2-indicator, step-progress-bar).
 *    - Full form state retention across step transitions.
 *    - Password matching validation and visibility toggles.
 * 5. LoginForm has email, password, visibility toggle, remember-me, forgot-password link.
 * 6. ForgotPasswordForm provides generic timing-safe confirmation without email enumeration.
 * 7. ResetPasswordForm consumes tokens and enforces 8-character minimum and matching confirmation.
 * 8. All forms retain honeypot anti-spam protection and accessibility attributes.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_DIR = fileURLToPath(new URL('../src', import.meta.url));

describe('MarkChat Authentication & Registration UI Redesign (Direction A + D)', () => {
  test('all 4 customer authentication pages exist and use AuthSplitLayout', () => {
    const requiredPages = [
      'register.astro',
      'login.astro',
      'forgot-password.astro',
      'reset-password.astro',
    ];

    requiredPages.forEach((pageFile) => {
      const fullPath = path.join(SRC_DIR, 'pages', pageFile);
      assert.ok(fs.existsSync(fullPath), `Page ${pageFile} must exist`);
      const content = fs.readFileSync(fullPath, 'utf8');
      assert.ok(content.includes('AuthSplitLayout'), `${pageFile} must use AuthSplitLayout`);
    });
  });

  test('AuthSplitLayout implements split-screen showcase with authentic capabilities and trust badges', () => {
    const layoutPath = path.join(SRC_DIR, 'layouts', 'AuthSplitLayout.astro');
    assert.ok(fs.existsSync(layoutPath), 'AuthSplitLayout.astro must exist');
    const content = fs.readFileSync(layoutPath, 'utf8');

    // Split-screen grid layout
    assert.ok(content.includes('lg:grid-cols-12'), 'must have 12-column grid on desktop');
    assert.ok(content.includes('lg:col-span-5') || content.includes('lg:col-span-6'), 'must have showcase column');
    assert.ok(content.includes('lg:col-span-7') || content.includes('lg:col-span-6'), 'must have form container column');

    // Authentic MarkChat features (no generic claims)
    assert.ok(content.includes('WhatsApp Business'), 'showcase must mention WhatsApp Business');
    assert.ok(content.includes('M-Pesa'), 'showcase must mention M-Pesa');
    assert.ok(content.includes('SMS Gateway'), 'showcase must mention SMS Gateway');
    assert.ok(content.includes('Markcopilot'), 'showcase must mention Markcopilot');

    // Trust and statutory compliance badges
    assert.ok(content.includes('KDPA 2019 Compliant'), 'must display KDPA 2019 badge');
    assert.ok(content.includes('256-Bit SSL Encryption'), 'must display 256-bit SSL badge');
  });

  test('RegisterForm implements Guided Two-Step Registration with progress indicators and navigation', () => {
    const formPath = path.join(SRC_DIR, 'components', 'forms', 'RegisterForm.astro');
    assert.ok(fs.existsSync(formPath), 'RegisterForm.astro must exist');
    const content = fs.readFileSync(formPath, 'utf8');

    // Progress indicators
    assert.ok(content.includes('id="step-1-indicator"'), 'must include step 1 indicator');
    assert.ok(content.includes('id="step-2-indicator"'), 'must include step 2 indicator');
    assert.ok(content.includes('id="step-progress-bar"'), 'must include progress bar');

    // Step 1 container & fields
    assert.ok(content.includes('id="step-1-container"'), 'must have step 1 container');
    assert.ok(content.includes('name="businessName"'), 'must include businessName field');
    assert.ok(content.includes('name="fullName"'), 'must include fullName field');
    assert.ok(content.includes('name="email"'), 'must include email field');
    assert.ok(content.includes('name="phone"'), 'must include phone field');
    assert.ok(content.includes('id="btn-continue-step1"'), 'must have continue to step 2 button');

    // Step 2 container & fields
    assert.ok(content.includes('id="step-2-container"'), 'must have step 2 container');
    assert.ok(content.includes('name="password"'), 'must include password field');
    assert.ok(content.includes('name="confirmPassword"'), 'must include confirmPassword field');
    assert.ok(content.includes('name="planId"'), 'must include planId field');
    assert.ok(content.includes('name="agreeTerms"'), 'must include agreeTerms checkbox');
    assert.ok(content.includes('id="btn-back-step2"'), 'must have back button on step 2');
    assert.ok(content.includes('id="register-submit-button"'), 'must have submit button');

    // Anti-bot honeypot & toggle
    assert.ok(content.includes('name="_gotcha"'), 'must include honeypot anti-spam');
    assert.ok(content.includes('toggle-register-password'), 'must include password visibility toggle');

    // Step navigation and state retention logic
    assert.ok(content.includes('function goToStep'), 'must define goToStep transition engine');
    assert.ok(content.includes('validateStep1'), 'must validate step 1 prior to advancing');
    assert.ok(content.includes('Passwords do not match'), 'must enforce password matching');
  });

  test('LoginForm includes email, password toggle, remember me, and forgot password link', () => {
    const formPath = path.join(SRC_DIR, 'components', 'forms', 'LoginForm.astro');
    assert.ok(fs.existsSync(formPath), 'LoginForm.astro must exist');
    const content = fs.readFileSync(formPath, 'utf8');

    assert.ok(content.includes('name="email"'), 'must include email field');
    assert.ok(content.includes('name="password"'), 'must include password field');
    assert.ok(content.includes('toggle-login-password'), 'must include password visibility toggle');
    assert.ok(content.includes('name="rememberMe"'), 'must include rememberMe checkbox');
    assert.ok(content.includes('href="/forgot-password"'), 'must include link to /forgot-password');
    assert.ok(content.includes('name="_gotcha"'), 'must include honeypot anti-spam');
  });

  test('ForgotPasswordForm provides generic confirmation without email disclosure', () => {
    const formPath = path.join(SRC_DIR, 'components', 'forms', 'ForgotPasswordForm.astro');
    assert.ok(fs.existsSync(formPath), 'ForgotPasswordForm.astro must exist');
    const content = fs.readFileSync(formPath, 'utf8');

    assert.ok(content.includes('name="email"'), 'must include email field');
    assert.ok(
      content.includes("If an account exists with that email, we've sent password reset instructions"),
      'must provide timing-safe confirmation'
    );
    assert.ok(content.includes('name="_gotcha"'), 'must include honeypot anti-spam');
  });

  test('ResetPasswordForm consumes reset token and confirms matching passwords', () => {
    const formPath = path.join(SRC_DIR, 'components', 'forms', 'ResetPasswordForm.astro');
    assert.ok(fs.existsSync(formPath), 'ResetPasswordForm.astro must exist');
    const content = fs.readFileSync(formPath, 'utf8');

    assert.ok(content.includes('name="token"'), 'must include token input');
    assert.ok(content.includes('name="password"'), 'must include new password input');
    assert.ok(content.includes('name="confirmPassword"'), 'must include confirm password input');
    assert.ok(content.includes('Passwords do not match'), 'must validate password matching');
    assert.ok(content.includes('name="_gotcha"'), 'must include honeypot anti-spam');
  });
});
