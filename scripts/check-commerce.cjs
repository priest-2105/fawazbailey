const { createRequire } = require('node:module');
const path = require('node:path');
const os = require('node:os');
const { chromium } = createRequire(path.join(os.tmpdir(), 'ecommerce-browser', 'package.json'))('playwright');
const fs = require('node:fs/promises');

async function main() {
  await fs.mkdir('.impeccable/review', { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('http://127.0.0.1:3000/ecommerce-projects', { waitUntil: 'networkidle', timeout: 90000 });
  console.log('HTTP', response.status());
  await page.evaluate(() => document.fonts.ready);
  await page.locator('h1').waitFor();
  await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(el => el.decode());
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: '.impeccable/review/desktop.png', fullPage: true });
  await page.screenshot({ path: '.impeccable/review/desktop-hero.png' });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForFunction(() => { const chart = document.querySelector('.recharts-wrapper'); const container = document.querySelector('.recharts-responsive-container'); return chart && container && Math.abs(chart.getBoundingClientRect().width - container.getBoundingClientRect().width) < 2; });
    console.log('layout', await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src) })));
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`Horizontal overflow at ${width}`);
    if (width === 1440 || width === 390) await page.getByRole('region', { name: 'The performance, in perspective.' }).screenshot({ path: `.impeccable/review/chart-${width}.png` });
    if (width === 390) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: '.impeccable/review/mobile.png', fullPage: true });
      await page.screenshot({ path: '.impeccable/review/mobile-hero.png' });
    }
  }
  const results = page.getByRole('region', { name: 'The performance, in perspective.' });
  await results.getByText('How to read these results').click();
  if (!await results.getByRole('table').isVisible()) throw new Error('Search data table did not open');
  if (await results.getByRole('table').locator('tbody tr').count() !== 92) throw new Error('Expected all 92 daily rows');
  await results.getByText('How to read these results').click();
  const metricTabs = results.getByRole('tab');
  await metricTabs.first().click();
  await metricTabs.first().press('ArrowRight');
  if (await page.locator('#search-clicks-tab').getAttribute('aria-selected') !== 'true') throw new Error('Metric tab keyboard movement failed');
  await page.locator('#search-clicks-tab').press('End');
  if (await page.locator('#search-position-tab').getAttribute('aria-selected') !== 'true') throw new Error('Metric End key failed');
  await page.locator('#search-impressions-tab').click();
  console.log('Chart metric tabs and data table passed');
  for (const [name, href] of [['View actual data for 920 Luxury (opens in a new tab)', 'Screenshot%20(2090).png'], ['View actual data for Augusta Newham (opens in a new tab)', 'Screenshot%20(2089).png']]) {
    const link = page.getByRole('link', { name });
    if (await link.getAttribute('target') !== '_blank' || !(await link.getAttribute('href')).endsWith(href)) throw new Error(`Evidence link wrong: ${name}`);
    const status = (await page.request.get(new URL(await link.getAttribute('href'), page.url()).href)).status();
    if (status !== 200) throw new Error(`Evidence file ${href} returned ${status}`);
  }
  console.log('Actual-data links passed');
  const brownie = page.locator('#brownie-bakes');
  if (await brownie.getByText(/shopify/i).count()) throw new Error('Brownie must not mention Shopify');
  await brownie.getByRole('heading', { name: 'No results to report yet.' }).waitFor();
  await brownie.getByText('Early preview · Pending review and handover').waitFor();
  console.log('Brownie preview status passed');
  for (const slug of ['augusta-newham', '920-luxury', 'brownie-bakes']) {
    await page.locator(`[id="${slug}-mobile-tab"]`).click();
    await page.locator(`[id="${slug}-screen"] img`).evaluate(img => img.decode());
    if (await page.locator(`[id="${slug}-mobile-tab"]`).getAttribute('aria-selected') !== 'true') throw new Error('Mobile tab failed');
    await page.locator(`[id="${slug}-screen"]`).screenshot({path: `.impeccable/review/${slug}-mobile-tab.png`});
    await page.locator(`[id="${slug}-mobile-tab"]`).press('ArrowLeft');
    if (await page.locator(`[id="${slug}-desktop-tab"]`).getAttribute('aria-selected') !== 'true') throw new Error('Keyboard tab navigation failed');
  }
  console.log('Screenshot tabs passed');
  await page.setViewportSize({ width: 390, height: 900 });
  await page.getByRole('link', {name: 'Explore the projects'}).click();
  if (!page.url().endsWith('#work')) throw new Error('Work anchor failed');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  console.log('reduced-motion', await page.locator('img').first().evaluate(el => getComputedStyle(el).transitionDuration));
  console.log('title', await page.title());
  console.log('errors', errors);
  if (errors.length) throw new Error('Browser errors found');
  await page.getByRole('link', { name: 'The full portfolio' }).click();
  await page.waitForURL('http://127.0.0.1:3000/');
  console.log('Portfolio return link passed');
  await browser.close();
}
main().catch(error => { console.error(error); process.exit(1); });
