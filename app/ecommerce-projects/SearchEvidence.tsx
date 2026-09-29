import { ArrowUpRight } from "lucide-react";
import styles from "./results.module.css";

export default function SearchEvidence() {
  return (
    <section className={styles.searchEvidence} aria-labelledby="augusta-search-title">
      <div className={styles.panelHeading}>
        <div><h4 id="augusta-search-title">Early visibility in search.</h4><p>Augusta Newham · Google Search Console snapshot</p></div>
        <a className={styles.evidenceButton} href="/images/ecommerce/seo-shot/Screenshot%20(2089).png" target="_blank" rel="noopener noreferrer" aria-label="View actual data for Augusta Newham (opens in a new tab)">View actual data <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <dl className={styles.launchMetrics}><div><dt>Total web search clicks</dt><dd>58</dd></div><div><dt>Indexed pages</dt><dd>22</dd></div></dl>
      <p className={styles.evidenceNote}>The supplied snapshot shows the store beginning to appear in search. These are visibility signals at this early stage; purchase-conversion results are not yet available. Marketing remains with the brand’s own team.</p>
      <a className={styles.searchAppearance} href="/images/ecommerce/seo-shot/augusta-newham-seo.JPG" target="_blank" rel="noopener noreferrer">See Augusta Newham’s Google search appearance <ArrowUpRight size={14} aria-hidden="true" /></a>
    </section>
  );
}
