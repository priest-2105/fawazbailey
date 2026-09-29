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
    if (width === 1440 || width === 390) await page.getByRole('region', { name: 'From near-zero sales to 15 a week.' }).screenshot({ path: `.impeccable/review/chart-${width}.png` });
    if (width === 390) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: '.impeccable/review/mobile.png', fullPage: true });
      await page.screenshot({ path: '.impeccable/review/mobile-hero.png' });
    }
  }
  const results = page.getByRole('region', { name: 'From near-zero sales to 15 a week.' });
  await results.getByText('View figures & measurement notes').click();
  if (!await results.getByRole('table').isVisible()) throw new Error('Chart data table did not open');
  if (!await results.getByRole('cell', {name: '15–20 / week', exact: true}).isVisible()) throw new Error('Appointment range missing');
  await results.getByText('View figures & measurement notes').click();
  await page.setViewportSize({width: 1440, height: 1000});
  await page.locator('.recharts-bar-rectangle').first().hover();
  await page.getByText('Around 50 visits per week', {exact:true}).waitFor({state:'visible'});
  console.log('Chart tooltip and accessible data table passed');
  for (const slug of ['augusta-newham', '920-luxury']) {
    await page.locator(`[id="${slug}-mobile-tab"]`).click();
    await page.locator(`[id="${slug}-screen"] img`).evaluate(img => img.decode());
    if (await page.locator(`[id="${slug}-mobile-tab"]`).getAttribute('aria-selected') !== 'true') throw new Error('Mobile tab failed');
    await page.locator(`[id="${slug}-screen"]`).screenshot({path: `.impeccable/review/${slug}-mobile-tab.png`});
    await page.locator(`[id="${slug}-mobile-tab"]`).press('ArrowLeft');
    if (await page.locator(`[id="${slug}-desktop-tab"]`).getAttribute('aria-selected') !== 'true') throw new Error('Keyboard tab navigation failed');
  }
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
