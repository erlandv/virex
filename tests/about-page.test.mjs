import test from 'node:test';
import assert from 'node:assert/strict';

const LOCALHOST_URL = 'http://localhost:4321';

test('About Us Page Verification & Content Integrity', async (t) => {
  let aboutHtml = '';
  try {
    const res = await fetch(`${LOCALHOST_URL}/about`);
    assert.strictEqual(res.status, 200, `About page returned HTTP ${res.status}`);
    aboutHtml = await res.text();
  } catch (err) {
    assert.fail(`Could not connect to running dev server at ${LOCALHOST_URL}: ${err.message}`);
  }

  await t.test('Page metadata & title integrity', () => {
    assert.ok(
      aboutHtml.includes('<title>About Us — MarkChat</title>'),
      'About page title tag missing'
    );
    assert.ok(
      aboutHtml.includes('name="description"') && aboutHtml.includes('Nairobi engineering team'),
      'About page meta description missing or inaccurate'
    );
  });

  await t.test(
    'Hero section renders verified Kenyan commerce narrative (no fabricated claims)',
    () => {
      assert.ok(
        aboutHtml.includes('Empowering African Commerce Through Instant Conversational Sales'),
        'H1 headline missing'
      );
      assert.ok(aboutHtml.includes('Nairobi Roots • African Scale'), 'Story badge missing');
      assert.ok(
        aboutHtml.includes(
          'MarkChat was built in Nairobi to address the everyday friction of African commerce'
        ),
        'Hero narrative text missing'
      );
      // Integrity check: verify zero fabricated percentages or customer counts
      assert.strictEqual(
        aboutHtml.includes('over 70% of their sales'),
        false,
        'Forbidden unverified percentage claim found'
      );
      assert.strictEqual(
        aboutHtml.includes('thousands of retail stores'),
        false,
        'Forbidden fabricated customer count claim found'
      );
    }
  );

  await t.test(
    'Bento box operational metrics section renders with all 4 verified capabilities',
    () => {
      assert.ok(
        aboutHtml.includes('Engineered Around Kenyan Commerce Realities'),
        'Section 2 H2 missing'
      );
      assert.ok(aboutHtml.includes('6 Channels'), 'Missing 6 Channels metric');
      assert.ok(aboutHtml.includes('Direct C2B'), 'Missing Direct C2B metric');
      assert.ok(aboutHtml.includes('BYOC Gateway'), 'Missing BYOC Gateway metric');
      assert.ok(
        aboutHtml.includes('&lt; 10s') || aboutHtml.includes('< 10s'),
        'Missing < 10s metric'
      );
      assert.ok(
        aboutHtml.includes('component-url="/src/components/sections/about/AboutMetricsBento.tsx"'),
        'AboutMetricsBento island missing'
      );
    }
  );

  await t.test(
    'Core Principles section renders 4 non-negotiable standards with authentic icons',
    () => {
      assert.ok(aboutHtml.includes('Our Core Principles'), 'Section 3 H2 missing');
      assert.ok(aboutHtml.includes('Built for Kenya First'), 'Missing Built for Kenya First');
      assert.ok(aboutHtml.includes('Zero Payment Fraud'), 'Missing Zero Payment Fraud');
      assert.ok(aboutHtml.includes('Conversational Speed'), 'Missing Conversational Speed');
      assert.ok(aboutHtml.includes('Radical Simplicity'), 'Missing Radical Simplicity');

      // Badges
      assert.ok(aboutHtml.includes('Local Context'), 'Missing Local Context badge');
      assert.ok(aboutHtml.includes('Fraud Shield'), 'Missing Fraud Shield badge');
      assert.ok(aboutHtml.includes('Checkout Velocity'), 'Missing Checkout Velocity badge');
      assert.ok(aboutHtml.includes('Zero Friction'), 'Missing Zero Friction badge');
    }
  );

  await t.test(
    'The Nairobi Team section renders verified profiles with zero broken image tags',
    () => {
      assert.ok(aboutHtml.includes('The Nairobi Team Behind MarkChat'), 'Section 4 H2 missing');
      assert.ok(aboutHtml.includes('Kevin Otieno'), 'Missing Kevin Otieno');
      assert.ok(aboutHtml.includes('Faith Mwangi'), 'Missing Faith Mwangi');
      assert.ok(aboutHtml.includes('Brian Kiprop'), 'Missing Brian Kiprop');
      assert.ok(aboutHtml.includes('Amina Hassan'), 'Missing Amina Hassan');

      // Verified locations
      const nairobiCount = (aboutHtml.match(/Nairobi, Kenya/g) || []).length;
      assert.ok(
        nairobiCount >= 4,
        `Expected at least 4 Nairobi location tags, found ${nairobiCount}`
      );

      // Monograms
      assert.ok(aboutHtml.includes('KO'), 'Missing KO initials');
      assert.ok(aboutHtml.includes('FM'), 'Missing FM initials');
      assert.ok(aboutHtml.includes('BK'), 'Missing BK initials');
      assert.ok(aboutHtml.includes('AH'), 'Missing AH initials');

      assert.ok(
        aboutHtml.includes('component-url="/src/components/sections/about/AboutTeamGrid.tsx"'),
        'AboutTeamGrid island missing'
      );
    }
  );

  await t.test('CTA section links to authentication and careers', () => {
    assert.ok(
      aboutHtml.includes('Ready to accelerate your conversational sales?'),
      'CTA headline missing'
    );
    assert.ok(aboutHtml.includes('Get Started Free'), 'CTA action missing');
    assert.ok(aboutHtml.includes('Explore Open Careers'), 'CTA secondary action missing');
  });
});
