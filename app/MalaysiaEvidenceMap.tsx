import {
  additionalOfficialSources,
  dataTruthRows,
  malaysiaEvidence,
  officialSources,
  pilotEvidenceManifest,
} from "./coresense-content";

export function MalaysiaEvidenceMap() {
  return (
    <div className="evidence-map-shell">
      <header className="section-heading evidence-map-heading">
        <span className="eyebrow">{malaysiaEvidence.eyebrow}</span>
        <h2>{malaysiaEvidence.title}</h2>
        <p>{malaysiaEvidence.intro}</p>
        <small>{malaysiaEvidence.reviewDate}</small>
      </header>

      <div className="official-source-list" aria-label="Official source map">
        {officialSources.map((source, index) => (
          <details className="official-source" key={source.title}>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong>{source.lens}</strong>
                {source.title}
              </span>
            </summary>
            <div className="official-source-body">
              <p>{source.copy}</p>
              <p className="boundary-copy">{source.boundary}</p>
              <a href={source.url} target="_blank" rel="noreferrer">
                Open official source
              </a>
            </div>
          </details>
        ))}
      </div>

      <div className="truth-ladder" aria-labelledby="truth-ladder-title">
        <div className="subsection-heading">
          <span className="eyebrow">Data-truth ladder</span>
          <h3 id="truth-ladder-title">Keep each form of evidence in its lane.</h3>
        </div>
        <div className="truth-ladder-list">
          {dataTruthRows.map((row) => (
            <details className="truth-card" key={row.dataClass}>
              <summary>{row.dataClass}</summary>
              <div>
                <p>{row.meaning}</p>
                <p className="not-proof">
                  <strong>It is not proof of:</strong> {row.notProof}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <details className="manifest-panel">
        <summary>Pilot evidence manifest</summary>
        <p>{pilotEvidenceManifest}</p>
      </details>

      <div className="additional-sources">
        <h3>Additional official references</h3>
        <ul>
          {additionalOfficialSources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="legal-boundary">{malaysiaEvidence.disclaimer}</p>
    </div>
  );
}
