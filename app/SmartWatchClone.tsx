"use client";

import type { ReactNode } from "react";
import { useState } from "react";

const image = {
  logo:
    "https://static.wixstatic.com/media/72edbb_eba6157c991949428a05d325a2eec20b~mv2.png/v1/fill/w_180,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo%20H%20-%20white.png",
  heroWorker:
    "https://static.wixstatic.com/media/d8b625_7d7ae0a4cc3041cd8e774a3af1371918~mv2.jpg/v1/fill/w_147,h_97,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/d8b625_7d7ae0a4cc3041cd8e774a3af1371918~mv2.jpg",
  watch:
    "https://static.wixstatic.com/media/d8b625_56b9a7f882594b4ba58cb15b601a92b9~mv2.png/v1/crop/x_0,y_0,w_535,h_806/fill/w_535,h_805,al_c,q_90,enc_avif,quality_auto/sw-item.png",
  overview:
    "https://static.wixstatic.com/media/d8b625_c69f53b5639d44a78ece468e366a0f44~mv2.png/v1/crop/x_79,y_0,w_1637,h_504/fill/w_1631,h_504,al_c,q_90,enc_avif,quality_auto/1.png",
  ai:
    "https://static.wixstatic.com/media/d8b625_14e311c8ec3748f2856071e9cb35ce67~mv2.png/v1/fill/w_842,h_504,al_c,q_90,enc_avif,quality_auto/2.png",
  iot:
    "https://static.wixstatic.com/media/d8b625_e04c7247a4c54b30b2c0b2692637937d~mv2.png/v1/crop/x_16,y_0,w_827,h_504/fill/w_827,h_504,al_c,q_90,enc_avif,quality_auto/3.png",
  rugged:
    "https://static.wixstatic.com/media/d8b625_e02bd3a108424becbec624777112d1df~mv2.png/v1/fill/w_842,h_504,al_c,q_90,enc_avif,quality_auto/4.png",
  battery:
    "https://static.wixstatic.com/media/d8b625_3c1b566537a54a7a9baa4a08d3ccf4d1~mv2.png/v1/crop/x_19,y_0,w_824,h_504/fill/w_824,h_504,al_c,q_90,enc_avif,quality_auto/5.png",
  useCase:
    "https://static.wixstatic.com/media/d8b625_30c1eafbfe70478e84ffbbb38a5de072~mv2.png/v1/fill/w_1028,h_669,al_c,q_90,enc_avif,quality_auto/d8b625_30c1eafbfe70478e84ffbbb38a5de072~mv2.png",
  testimonial:
    "https://static.wixstatic.com/media/d8b625_fa91e1d9cc6046409a8c62d23c680872~mv2.png/v1/fill/w_198,h_268,al_c,lg_1,q_85,enc_avif,quality_auto/darrow%201_edited_edited.png",
};

const awards = [
  {
    alt: "Forbes Asia 100 to Watch 2022",
    src: "https://static.wixstatic.com/media/a550d3_af6d5d71778b462ab5ed1653e75aaa42~mv2.png/v1/fill/w_248,h_112,al_c,lg_1,q_85,enc_avif,quality_auto/Forbes%20Asia%20100%20to%20Watch%202022.png",
  },
  {
    alt: "World Economic Forum Technology Pioneer 2023",
    src: "https://static.wixstatic.com/media/a550d3_dfd0d7ef271e4152ab3993b86713ffc0~mv2.png/v1/fill/w_264,h_190,al_c,lg_1,q_85,enc_avif,quality_auto/Technology%20Pioneer%202023%20by%20the%20World%20Economic%20Forum.png",
  },
  {
    alt: "Google Startups for Sustainable Development",
    src: "https://static.wixstatic.com/media/a550d3_b036541795d24988b5cfea35a671820a~mv2.png/v1/fill/w_355,h_78,al_c,lg_1,q_85,enc_avif,quality_auto/Google%20Startups%20for%20Sustainability%20Development.png",
  },
  {
    alt: "Deloitte Technology Fast Company 2023 Hong Kong",
    src: "https://static.wixstatic.com/media/a550d3_72e62b93939f41a2acbdf2bfde1c3b39~mv2.png/v1/fill/w_218,h_58,al_c,lg_1,q_85,enc_avif,quality_auto/Deloitte%20Technology%20Fast%20Company%202023%20Hong%20Kong.png",
  },
  {
    alt: "Josef Umdasch Research Prize 2022",
    src: "https://static.wixstatic.com/media/a550d3_e775d313df5a46d4806b07a8fb0bf51b~mv2.png/v1/fill/w_276,h_122,al_c,lg_1,q_85,enc_avif,quality_auto/Austria%E2%80%99s%20josef%20umdasch%20research%20prize%202022.png",
  },
  {
    alt: "CEMEX Ventures Top 50 ConTech Startups",
    src: "https://static.wixstatic.com/media/a550d3_5e321b6d7dd141d681597dc44200e7c9~mv2.png/v1/fill/w_284,h_126,al_c,lg_1,q_85,enc_avif,quality_auto/Top50%20ConTech%20Startups%202020%20by%20CEMEX%20Ventures.png",
  },
  {
    alt: "Enterprise Singapore Slingshot 2021 sector winner",
    src: "https://static.wixstatic.com/media/a550d3_8641bb6cf5bc438aad14c07515edb85e~mv2.png/v1/fill/w_302,h_93,al_c,lg_1,q_85,enc_avif,quality_auto/Sector%20Winner%20SLINGSHOT2021%20by%20Enterprise%20Singapore.png",
  },
  {
    alt: "Construction Innovation and Technology Fund",
    src: "https://static.wixstatic.com/media/d8b625_2f87a12a66be4711b5c11cc4c0dd4056~mv2.png/v1/fill/w_316,h_88,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo-CITF.png",
  },
];

const navMenus = [
  {
    label: "Vision AI",
    groups: [
      ["Platform", "Computer Vision Platform", "Modules Hub"],
      [
        "Use Cases",
        "Near Miss Detection",
        "Worker Fatigue Detection",
        "Unconscious Worker Detection",
      ],
    ],
  },
  {
    label: "Industries",
    groups: [
      ["Manufacturing", "Automotive and EV", "Food and Beverage"],
      ["Field Sites", "Construction", "Mining", "Oil and Gas", "Logistics"],
    ],
  },
  {
    label: "Products",
    groups: [
      ["viWEAR", "Smart Watch", "Smart Helmet"],
      ["Hardware", "viLID - LiDAR", "viAER - Drone", "viMOV - Mobility"],
      ["Software", "viHUB Platform", "4S Safety System", "Permit to Work"],
    ],
  },
  {
    label: "Solutions",
    groups: [
      ["Machine", "Crane Safety", "Forklift Safety", "Vehicle Control"],
      ["Manpower", "Lone Worker Monitoring", "Incident Management"],
      ["Milieu", "Area Control", "Space Management"],
    ],
  },
  {
    label: "Partners",
    groups: [
      ["Programs", "Channel Partner", "Reseller Partner", "Tech Partner"],
    ],
  },
  {
    label: "Resources",
    groups: [["Library", "Case Studies", "Guides", "Glossary", "Blog"]],
  },
];

const overviewCards = [
  {
    title: "More Than a Wearable",
    body: "A wrist-level safety node built for demanding industrial environments.",
    img: image.overview,
  },
  {
    title: "Advanced AI Signals",
    body: "Health, movement, location, and risk signals are translated into timely alerts.",
    img: image.ai,
  },
  {
    title: "Robust IoT Integration",
    body: "The watch connects with site systems, dashboards, and response workflows.",
    img: image.iot,
  },
  {
    title: "Connected Workforce",
    body: "Workers stay visible, informed, and reachable across active site zones.",
    img: image.rugged,
  },
];

const featureTiles = [
  {
    title: "AI-enhanced monitoring",
    body: "Continuous biometric, motion, and environmental context helps safety teams spot risk before it turns into an incident.",
    img: image.ai,
  },
  {
    title: "Custom alerts",
    body: "Configure notifications for heat stress, falls, motionless workers, SOS events, and zone-based warnings.",
    img: image.overview,
  },
  {
    title: "Seamless IoT stack",
    body: "Wearable data can pair with cameras, edge devices, viHUB, and response channels for a single operating picture.",
    img: image.iot,
  },
  {
    title: "Rugged field design",
    body: "The watch is shaped for long shifts, harsh sites, fast escalation, and easy adoption by crews.",
    img: image.rugged,
  },
  {
    title: "Extended battery life",
    body: "Designed for shift-length reliability, fewer charging interruptions, and more dependable coverage.",
    img: image.battery,
  },
];

const useCases = [
  {
    label: "Work Safety Monitoring",
    title: "Worker Safety Monitoring",
    body: "Detect signs of fatigue, distress, falls, heat stress, and zone risk, then notify supervisors with location context.",
  },
  {
    label: "Real-Time Health Tracking",
    title: "Live Health Signals",
    body: "Track heart rate, temperature, SpO2, movement, and status trends so EHS teams can act on changing conditions.",
  },
  {
    label: "Emergency Response",
    title: "Faster Response Coordination",
    body: "Manual SOS and automatic escalation help responders locate workers and triage incidents without waiting for radio check-ins.",
  },
  {
    label: "Compliance Reporting",
    title: "Compliance-Ready Logs",
    body: "Site teams can review timestamped alerts, worker status, and incident histories for safety audits and trend reporting.",
  },
  {
    label: "Remote Supervision",
    title: "Remote Monitoring",
    body: "Supervisors get site-wide visibility across remote, confined, underground, and low-connectivity environments.",
  },
];

const industries = [
  {
    title: "Construction",
    body: "Real-time alerts, fall detection, and worker visibility for high-risk capital works and active sites.",
    icon: "https://static.wixstatic.com/media/a550d3_060639cddd1f47399019c4e4d3b3a9ea~mv2.png/v1/fill/w_130,h_126,al_c,lg_1,q_85,enc_avif,quality_auto/suppor.png",
  },
  {
    title: "Manufacturing",
    body: "Fatigue, ergonomics, and distress monitoring for crews working long production shifts.",
    icon: "https://static.wixstatic.com/media/a550d3_9605498c9dc44e8e8df3af9598267e82~mv2.png/v1/fill/w_164,h_150,al_c,lg_1,q_85,enc_avif,quality_auto/working-factory.png",
  },
  {
    title: "Oil and Gas",
    body: "Worker status and SOS visibility for isolated, confined, offshore, and hazardous zones.",
    icon: "https://static.wixstatic.com/media/a550d3_32d88010ed6444a9bb1a9ebcc8273f46~mv2.png/v1/fill/w_148,h_150,al_c,lg_1,q_85,enc_avif,quality_auto/oil-bottle.png",
  },
  {
    title: "Mining",
    body: "Motionless-worker, heat, impact, and location alerts for underground and remote operations.",
    icon: "https://static.wixstatic.com/media/a550d3_e5b29d095d00405a8be683126702bdc6~mv2.png/v1/fill/w_164,h_150,al_c,lg_1,q_85,enc_avif,quality_auto/pickaxe.png",
  },
  {
    title: "Logistics",
    body: "Team coordination and wellbeing tracking across warehouses, yards, and transport operations.",
    icon: "https://static.wixstatic.com/media/d8b625_1ce1ec7496ab41a7877cbd17b041a309~mv2.png/v1/fill/w_119,h_115,al_c,lg_1,q_85,enc_avif,quality_auto/logistic-icon.png",
  },
];

const reviews = [
  [
    "Project Manager",
    "Construction Firm",
    "The watch changed how quickly we spot site hazards and contact workers who may need help.",
  ],
  [
    "Operations Director",
    "Logistics Company",
    "Rolling this across shifts gave us practical alerts without adding more manual check-ins.",
  ],
  [
    "Safety Coordinator",
    "Manufacturing Plant",
    "Predictive alerts helped our team move from reactive safety meetings to earlier intervention.",
  ],
  [
    "Safety Officer",
    "Industrial Operations",
    "A live view of worker health and location makes supervisor decisions much faster.",
  ],
  [
    "Field Engineer",
    "Energy Sector",
    "The watch is easy to wear and useful without becoming another distraction on site.",
  ],
];

const faqs = [
  [
    "How is an industrial smart watch different from a fitness tracker?",
    "A workplace safety watch is built for incident prevention. It combines health signals, motion, location, alerts, and site-system integration rather than passively counting activity.",
  ],
  [
    "What does the watch monitor in real time?",
    "It can track heart rate, body temperature, SpO2, movement, posture, location, fatigue indicators, and SOS events, then surface actionable alerts in the safety platform.",
  ],
  [
    "How does monitoring work end to end?",
    "The watch captures worker-level data, AI evaluates the signal at the edge or in the cloud, and viHUB gives supervisors alerts, records, and response context.",
  ],
  [
    "Can it detect fatigue, falls, and distress?",
    "Yes. Motion sensors, biometric trends, and configurable thresholds can trigger alerts for fatigue, falls, motionless states, critical vitals, and manual or automatic SOS.",
  ],
  [
    "Which industries benefit most?",
    "Construction, oil and gas, mining, manufacturing, and logistics benefit most because workers often operate in zones where supervisors cannot continuously see them.",
  ],
  [
    "Can it work in remote or low-connectivity areas?",
    "The system can support edge and hybrid deployments so safety logic can keep running close to the site when cloud connectivity is limited.",
  ],
];

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

export function SmartWatchClone() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(0);
  const currentCase = useCases[selectedCase];

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="viAct home">
          <img src={image.logo} alt="viAct" />
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navMenus.map((menu) => (
            <details className="nav-item" key={menu.label}>
              <summary>{menu.label}</summary>
              <div className="mega-menu">
                {menu.groups.map(([title, ...items]) => (
                  <div key={title}>
                    <p>{title}</p>
                    {items.map((item) => (
                      <a href="#overview" key={item}>
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </nav>

        <Button href="#demo">Schedule Demo</Button>
        <button
          className="mobile-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      {mobileOpen ? (
        <div className="mobile-menu">
          {navMenus.map((menu) => (
            <details key={menu.label}>
              <summary>{menu.label}</summary>
              {menu.groups.flatMap(([, ...items]) =>
                items.map((item) => (
                  <a
                    href="#overview"
                    key={item}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item}
                  </a>
                )),
              )}
            </details>
          ))}
          <Button href="#demo">Schedule Demo</Button>
        </div>
      ) : null}

      <section className="hero" id="top">
        <img className="hero-bg" src={image.heroWorker} alt="" aria-hidden />
        <div className="hero-copy">
          <h1>Revolutionize workplace safety with the smartest watch yet</h1>
          <p>
            AI and IoT worker monitoring for safer sites, faster response, and
            better operational visibility.
          </p>
          <Button href="#overview">Explore</Button>
        </div>
        <div className="watch-stage" aria-label="Smart watch product preview">
          <img src={image.watch} alt="AI-powered industrial smart watch" />
        </div>
      </section>

      <section className="award-strip" aria-label="Awards and recognition">
        {awards.map((award) => (
          <div className="award-logo" key={award.alt}>
            <img src={award.src} alt={award.alt} />
          </div>
        ))}
      </section>

      <section className="overview section-pad" id="overview">
        <div className="section-title">
          <span>Overview</span>
          <h2>Key features of the viAct Smart Watch</h2>
        </div>
        <div className="overview-grid">
          {overviewCards.map((card, index) => (
            <article
              className={index === 0 ? "overview-card wide" : "overview-card"}
              key={card.title}
            >
              <img src={card.img} alt="" />
              <div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
        <Button href="#demo">Get Started Now</Button>
      </section>

      <section className="features section-pad">
        <div className="section-title compact">
          <span>Unique Features</span>
          <h2>Built for safety teams that need live field signals</h2>
        </div>
        <div className="feature-list">
          {featureTiles.map((feature, index) => (
            <article className="feature-row" key={feature.title}>
              <div className="feature-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </div>
              <img src={feature.img} alt="" />
            </article>
          ))}
        </div>
        <Button href="#demo">Try Now</Button>
      </section>

      <section className="use-cases section-pad">
        <div className="section-title compact">
          <span>Use Cases</span>
          <h2>One wearable, many safety workflows</h2>
        </div>
        <div
          className="case-tabs"
          role="tablist"
          aria-label="Smart watch use cases"
        >
          {useCases.map((item, index) => (
            <button
              aria-selected={selectedCase === index}
              className={selectedCase === index ? "active" : ""}
              key={item.label}
              onClick={() => setSelectedCase(index)}
              role="tab"
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <article className="case-panel">
          <img
            src={image.useCase}
            alt="Worker monitoring dashboard shown with smart watch"
          />
          <div>
            <h3>{currentCase.title}</h3>
            <p>{currentCase.body}</p>
            <div className="case-metrics">
              <span>Vitals</span>
              <span>Location</span>
              <span>SOS</span>
              <span>Reports</span>
            </div>
          </div>
        </article>
      </section>

      <section className="industries section-pad">
        <div className="section-title compact">
          <span>Industries</span>
          <h2>Designed for harsh, distributed work sites</h2>
        </div>
        <div className="industry-grid">
          {industries.map((industry) => (
            <article className="industry-card" key={industry.title}>
              <img src={industry.icon} alt="" />
              <h3>{industry.title}</h3>
              <p>{industry.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews section-pad">
        <div className="reviews-head">
          <img src={image.testimonial} alt="" />
          <div>
            <span>Reviews</span>
            <h2>What people say about us</h2>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map(([role, company, quote]) => (
            <article className="review-card" key={`${role}-${company}`}>
              <p>{quote}</p>
              <div>
                <strong>{role}</strong>
                <span>{company}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="faq section-pad">
        <div className="section-title compact">
          <span>FAQ</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="demo" id="demo">
        <div>
          <span>Ready for a site walkthrough?</span>
          <h2>
            Connect worker-level safety data to your AI-IoT operations stack.
          </h2>
        </div>
        <Button href="https://www.viact.ai/demo" variant="secondary">
          Schedule Demo
        </Button>
      </section>

      <footer>
        <img src={image.logo} alt="viAct" />
        <p>AI-IoT worker safety for connected industrial sites.</p>
      </footer>
    </main>
  );
}
