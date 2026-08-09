/* eslint-disable @next/next/no-img-element */
"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  conceptDisclosure,
  coreSenseImages,
  evidenceCards,
  faqs,
  featureRows,
  footerLinks,
  hero,
  industries,
  overviewLead,
  overviewTiles,
  useCases,
  type Media,
} from "./coresense-content";

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a className={`button button-${variant}`} href={href}>
      {children}
    </a>
  );
}

function Disclosure({ className = "" }: { className?: string }) {
  return (
    <span className={`media-disclosure ${className}`.trim()}>
      {conceptDisclosure}
    </span>
  );
}

function FeatureMedia({ media }: { media: Media }) {
  return (
    <figure className="feature-media-frame">
      <img className="feature-media" src={media.src} alt={media.alt} />
      {media.concept && <Disclosure />}
    </figure>
  );
}

export function SmartWatchClone() {
  const [selectedCase, setSelectedCase] = useState(0);
  const currentCase = useCases[selectedCase];

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
        <img
          className="hero-bg"
          src={coreSenseImages.heat.src}
          alt=""
          aria-hidden
        />
        <Disclosure className="hero-bg-disclosure" />
        <div className="hero-copy">
          <span className="hero-eyebrow">{hero.eyebrow}</span>
          <h1>
            Heat risk workers
            <br />
            can act on.
          </h1>
          <p>{hero.body}</p>
          <Button href="#overview">Explore CoreSense</Button>
        </div>
        <figure className="watch-stage" aria-label="CoreSense product concept">
          <img src={coreSenseImages.product.src} alt={coreSenseImages.product.alt} />
          <Disclosure className="product-disclosure" />
        </figure>
      </section>

      <section className="overview section-pad" id="overview">
        <div className="section-title">
          <span>Overview</span>
          <h2>From signal to safer action</h2>
        </div>
        <div className="overview-grid">
          <article className="overview-card overview-card-wide">
            <img
              className="overview-card-bg"
              src={overviewLead.media.src}
              alt={overviewLead.media.alt}
            />
            {overviewLead.media.concept && <Disclosure />}
            <div className="overview-card-copy">
              <h3>{overviewLead.title}</h3>
              <p>{overviewLead.body}</p>
            </div>
          </article>
          {overviewTiles.map((card) => (
            <article className="overview-card" key={card.title}>
              <img
                className="overview-card-bg"
                src={card.media.src}
                alt={card.media.alt}
              />
              {card.media.concept && <Disclosure />}
              <div className="overview-card-copy">
                <h3>{card.title}</h3>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <Button href="#features">See how it works</Button>
      </section>

      <section className="features section-pad" id="features">
        <h2>Unique Features</h2>
        <div className="feature-stack">
          {featureRows.map((feature) => (
            <article
              className={`feature-showcase ${
                feature.imageFirst ? "image-first" : ""
              }`}
              key={feature.title}
            >
              <div className="feature-copy">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <span className="feature-proof">{feature.proof}</span>
              </div>
              <FeatureMedia media={feature.media} />
            </article>
          ))}
        </div>
        <Button href="#use-cases">Explore site workflows</Button>
      </section>

      <section className="use-cases section-pad" id="use-cases">
        <h2>Use Cases</h2>
        <div className="case-layout">
          <div
            className="case-tabs"
            role="tablist"
            aria-label="CoreSense use cases"
          >
            {useCases.map((item, index) => (
              <button
                id={`case-tab-${index}`}
                aria-controls="case-panel"
                aria-selected={selectedCase === index}
                className={selectedCase === index ? "active" : ""}
                key={item.label}
                onClick={() => setSelectedCase(index)}
                role="tab"
                tabIndex={selectedCase === index ? 0 : -1}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <article
            className="case-panel"
            id="case-panel"
            role="tabpanel"
            aria-labelledby={`case-tab-${selectedCase}`}
          >
            <img
              key={currentCase.media.src}
              src={currentCase.media.src}
              alt={currentCase.media.alt}
            />
            {currentCase.media.concept && <Disclosure />}
            <div className="case-overlay">
              <h3>{currentCase.title}</h3>
              <p>{currentCase.body}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="industries section-pad" id="industries">
        <h2>Industries</h2>
        <div className="industry-grid">
          {industries.map((industry) => (
            <article className="industry-card" key={industry.title}>
              <span className="industry-kicker">{industry.kicker}</span>
              <h3>{industry.title}</h3>
              <p>{industry.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews evidence section-pad" id="evidence">
        <div className="reviews-shell">
          <div className="reviews-badge">Evidence</div>
          <h2>What CoreSense can prove today</h2>
          <div className="review-grid evidence-grid">
            {evidenceCards.map((card) => (
              <article className="review-card evidence-card" key={card.title}>
                <span className="evidence-label">{card.label}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span className="evidence-source">Source: {card.source}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq section-pad" id="faq">
        <div className="section-title compact">
          <span>FAQ</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta" id="demo">
        <h2>Turn invisible heat strain into one clear action.</h2>
        <p>
          CoreSense is a safety decision-support prototype, not a clinical
          thermometer or medical device.
        </p>
        <div className="final-cta-actions">
          <Button href="#overview">Review the system</Button>
          <Button href="#evidence" variant="secondary">
            Explore the evidence
          </Button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand footer-wordmark" href="#top">
              <span className="brand-mark" aria-hidden>
                CS
              </span>
              <span className="brand-name">CoreSense</span>
            </a>
            <p>
              Personal heat-risk guidance at the edge, with uncertainty kept
              visible and worker action kept clear.
            </p>
          </div>
          <h2>Built for accountable heat-safety pilots.</h2>
        </div>
        <nav className="footer-links" aria-label="Page sections">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer-bottom">
          <p>CoreSense prototype integration brief, 2026.</p>
          <p>Source material supplied with the project documentation.</p>
        </div>
      </footer>
    </main>
  );
}
