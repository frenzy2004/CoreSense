/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties, ReactNode } from "react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { MalaysiaEvidenceMap } from "./MalaysiaEvidenceMap";
import {
  aiDisclosure,
  beneficiaries,
  beneficiaryCards,
  coreSenseImages,
  coreSentence,
  demoUrl,
  emergencyCopy,
  evidenceDocuments,
  faqs,
  footerLinks,
  footerStatement,
  hero,
  implementedProof,
  labels,
  openValidationGates,
  pilotOffer,
  problem,
  problemCards,
  requiredBoundary,
  solution,
  supervisorCapabilities,
  supervisorExperience,
  systemSteps,
  technicalProof,
  weatherContext,
  weatherRules,
  workerExperience,
  workerInteractions,
  type Media,
} from "./coresense-content";

const DocumentLibrary = lazy(() =>
  import("./DocumentLibrary").then((module) => ({
    default: module.DocumentLibrary,
  })),
);

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const external = href.startsWith("https://");

  if (external) {
    return (
      <a
        className={`button button-${variant}`}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <a
      className={`button button-${variant}`}
      href={href}
    >
      {children}
    </a>
  );
}

function Disclosure({ children }: { children: ReactNode }) {
  return <span className="media-disclosure">{children}</span>;
}

function MediaFrame({
  media,
  className = "",
  priority = false,
}: {
  media: Media;
  className?: string;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (media.kind !== "video" || !videoRef.current) return;

    const video = videoRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (reduceMotion.matches) video.pause();
      else void video.play().catch(() => undefined);
    };

    syncPlayback();
    reduceMotion.addEventListener("change", syncPlayback);
    return () => reduceMotion.removeEventListener("change", syncPlayback);
  }, [media.kind, media.src]);

  const style = {
    "--media-position": media.position ?? "center center",
  } as CSSProperties;
  const disclosure = media.evidenceLabel ??
    (media.concept ? labels.conceptVisual : undefined);

  return (
    <figure className={`media-frame ${className}`.trim()} style={style}>
      {media.kind === "video" ? (
        <video
          ref={videoRef}
          autoPlay
          className="media-element"
          loop
          muted
          playsInline
          poster={media.poster}
          preload={priority ? "auto" : "metadata"}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      ) : (
        <img
          className="media-element"
          src={media.src}
          alt={media.alt}
          loading={priority ? "eager" : "lazy"}
        />
      )}
      {media.kind === "video" ? <span className="sr-only">{media.alt}</span> : null}
      {disclosure ? <Disclosure>{disclosure}</Disclosure> : null}
    </figure>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <header className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </header>
  );
}

export function SmartWatchClone() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="CoreSense home">
          <span className="brand-mark" aria-hidden>
            CS
          </span>
          <span className="brand-name">CoreSense</span>
        </a>
      </header>

      <section className="hero" id="top">
        <img className="hero-bg" src={coreSenseImages.heat.src} alt="" aria-hidden />
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.body}</p>
          <div className="button-row">
            <Button href={demoUrl}>Open interactive demo</Button>
            <Button href="#problem" variant="secondary">
              How it works
            </Button>
          </div>
          <small className="hero-note">{hero.note}</small>
        </div>
        <Disclosure>{labels.conceptVisual}</Disclosure>
      </section>

      <section className="problem section-pad" id="problem">
        <SectionHeading eyebrow={problem.eyebrow} title={problem.title} body={problem.body} />
        <p className="core-sentence">{coreSentence}</p>
        <div className="problem-grid">
          {problemCards.map((card) => (
            <article className="problem-card" key={card.number}>
              <span>{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
        <a className="text-link" href="#solution-loop">
          See how the system works
        </a>
      </section>

      <section className="solution-loop section-pad dark-section" id="solution-loop">
        <div className="solution-intro">
          <SectionHeading
            eyebrow={solution.eyebrow}
            title={solution.title}
            body={solution.body}
            light
          />
          <MediaFrame className="solution-media" media={coreSenseImages.productVideo} />
        </div>
        <ol className="system-loop-steps">
          {systemSteps.map((item) => (
            <li key={item.step}>
              <span className="system-step-number">{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="boundary-panel">{solution.boundary}</p>
        <Button href={demoUrl}>Open interactive demo</Button>
      </section>

      <section className="worker-experience section-pad" id="worker-experience">
        <div className="editorial-grid">
          <div className="editorial-copy">
            <SectionHeading
              eyebrow={workerExperience.eyebrow}
              title={workerExperience.title}
              body={workerExperience.body}
            />
            <ul className="numbered-list">
              {workerInteractions.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <MediaFrame className="editorial-media" media={coreSenseImages.heatVideo} />
        </div>
        <p className="boundary-panel boundary-panel-light">{workerExperience.boundary}</p>
        <Button href={demoUrl}>Open interactive demo</Button>
      </section>

      <section
        className="supervisor-experience section-pad dark-section"
        id="supervisor-experience"
      >
        <div className="editorial-grid editorial-grid-dark">
          <MediaFrame className="editorial-media" media={coreSenseImages.wokwiLive} />
          <div className="editorial-copy">
            <SectionHeading
              eyebrow={supervisorExperience.eyebrow}
              title={supervisorExperience.title}
              body={supervisorExperience.body}
              light
            />
            <div className="capability-list">
              {supervisorCapabilities.map((capability) => (
                <details key={capability.title}>
                  <summary>{capability.title}</summary>
                  <p>{capability.body}</p>
                </details>
              ))}
            </div>
            <p className="simulation-label">{labels.simulation}</p>
          </div>
        </div>

      <div className="weather-panel">
          <div>
            <span className="eyebrow">{weatherContext.eyebrow}</span>
            <h3>{weatherContext.title}</h3>
            <p>{weatherContext.body}</p>
            <details className="weather-rules">
              <summary>Operational boundaries</summary>
              <ul>
                {weatherRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </details>
          </div>
          <div>
            <MediaFrame className="weather-media" media={coreSenseImages.stormVideo} />
            <div className="emergency-copy" aria-label="Bilingual emergency copy">
              {emergencyCopy.map((line, index) => (
                <p className={index % 2 === 0 ? "emergency-title" : ""} key={line}>
                  {line}
                </p>
              ))}
            </div>
        </div>
      </div>

      <div className="supervisor-action">
        <Button href={demoUrl}>Open interactive demo</Button>
      </div>
    </section>

      <section className="malaysia-evidence section-pad" id="malaysia-evidence">
        <MalaysiaEvidenceMap />
      </section>

      <section className="technical-proof section-pad dark-section" id="technical-proof">
        <SectionHeading eyebrow={technicalProof.eyebrow} title={technicalProof.title} light />

        <div className="proof-columns">
          <article>
            <span className="proof-state proof-state-live">Implemented / demonstrable now</span>
            <ul>
              {implementedProof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span className="proof-state proof-state-open">Open validation gates</span>
            <ul>
              {openValidationGates.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="proof-media-grid">
          <MediaFrame media={coreSenseImages.wokwiBuild} />
        </div>

        <div className="documents-heading">
          <div>
            <span className="eyebrow">Project evidence</span>
            <h3>Inspect the source material.</h3>
          </div>
          <button
            className="docs-button"
            type="button"
            onClick={() => setSelectedDocument("ONE-PAGE-SUMMARY.md")}
          >
            Browse project documents
          </button>
        </div>
        <div className="document-card-grid">
          {evidenceDocuments.map((card) => (
            <details className="evidence-card" key={card.source}>
              <summary>
                <span>{card.label}</span>
                <strong>{card.title}</strong>
              </summary>
              <div>
                <p>{card.body}</p>
                <button
                  className="document-trigger"
                  type="button"
                  onClick={() => setSelectedDocument(card.source)}
                >
                  Source: {card.source}
                </button>
              </div>
            </details>
          ))}
        </div>

        <div className="faq-block" id="faq">
          <div className="subsection-heading">
            <span className="eyebrow">FAQ</span>
            <h3>Boundaries in plain language.</h3>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pilot section-pad" id="pilot">
        <SectionHeading eyebrow={beneficiaries.eyebrow} title={beneficiaries.title} />
        <div className="beneficiary-grid">
          {beneficiaryCards.map((card) => (
            <details key={card.title}>
              <summary>{card.title}</summary>
              <p>{card.body}</p>
            </details>
          ))}
        </div>
        <div className="pilot-offer">
          <div>
            <span className="eyebrow">Governed pilot offer</span>
            <h3>{pilotOffer.title}</h3>
            <p>{pilotOffer.body}</p>
            <small>{pilotOffer.note}</small>
          </div>
          <MediaFrame className="pilot-media" media={coreSenseImages.sectors} />
        </div>
      </section>

      <section className="ai-use section-pad dark-section" id="ai-use">
        <SectionHeading
          eyebrow={aiDisclosure.eyebrow}
          title={aiDisclosure.title}
          body={aiDisclosure.body}
          light
        />
        <p className="required-boundary">{requiredBoundary}</p>
        <div className="closing-actions">
          <Button href={demoUrl}>Open interactive demo</Button>
          <Button href="#technical-proof" variant="secondary">
            View validation boundary
          </Button>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="Back to CoreSense top">
          <span className="brand-mark" aria-hidden>
            CS
          </span>
          <span className="brand-name">CoreSense</span>
        </a>
        <p>{footerStatement}</p>
        <p className="footer-boundary">{requiredBoundary}</p>
        <nav className="footer-links" aria-label="CoreSense page sections">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <Button href={demoUrl}>Open interactive demo</Button>
      </footer>

      {selectedDocument ? (
        <Suspense fallback={null}>
          <DocumentLibrary
            selectedPath={selectedDocument}
            onSelect={setSelectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        </Suspense>
      ) : null}
    </main>
  );
}
