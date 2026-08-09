/* eslint-disable @next/next/no-img-element */
"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  conceptDisclosure,
  coreSenseImages,
  evidenceCards,
  evidenceLead,
  faqs,
  featureRows,
  footerLinks,
  hero,
  industries,
  industriesIntro,
  overviewLead,
  overviewTiles,
  systemSteps,
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

function Disclosure({
  className = "",
  children = conceptDisclosure,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={`media-disclosure ${className}`.trim()}>{children}</span>
  );
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
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (media.kind !== "video" || !videoRef.current) return;

    const video = videoRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      if (reduceMotion.matches) {
        video.pause();
        setIsPlaying(false);
        return;
      }

      void video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    syncPlayback();
    reduceMotion.addEventListener("change", syncPlayback);
    return () => reduceMotion.removeEventListener("change", syncPlayback);
  }, [media.kind, media.src]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const style = {
    "--media-position": media.position ?? "center center",
  } as CSSProperties;

  return (
    <figure className={`media-frame ${className}`.trim()} style={style}>
      {media.kind === "video" ? (
        <>
          <video
            ref={videoRef}
            className="media-element"
            loop
            muted
            playsInline
            poster={media.poster}
            preload={priority ? "auto" : "metadata"}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            <source src={media.src} type="video/mp4" />
          </video>
          <button
            className="video-control"
            type="button"
            aria-label={isPlaying ? "Pause concept video" : "Play concept video"}
            onClick={togglePlayback}
          >
            <span
              aria-hidden
              className={`video-control-icon ${isPlaying ? "pause" : "play"}`}
            />
          </button>
        </>
      ) : (
        <img
          className="media-element"
          src={media.src}
          alt={media.alt}
          loading={priority ? "eager" : "lazy"}
        />
      )}
      {media.kind === "video" && <span className="sr-only">{media.alt}</span>}
      {media.concept && <Disclosure />}
      {media.evidenceLabel && <Disclosure>{media.evidenceLabel}</Disclosure>}
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
          <h1>{hero.title}</h1>
          <p>{hero.body}</p>
          <Button href="#overview">Explore CoreSense</Button>
        </div>
        <MediaFrame
          className="hero-product"
          media={coreSenseImages.productVideo}
          priority
        />
      </section>

      <section className="overview section-pad" id="overview">
        <div className="section-title">
          <span>Overview</span>
          <h2>From signal to safer action</h2>
        </div>
        <div className="overview-grid">
          <article className="overview-card overview-card-wide">
            <MediaFrame
              className="overview-card-media"
              media={overviewLead.media}
            />
            <div className="overview-card-copy">
              <h3>{overviewLead.title}</h3>
              <p>{overviewLead.body}</p>
            </div>
          </article>
          {overviewTiles.map((card) => (
            <article className="overview-card" key={card.title}>
              <MediaFrame className="overview-card-media" media={card.media} />
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
        <div className="dark-section-heading">
          <span>Built around the decision</span>
          <h2>Unique Features</h2>
        </div>
        <div className="feature-stack">
          {featureRows.map((feature) => (
            <article
              className={`feature-showcase ${
                feature.imageFirst ? "image-first" : ""
              }`}
              key={feature.title}
            >
              <div className="feature-copy">
                <span className="feature-eyebrow">{feature.eyebrow}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                <span className="feature-proof">{feature.proof}</span>
              </div>
              <MediaFrame className="feature-media-frame" media={feature.media} />
            </article>
          ))}
        </div>
      </section>

      <section className="system-loop" aria-labelledby="system-loop-title">
        <div className="system-loop-heading">
          <span>CoreSense operating loop</span>
          <h2 id="system-loop-title">One signal is only useful when it leads to action.</h2>
        </div>
        <ol className="system-loop-steps">
          {systemSteps.map((item) => (
            <li key={item.step}>
              <span className="system-step-number">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="use-cases section-pad" id="use-cases">
        <div className="section-title compact">
          <span>Use Cases</span>
          <h2>From risk to a closed response</h2>
        </div>
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
                <span>{String(index + 1).padStart(2, "0")}</span>
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
            <MediaFrame
              key={currentCase.media.src}
              className="case-media"
              media={currentCase.media}
            />
            <div className="case-overlay">
              <h3>{currentCase.title}</h3>
              <p>{currentCase.body}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="industries section-pad" id="industries">
        <div className="section-title compact">
          <span>Industries</span>
          <h2>Built to be tested beside existing controls</h2>
        </div>
        <div className="industry-story">
          <MediaFrame className="industry-panorama" media={industriesIntro.media} />
          <div className="industry-intro-copy">
            <h3>{industriesIntro.title}</h3>
            <p>{industriesIntro.body}</p>
          </div>
        </div>
        <div className="industry-index">
          {industries.map((industry, index) => (
            <article className="industry-row" key={industry.title}>
              <span className="industry-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="industry-kicker">{industry.kicker}</span>
                <h3>{industry.title}</h3>
              </div>
              <p>{industry.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews evidence section-pad" id="evidence">
        <div className="reviews-shell">
          <div className="reviews-badge">Evidence</div>
          <h2>What CoreSense can prove today</h2>
          <article className="evidence-lead">
            <MediaFrame className="evidence-lead-media" media={evidenceLead.media} />
            <div className="evidence-lead-copy">
              <span>{evidenceLead.label}</span>
              <h3>{evidenceLead.title}</h3>
              <p>{evidenceLead.body}</p>
            </div>
          </article>
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
        <span>Governed pilot candidate</span>
        <h2>Turn invisible heat strain into one clear action.</h2>
        <p>
          CoreSense is a safety decision-support prototype, not a clinical
          thermometer or medical device. It works beside site WBGT and existing
          heat controls, not in place of them.
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
              Personal heat-risk guidance at the edge, with uncertainty visible
              and the next worker action clear.
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
