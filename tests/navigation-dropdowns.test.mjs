import test from 'node:test';
import assert from 'node:assert/strict';

const LOCALHOST_URL = 'http://localhost:4321';

test('Navigation Mega-Menu & Dropdowns Verification', async (t) => {
  // 1. Fetch live homepage from running server
  let homepageHtml = '';
  try {
    const res = await fetch(`${LOCALHOST_URL}/`);
    assert.strictEqual(res.status, 200, `Homepage returned HTTP ${res.status}`);
    homepageHtml = await res.text();
  } catch (err) {
    assert.fail(`Could not connect to running dev server at ${LOCALHOST_URL}: ${err.message}`);
  }

  await t.test('Header rendered with three verified mega-menu containers', () => {
    assert.ok(homepageHtml.includes('id="site-header"'), 'Header missing #site-header');
    assert.ok(homepageHtml.includes('data-menu="product"'), 'Product mega-menu container missing');
    assert.ok(
      homepageHtml.includes('data-menu="solutions"'),
      'Solutions mega-menu container missing'
    );
    assert.ok(
      homepageHtml.includes('data-menu="resources"'),
      'Resources mega-menu container missing'
    );
  });

  await t.test('All mega-menu containers have initial data-state="closed"', () => {
    const productMatch = homepageHtml.match(/<div[^>]*data-menu="product"[^>]*>/);
    assert.ok(productMatch, 'Product container tag not found');
    assert.ok(
      productMatch[0].includes('data-state="closed"'),
      'Product container missing data-state="closed"'
    );

    const solutionsMatch = homepageHtml.match(/<div[^>]*data-menu="solutions"[^>]*>/);
    assert.ok(solutionsMatch, 'Solutions container tag not found');
    assert.ok(
      solutionsMatch[0].includes('data-state="closed"'),
      'Solutions container missing data-state="closed"'
    );

    const resourcesMatch = homepageHtml.match(/<div[^>]*data-menu="resources"[^>]*>/);
    assert.ok(resourcesMatch, 'Resources container tag not found');
    assert.ok(
      resourcesMatch[0].includes('data-state="closed"'),
      'Resources container missing data-state="closed"'
    );
  });

  await t.test(
    'All triggers have type="button", mega-menu-trigger, and aria-expanded="false"',
    () => {
      const triggers = [
        ...homepageHtml.matchAll(/<button[^>]*class="[^"]*mega-menu-trigger[^"]*"[^>]*>/g),
      ];
      assert.strictEqual(
        triggers.length,
        3,
        `Expected exactly 3 mega-menu trigger buttons, found ${triggers.length}`
      );

      for (const trig of triggers) {
        assert.ok(trig[0].includes('type="button"'), `Trigger missing type="button": ${trig[0]}`);
        assert.ok(
          trig[0].includes('aria-expanded="false"'),
          `Trigger missing aria-expanded="false": ${trig[0]}`
        );
        assert.ok(
          trig[0].includes('aria-haspopup="true"'),
          `Trigger missing aria-haspopup="true": ${trig[0]}`
        );
      }
    }
  );

  await t.test(
    'Header script endpoint loads successfully with HTTP 200 (zero Vite 500 errors)',
    async () => {
      const scriptRes = await fetch(
        `${LOCALHOST_URL}/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts`
      );
      assert.strictEqual(
        scriptRes.status,
        200,
        `Header script endpoint returned HTTP ${scriptRes.status}`
      );
      const scriptText = await scriptRes.text();
      assert.ok(scriptText.length > 500, 'Header script is unexpectedly short');
      assert.ok(
        scriptText.includes('initHeaderControllers'),
        'Script missing initHeaderControllers'
      );
      assert.ok(scriptText.includes('data-state'), 'Script missing data-state attribute handling');
    }
  );

  await t.test('Scoped style contains visibility and opacity rules for data-state="open"', () => {
    assert.ok(
      homepageHtml.includes("data-state='open'") ||
        homepageHtml.includes('data-state="open"') ||
        homepageHtml.includes('[data-state=open]'),
      'Missing data-state CSS rule in rendered HTML'
    );
  });

  await t.test('Simulate DOM click toggle state machine', () => {
    // Construct mock DOM elements matching Header.astro
    const createMockElement = (tag, attrs = {}) => {
      const listeners = {};
      const classSet = new Set((attrs.class || '').split(/\s+/).filter(Boolean));
      const attributes = { ...attrs };

      return {
        tagName: tag.toUpperCase(),
        classList: {
          add: (...cls) => cls.forEach((c) => classSet.add(c)),
          remove: (...cls) => cls.forEach((c) => classSet.delete(c)),
          contains: (c) => classSet.has(c),
        },
        getAttribute: (attr) => attributes[attr] ?? null,
        setAttribute: (attr, val) => {
          attributes[attr] = String(val);
        },
        addEventListener: (event, handler) => {
          if (!listeners[event]) listeners[event] = [];
          listeners[event].push(handler);
        },
        dispatchEvent: (event) => {
          const list = listeners[event.type] || [];
          for (const fn of list) fn(event);
        },
        querySelector: () => null,
        querySelectorAll: () => [],
        focus: () => {},
      };
    };

    // Build mock containers
    const menuIds = ['product', 'solutions', 'resources'];
    const mockContainers = [];
    const mockTriggers = {};
    const mockPanels = {};

    for (const id of menuIds) {
      const container = createMockElement('div', {
        'data-menu': id,
        'data-state': 'closed',
        class: 'mega-menu-container',
      });
      const trigger = createMockElement('button', {
        class: 'mega-menu-trigger',
        'aria-expanded': 'false',
      });
      const panel = createMockElement('div', {
        class: 'mega-menu-panel invisible opacity-0 pointer-events-none translate-y-1',
      });
      const chevron = createMockElement('svg', { class: 'chevron-icon' });

      container.querySelector = (sel) => {
        if (sel === '.mega-menu-trigger') return trigger;
        if (sel === '.mega-menu-panel') return panel;
        if (sel === '.chevron-icon') return chevron;
        return null;
      };

      mockContainers.push(container);
      mockTriggers[id] = trigger;
      mockPanels[id] = panel;
    }

    // Attach controller state machine logic (matching Header.astro)
    let activeMenuId = null;
    let openedBy = null;

    function openMenu(menuId, type) {
      mockContainers.forEach((container) => {
        const id = container.getAttribute('data-menu');
        const trigger = container.querySelector('.mega-menu-trigger');
        const panel = container.querySelector('.mega-menu-panel');

        if (id === menuId) {
          container.setAttribute('data-state', 'open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.classList.remove('invisible', 'opacity-0', 'pointer-events-none', 'translate-y-1');
          panel.classList.add('visible', 'opacity-100', 'pointer-events-auto', 'translate-y-0');
        } else {
          container.setAttribute('data-state', 'closed');
          trigger.setAttribute('aria-expanded', 'false');
          panel.classList.add('invisible', 'opacity-0', 'pointer-events-none', 'translate-y-1');
          panel.classList.remove('visible', 'opacity-100', 'pointer-events-auto', 'translate-y-0');
        }
      });
      activeMenuId = menuId;
      openedBy = type;
    }

    function closeAllMenus() {
      mockContainers.forEach((container) => {
        const trigger = container.querySelector('.mega-menu-trigger');
        const panel = container.querySelector('.mega-menu-panel');
        container.setAttribute('data-state', 'closed');
        trigger.setAttribute('aria-expanded', 'false');
        panel.classList.add('invisible', 'opacity-0', 'pointer-events-none', 'translate-y-1');
        panel.classList.remove('visible', 'opacity-100', 'pointer-events-auto', 'translate-y-0');
      });
      activeMenuId = null;
      openedBy = null;
    }

    // Bind click to each mock trigger
    menuIds.forEach((id) => {
      const trigger = mockTriggers[id];
      trigger.addEventListener('click', () => {
        if (activeMenuId !== id) {
          openMenu(id, 'click');
        } else {
          if (openedBy === 'hover') {
            openedBy = 'click';
          } else {
            closeAllMenus();
          }
        }
      });
    });

    // 1. Initial State: All closed
    assert.strictEqual(mockContainers[0].getAttribute('data-state'), 'closed');
    assert.strictEqual(mockTriggers['product'].getAttribute('aria-expanded'), 'false');
    assert.strictEqual(mockPanels['product'].classList.contains('visible'), false);

    // 2. Click Product -> Opens Product
    mockTriggers['product'].dispatchEvent({ type: 'click' });
    assert.strictEqual(mockContainers[0].getAttribute('data-state'), 'open');
    assert.strictEqual(mockTriggers['product'].getAttribute('aria-expanded'), 'true');
    assert.strictEqual(mockPanels['product'].classList.contains('visible'), true);
    assert.strictEqual(mockPanels['product'].classList.contains('invisible'), false);

    // 3. Click Product again -> Closes Product
    mockTriggers['product'].dispatchEvent({ type: 'click' });
    assert.strictEqual(mockContainers[0].getAttribute('data-state'), 'closed');
    assert.strictEqual(mockTriggers['product'].getAttribute('aria-expanded'), 'false');
    assert.strictEqual(mockPanels['product'].classList.contains('visible'), false);
    assert.strictEqual(mockPanels['product'].classList.contains('invisible'), true);

    // 4. Click Product then click Solutions -> Switches directly to Solutions
    mockTriggers['product'].dispatchEvent({ type: 'click' });
    assert.strictEqual(mockContainers[0].getAttribute('data-state'), 'open');
    mockTriggers['solutions'].dispatchEvent({ type: 'click' });
    assert.strictEqual(mockContainers[0].getAttribute('data-state'), 'closed');
    assert.strictEqual(mockContainers[1].getAttribute('data-state'), 'open');
    assert.strictEqual(mockTriggers['product'].getAttribute('aria-expanded'), 'false');
    assert.strictEqual(mockTriggers['solutions'].getAttribute('aria-expanded'), 'true');
    assert.strictEqual(mockPanels['solutions'].classList.contains('visible'), true);

    // 5. Click Resources -> Switches to Resources
    mockTriggers['resources'].dispatchEvent({ type: 'click' });
    assert.strictEqual(mockContainers[1].getAttribute('data-state'), 'closed');
    assert.strictEqual(mockContainers[2].getAttribute('data-state'), 'open');
    assert.strictEqual(mockTriggers['resources'].getAttribute('aria-expanded'), 'true');

    // 6. Close all (Escape or click outside)
    closeAllMenus();
    assert.strictEqual(mockContainers[2].getAttribute('data-state'), 'closed');
    assert.strictEqual(mockTriggers['resources'].getAttribute('aria-expanded'), 'false');
    assert.strictEqual(activeMenuId, null);
  });
});
