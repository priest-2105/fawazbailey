const fs = require('node:fs');
const path = require('node:path');

const source = 'public/images/ecommerce/seo-shot/920luxury.com-Performance-on-Search-2026-09-29/Chart.csv';
const lines = fs.readFileSync(path.resolve(source), 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/);
if (lines.shift() !== 'Date,Clicks,Impressions,CTR,Position') throw new Error('Unexpected Search Console columns');
const rows = lines.map(line => {
  const [date, clicks, impressions, ctr, position] = line.split(',');
  const row = { date, clicks: Number(clicks), impressions: Number(impressions), ctr: ctr ? Number(ctr.replace('%', '')) : null, position: position ? Number(position) : null };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Object.entries(row).some(([key, value]) => key !== 'date' && value !== null && !Number.isFinite(value))) throw new Error(`Invalid analytics row: ${line}`);
  return row;
});
const totals = rows.reduce((sum, row) => ({ clicks: sum.clicks + row.clicks, impressions: sum.impressions + row.impressions }), {clicks: 0, impressions: 0});
if (totals.clicks !== 9 || totals.impressions !== 321) throw new Error('Export no longer matches the supplied source screenshot; review the snapshot metadata');
fs.writeFileSync('lib/ecommerce-search-data.json', JSON.stringify({ source, exportedAt: '2026-09-29', rows }, null, 2) + '\n');
console.log(`Imported ${rows.length} daily records: ${totals.clicks} clicks / ${totals.impressions} impressions.`);
