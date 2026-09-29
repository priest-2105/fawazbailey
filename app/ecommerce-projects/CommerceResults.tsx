"use client";

import { useRef, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Download } from "lucide-react";
import searchExport from "@/lib/ecommerce-search-data.json";
import { LUXURY_WEEKLY_RESULTS } from "@/lib/ecommerce-projects";
import styles from "./results.module.css";

const rows = searchExport.rows;
type SearchDay = (typeof rows)[number];
type MetricKey = "impressions" | "clicks" | "ctr" | "position";
const clicks = rows.reduce((sum, day) => sum + day.clicks, 0);
const impressions = rows.reduce((sum, day) => sum + day.impressions, 0);
const weightedPosition = rows.reduce((sum, day) => sum + (day.position ?? 0) * day.impressions, 0) / impressions;
const metrics: { key: MetricKey; label: string; value: string; color: string; description: string }[] = [
  { key: "impressions", label: "Impressions", value: impressions.toLocaleString("en-GB"), color: "#7562a5", description: "Times a result from the site appeared in Google Search." },
  { key: "clicks", label: "Search clicks", value: String(clicks), color: "#326c62", description: "Clicks from Google Search to the website." },
  { key: "ctr", label: "Search CTR", value: `${(clicks / impressions * 100).toFixed(1)}%`, color: "#956a36", description: "Search clicks divided by impressions. This measures search click-through, not purchase conversion." },
  { key: "position", label: "Avg. position", value: weightedPosition.toFixed(1), color: "#586b8d", description: "Average search-result position. A lower number means a higher position." },
];
const sourceImage = "/images/ecommerce/seo-shot/Screenshot%20(2090).png";
const csvUrl = "/images/ecommerce/seo-shot/920luxury.com-Performance-on-Search-2026-09-29/Chart.csv";

function shortDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

function SearchTooltip({ active, payload, metric }: { active?: boolean; payload?: readonly { payload?: SearchDay }[]; metric: (typeof metrics)[number] }) {
  const day = payload?.[0]?.payload;
  if (!active || !day) return null;
  const value = day[metric.key];
  return <div className={styles.tooltip}><span>{shortDate(day.date)} 2026</span><strong style={{ color: metric.color }}>{value === null ? "No data" : `${value}${metric.key === "ctr" ? "%" : ""}`}</strong><span>{metric.label}</span></div>;
}

export default function CommerceResults() {
  const [selected, setSelected] = useState<MetricKey>("impressions");
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const metric = metrics.find(item => item.key === selected)!;

  function changeMetric(event: React.KeyboardEvent, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? metrics.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + metrics.length) % metrics.length;
    setSelected(metrics[next].key);
    controls.current[next]?.focus();
  }

  return (
    <section className={styles.results} aria-labelledby="luxury-results-title">
      <div className={styles.sectionHeading}><h4 id="luxury-results-title">The performance, in perspective.</h4><p>Real search data, alongside the business results.</p></div>
      <div className={styles.chartPanel}>
        <div className={styles.panelHeading}>
          <div><h5>Search performance</h5><p>920 Luxury <span aria-hidden="true">·</span> Google Search Console</p></div>
          <a className={styles.evidenceButton} href={sourceImage} target="_blank" rel="noopener noreferrer" aria-label="View actual data for 920 Luxury (opens in a new tab)">View actual data <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>

        <div className={styles.metricTabs} role="tablist" aria-label="Search performance metric">
          {metrics.map((item, index) => <button key={item.key} ref={node => { controls.current[index] = node; }} type="button" role="tab" aria-selected={selected === item.key} aria-controls="search-chart-panel" id={`search-${item.key}-tab`} tabIndex={selected === item.key ? 0 : -1} onClick={() => setSelected(item.key)} onKeyDown={event => changeMetric(event, index)} style={{ "--metric-color": item.color } as React.CSSProperties}>
            <span className={styles.metricLabel}><i aria-hidden="true" />{item.label}</span><strong>{item.value}</strong>
          </button>)}
        </div>

        <div id="search-chart-panel" role="tabpanel" aria-labelledby={`search-${selected}-tab`} tabIndex={0} className={styles.plotPanel}>
          <div className={styles.plotHeading}><span style={{ color: metric.color }}>{metric.label}</span><span>Daily · 3 months</span></div>
          <div className={styles.chartCanvas}>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 600, height: 250 }}>
              <AreaChart data={rows} margin={{ top: 12, right: 8, bottom: 0, left: -22 }} accessibilityLayer>
                <CartesianGrid vertical={false} stroke="#ecedef" />
                <XAxis dataKey="date" ticks={["2026-06-27", "2026-07-27", "2026-08-27", "2026-09-26"]} tickFormatter={shortDate} tick={{ fill: "#65716b", fontSize: 10 }} tickLine={false} axisLine={false} tickMargin={12} minTickGap={18} />
                <YAxis domain={[0, "auto"]} allowDecimals={selected === "position" || selected === "ctr"} tick={{ fill: "#65716b", fontSize: 10 }} tickLine={false} axisLine={false} tickCount={4} tickFormatter={value => `${value}${selected === "ctr" ? "%" : ""}`} />
                <Tooltip content={<SearchTooltip metric={metric} />} cursor={{ stroke: metric.color, strokeOpacity: .25, strokeDasharray: "4 4" }} isAnimationActive={false} />
                <Area type="linear" dataKey={selected} name={metric.label} stroke={metric.color} strokeWidth={2} fill={metric.color} fillOpacity={.08} dot={false} activeDot={{ r: 4, stroke: "#fff", strokeWidth: 2 }} connectNulls={false} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className={styles.metricExplanation}>{metric.description}</p>
        </div>
        <div className={styles.chartFooter}><span>27 Jun – 26 Sep 2026</span><a href={csvUrl} download>Download source CSV <Download size={13} aria-hidden="true" /></a></div>
      </div>

      <section className={styles.businessResults} aria-labelledby="business-results-title">
        <div className={styles.businessHeading}><h5 id="business-results-title">Beyond search.</h5><span>Weekly activity, reported by Fawaz</span></div>
        <dl className={styles.businessMetrics}>{LUXURY_WEEKLY_RESULTS.map(item => <div key={item.name}><dt>{item.name}</dt><dd>{item.display}<span>/ week</span></dd></div>)}</dl>
        <p>From sales close to zero to around 15 confirmed sales a week, with hair purchases and appointments now accessible in one place. These are reported business figures; the Search Console export above measures Google search activity.</p>
      </section>

      <details className={styles.dataNotes}><summary>How to read these results</summary><p>The chart uses all 92 daily rows from the supplied Search Console export. Metric totals cover the full three-month period. Days without impressions have no CTR or position value. Sales and appointment figures are approximate weekly reports and may overlap; no purchase-conversion rate or percentage uplift is calculated.</p><div className={styles.tableScroll}><table><caption>920 Luxury — daily Google Search performance</caption><thead><tr><th scope="col">Date</th><th scope="col">Clicks</th><th scope="col">Impressions</th><th scope="col">CTR</th><th scope="col">Position</th></tr></thead><tbody>{rows.map(day => <tr key={day.date}><th scope="row">{shortDate(day.date)}</th><td>{day.clicks}</td><td>{day.impressions}</td><td>{day.ctr === null ? "—" : `${day.ctr}%`}</td><td>{day.position ?? "—"}</td></tr>)}</tbody></table></div></details>
      <a className={styles.searchAppearance} href="/images/ecommerce/seo-shot/920-seo.JPG" target="_blank" rel="noopener noreferrer">See 920 Luxury’s Google search appearance <ArrowUpRight size={14} aria-hidden="true" /></a>
    </section>
  );
}
