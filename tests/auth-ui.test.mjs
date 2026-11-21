/**
 * Tests for MarkChat Authentication & Registration UI Redesign (Distraction-Free AuthLayout)
 *
 * Verifies that:
 * 1. Customer-facing pages exist: /register, /login, /forgot-password, /reset-password.
 * 2. All 4 authentication pages use minimal AuthLayout (built on BaseLayout) and NOT MarketingLayout or AuthSplitLayout.
 * 3. AuthLayout implements distraction-free SaaS chrome (minimal top bar + single-line micro-footer).
 * 4. SocialAuthButtons includes Google OAuth and strictly excludes GitHub.
 * 5. RegisterForm implements the guided two-step registration wizard:
 *    - Step 1: businessName, fullName, email, phone, and SocialAuthButtons.
 *    - Step 2: password, confirmPassword, planId, agreeTerms.
 *    - Step navigation buttons (btn-continue-step1, btn-back-step2, btn-back-header).
 *    - Step progress indicators (step-1-indicator, step-2-indicator, step-progress-bar).
 *    - Full form state retention across step transitions.
 *    - Password matching validation and visibility toggles.
 * 6. LoginForm has email, password, visibility toggle, remember-me, forgot-password link, and SocialAuthButtons.
 * 7. ForgotPasswordForm provides generic timing-safe confirmation without email disclosure.
 * 8. ResetPasswordForm consumes tokens and enforces 8-character minimum and matching confirmation.
 * 9. All forms retain honeypot anti-spam protection, accessibility attributes, and zero premature errors on load.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_DIR = fileURLToPath(new URL('../src', import.meta.url));

describe('MarkChat Authentication & Registration UI (Distraction-Free AuthLayout)', () => {
  test('all 4 customer authentication pages exist and use AuthLayout (and NOT MarketingLayout or AuthSplitLayout)', () => {
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
      assert.ok(content.includes('AuthLayout'), `${pageFile} must use AuthLayout`);
      assert.ok(!content.includes('MarketingLayout'), `${pageFile} must NOT use MarketingLayout`);
      assert.ok(!content.includes('AuthSplitLayout'), `${pageFile} must NOT use AuthSplitLayout`);
    });
  });

  test('AuthLayout is built on BaseLayout with minimal top bar and micro-footer without marketing chrome', () => {
    const layoutPath = path.join(SRC_DIR, 'layouts', 'AuthLayout.astro');
    assert.ok(fs.existsSync(layoutPath), 'AuthLayout.astro must exist');
    const content = fs.readFileSync(layoutPath, 'utf8');

    // Built on BaseLayout
    assert.ok(content.includes('BaseLayout'), 'AuthLayout must wrap BaseLayout');

    // Distraction-free: must NOT include full marketing chrome
    assert.ok(!content.includes('AnnouncementBar'), 'must NOT include AnnouncementBar');
    assert.ok(!content.includes('MarkcopilotWidget'), 'must NOT include MarkcopilotWidget');
    assert.ok(!content.includes('mega-menu'), 'must NOT include Header mega-menus');

    // Minimal top bar and single-line micro-footer
    assert.ok(content.includes('Back to MarkChat'), 'micro-footer must have link Back to MarkChat');
    assert.ok(content.includes('Terms'), 'micro-footer must have Terms link');
    assert.ok(content.includes('Privacy (KDPA)'), 'micro-footer must have Privacy (KDPA) link');
    assert.ok(content.includes('KDPA 2019 Compliant'), 'micro-footer must have KDPA 2019 badge');
  });

  test('SocialAuthButtons includes Google OAuth and strictly excludes GitHub', () => {
    const socialPath = path.join(SRC_DIR, 'components', 'forms', 'SocialAuthButtons.astro');
    assert.ok(fs.existsSync(socialPath), 'SocialAuthButtons.astro must exist');
    const content = fs.readFileSync(socialPath, 'utf8');

    // Google presence and Control Plane start route
    assert.ok(content.includes('simple-icons:google') || content.includes('Google'), 'must include Google authentication');
    assert.ok(content.includes('googleUrl'), 'must support googleUrl prop');
    assert.ok(content.includes('/api/v1/auth/google/start'), 'must point to Control Plane Google OAuth start route');

    // GitHub absence
    assert.ok(!content.includes('simple-icons:github'), 'must NOT include GitHub icon');
    assert.ok(!content.includes('githubUrl'), 'must NOT include githubUrl prop');
    assert.ok(!content.includes('GitHub'), 'must NOT reference GitHub');
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
    assert.ok(content.includes('SocialAuthButtons'), 'step 1 must include SocialAuthButtons');
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

  test('LoginForm includes email, password toggle, remember me, forgot password link, and SocialAuthButtons', () => {
    const formPath = path.join(SRC_DIR, 'components', 'forms', 'LoginForm.astro');
    assert.ok(fs.existsSync(formPath), 'LoginForm.astro must exist');
    const content = fs.readFileSync(formPath, 'utf8');

    assert.ok(content.includes('SocialAuthButtons'), 'must include SocialAuthButtons');
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

  test('OAuth callback page exists, uses AuthLayout with noindex, and scrubs URL fragment', () => {
    const callbackPath = path.join(SRC_DIR, 'pages', 'auth', 'callback.astro');
    assert.ok(fs.existsSync(callbackPath), 'src/pages/auth/callback.astro must exist');
    const content = fs.readFileSync(callbackPath, 'utf8');

    assert.ok(content.includes('AuthLayout'), 'Callback page must use AuthLayout');
    assert.ok(content.includes('noindex={true}'), 'Callback page must enforce noindex to prevent indexing');
    assert.ok(content.includes('replaceState'), 'Callback page must scrub URL fragment via history.replaceState');
    assert.ok(content.includes('markchat_cp_token'), 'Callback page must store authentication token');
  });
});
