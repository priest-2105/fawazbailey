import { ArrowUpRight } from "lucide-react";
import styles from "./results.module.css";

// Brownie Bakes is an unreleased preview: report its status, never analytics.
const STATUS = [
  { term: "Stage", value: "Early preview" },
  { term: "Handover", value: "Pending review" },
  { term: "Online payment", value: "Not switched on" },
  { term: "Sales & CRO data", value: "None yet" },
];

export default function PreviewStatus({ url }: { url: string }) {
  return (
    <section className={styles.searchEvidence} aria-labelledby="brownie-status-title">
      <div className={styles.panelHeading}>
        <div><h4 id="brownie-status-title">No results to report yet.</h4><p>Brownie Bakes · Preview status</p></div>
        <a className={styles.evidenceButton} href={url} target="_blank" rel="noopener noreferrer" aria-label="Open the Brownie Bakes preview (opens in a new tab)">Open the preview <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <dl className={styles.statusList}>{STATUS.map(item => <div key={item.term}><dt>{item.term}</dt><dd>{item.value}</dd></div>)}</dl>
      <p className={styles.evidenceNote}>The site has not been handed over or opened to customers, so there is no traffic, sales or conversion data to show. Orders are enquiries confirmed directly with the bakery; the prototype checkout takes no payment and sends nothing to the bakery.</p>
    </section>
  );
}
