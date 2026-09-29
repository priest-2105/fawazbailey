const { createRequire } = require('node:module');
const os = require('node:os');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = createRequire(path.join(os.tmpdir(), 'ecommerce-browser', 'package.json'))('playwright');
// The remote stores sometimes keep an unused webfont request pending indefinitely.
// Visible fonts are given a bounded load window below before taking the capture.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const mobileOnly = process.argv.includes('--mobile-only');
  const page = await browser.newPage({ viewport: mobileOnly ? { width: 390, height: 844 } : { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const output = path.resolve('.impeccable/research');
  await fs.mkdir(output, { recursive: true });
  const targets = process.argv[2] ? [[process.argv[2], process.argv[3]]] : [['augusta-newham', 'https://www.augustanewham.com'], ['920-luxury', 'https://www.920luxury.com']];
  for (const [name, url] of targets) {
    try {
      await page.goto(url, { waitUntil: 'commit', timeout: 30000 });
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 45000 });
      await page.evaluate(async () => {
        await Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 10000))]);
        const visible = [...document.images].filter(img => {
          const rect = img.getBoundingClientRect();
          return rect.top < innerHeight && rect.bottom > 0;
        });
        await Promise.all(visible.map(img => Promise.race([img.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 25000))])));
      });
      const assets = path.resolve('public/images/ecommerce');
      await fs.mkdir(assets, { recursive: true });
      if (!mobileOnly) {
        await page.screenshot({ path: path.join(assets, `${name}-desktop.jpg`), type: 'jpeg', quality: 88 });
        await page.screenshot({ path: path.join(output, `${name}.png`) });
      }
      const text = await page.locator('body').innerText();
      const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(n => ({ text: n.innerText, href: n.href })));
      await fs.writeFile(path.join(output, `${name}.json`), JSON.stringify({ url: page.url(), text, links }, null, 2));
      console.log(JSON.stringify({ name, url: page.url(), text: text.slice(0, 4000), images: await page.locator('img').evaluateAll(nodes => nodes.slice(0, 8).map(n => ({src:n.currentSrc,loaded:n.complete && n.naturalWidth > 0}))) }));
      if (!mobileOnly) {
        await page.setViewportSize({ width: 390, height: 844 });
        const mobileUrl = name === 'augusta-newham' ? 'https://www.augustanewham.com/collections/shapewear' : url;
        await page.goto(mobileUrl, { waitUntil: 'commit', timeout: 30000 });
      }
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 45000 });
      await page.evaluate(async () => { await Promise.race([Promise.all([...document.images].filter(i => i.getBoundingClientRect().top < innerHeight).map(i => i.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 20000))]); });
      await page.waitForFunction(() => [...document.querySelectorAll('video')].filter(v => v.getBoundingClientRect().width > 0).every(v => v.readyState >= 2), undefined, { timeout: 20000 }).catch(() => {});
      console.log('mobile media', await page.locator('video').evaluateAll(nodes => nodes.map(v => ({src:v.currentSrc, readyState:v.readyState, poster:v.poster}))));
      await page.screenshot({ path: path.join(assets, `${name}-mobile${name === 'augusta-newham' ? '-collection' : ''}.jpg`), type: 'jpeg', quality: 88 });
      await page.setViewportSize({ width: 1440, height: 1000 });
    } catch (error) {
      console.log(name, String(error));
      await page.screenshot({ path: path.join(output, `${name}-error.png`) }).catch(() => {});
      console.log((await page.locator('body').innerText().catch(() => '')).slice(0, 4000));
    }
  }
  await browser.close();
}
main().catch(error => { console.error(error); process.exitCode = 1; });
