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
  overviewLead:
    "https://static.wixstatic.com/media/d8b625_c69f53b5639d44a78ece468e366a0f44~mv2.png/v1/crop/x_79,y_0,w_1637,h_504/fill/w_1631,h_504,al_c,q_90,enc_avif,quality_auto/1.png",
  overviewAi:
    "https://static.wixstatic.com/media/d8b625_14e311c8ec3748f2856071e9cb35ce67~mv2.png/v1/fill/w_842,h_504,al_c,q_90,enc_avif,quality_auto/2.png",
  overviewIot:
    "https://static.wixstatic.com/media/d8b625_e04c7247a4c54b30b2c0b2692637937d~mv2.png/v1/crop/x_16,y_0,w_827,h_504/fill/w_827,h_504,al_c,q_90,enc_avif,quality_auto/3.png",
  overviewVersatile:
    "https://static.wixstatic.com/media/d8b625_e02bd3a108424becbec624777112d1df~mv2.png/v1/fill/w_842,h_504,al_c,q_90,enc_avif,quality_auto/4.png",
  overviewWorkforce:
    "https://static.wixstatic.com/media/d8b625_3c1b566537a54a7a9baa4a08d3ccf4d1~mv2.png/v1/crop/x_19,y_0,w_824,h_504/fill/w_824,h_504,al_c,q_90,enc_avif,quality_auto/5.png",
  feature1:
    "https://static.wixstatic.com/media/d8b625_f9b37c3f86de455ab3bbfa4992d6fc05~mv2.png/v1/crop/x_6,y_0,w_1098,h_615/fill/w_1098,h_615,al_c,q_90,enc_avif,quality_auto/Feature-1.png",
  feature2:
    "https://static.wixstatic.com/media/d8b625_ead9de31e58b402a845ab9b2195a29df~mv2.png/v1/crop/x_6,y_0,w_1098,h_615/fill/w_1098,h_615,al_c,q_90,enc_avif,quality_auto/Feature-2.png",
  feature3:
    "https://static.wixstatic.com/media/d8b625_9d685d27d32f4a9a9bc8ccec4dc4659e~mv2.png/v1/crop/x_20,y_0,w_1069,h_615/fill/w_1069,h_615,al_c,q_90,enc_avif,quality_auto/Feature-3.png",
  feature4:
    "https://static.wixstatic.com/media/d8b625_e50bdab4f3f5400fad10b3133fada8f1~mv2.png/v1/crop/x_6,y_0,w_1098,h_615/fill/w_1098,h_615,al_c,q_90,enc_avif,quality_auto/Feature-4.png",
  feature5:
    "https://static.wixstatic.com/media/d8b625_aee1580cccea4b3bb5a3f3c0c851d91b~mv2.png/v1/fill/w_1110,h_597,al_c,q_90,enc_avif,quality_auto/Feature-5.png",
  useCase:
    "https://static.wixstatic.com/media/d8b625_30c1eafbfe70478e84ffbbb38a5de072~mv2.png/v1/fill/w_1028,h_669,al_c,q_90,enc_avif,quality_auto/d8b625_30c1eafbfe70478e84ffbbb38a5de072~mv2.png",
  reviewArrow:
    "https://static.wixstatic.com/media/d8b625_fa91e1d9cc6046409a8c62d23c680872~mv2.png/v1/fill/w_198,h_268,al_c,lg_1,q_85,enc_avif,quality_auto/darrow%201_edited_edited.png",
  avatar:
    "https://static.wixstatic.com/media/f2078f_0bf8d0e10f2c49f88dce9cb42e1889ab%7Emv2.jpg/v1/fill/w_180%2Ch_180%2Clg_1%2Cusm_0.66_1.00_0.01/f2078f_0bf8d0e10f2c49f88dce9cb42e1889ab%7Emv2.jpg",
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

const linkMap: Record<string, string> = {
  "Computer Vision Platform": "https://www.viact.ai/video-analytics-solution",
  "Modules Hub": "https://www.viact.ai/aimodules",
  "Near Miss Detection":
    "https://www.viact.ai/video-analytics-solution/near-miss-detection",
  "Worker Fatigue Detection":
    "https://www.viact.ai/video-analytics-solution/worker-fatigue-detection",
  "Unconscious Worker Detection":
    "https://www.viact.ai/video-analytics-solution/unconscious-worker-detection",
  Manufacturing:
    "https://www.viact.ai/industry/manufacturing-ai-safety-solution",
  "Automotive and EV":
    "https://www.viact.ai/manufacturing/ai-for-automotive-ev-industry",
  "Food and Beverage":
    "https://www.viact.ai/manufacturing/ai-for-food-beverage-industry",
  Construction:
    "https://www.viact.ai/industry/construction-ai-safety-solution",
  Mining: "https://www.viact.ai/mining",
  "Oil and Gas": "https://www.viact.ai/industry/oil-and-gas-ai-safety-solution",
  Logistics:
    "https://www.viact.ai/industry/logistics-supply-chain-ai-safety-solution",
  "Smart Watch": "https://www.viact.ai/iot/smart-watch",
  "Smart Helmet": "https://www.viact.ai/iot/smart-helmet",
  "viLID - LiDAR": "https://www.viact.ai/vilid",
  "viAER - Drone": "https://www.viact.ai/viaer",
  "viMOV - Mobility": "https://www.viact.ai/vimov",
  "viHUB Platform": "https://www.viact.ai/vihub",
  "4S Safety System": "https://www.viact.ai/smart-site-safety-system",
  "Permit to Work": "https://www.viact.ai/permit-to-work-software",
  "Crane Safety": "https://www.viact.ai/solutions/crane-safety-software",
  "Forklift Safety": "https://www.viact.ai/solutions/forklift-safety-system",
  "Vehicle Control":
    "https://www.viact.ai/solutions/vehicle-control-management-software",
  "Lone Worker Monitoring":
    "https://www.viact.ai/solutions/lone-worker-monitoring-system",
  "Incident Management":
    "https://www.viact.ai/solutions/incident-management-software",
  "Area Control": "https://www.viact.ai/solutions/area-control-safety-system",
  "Space Management":
    "https://www.viact.ai/solutions/industrial-space-management-solution",
  "Channel Partner": "https://www.viact.ai/channel-partner-program",
  "Reseller Partner": "https://www.viact.ai/reseller-partner-program",
  "Tech Partner": "https://www.viact.ai/tech-partner-program",
  "Case Studies": "https://www.viact.ai/case-studies",
  Guides: "https://www.viact.ai/guides",
  Glossary: "https://www.viact.ai/glossary",
  Blog: "https://www.viact.ai/blogs",
};

const hrefFor = (label: string) => linkMap[label] ?? "https://www.viact.ai";

const overviewLead = {
  title: "More Than a Wearable",
  body: "A cutting-edge tool designed to enhance safety and productivity in demanding work environments.",
  img: image.overviewLead,
};

const overviewTiles = [
  {
    title: "Advanced AI Capabilities",
    bullets: [
      "Delivers real-time health monitoring.",
      "Provides predictive safety alerts to prevent accidents before they happen.",
    ],
    img: image.overviewAi,
  },
  {
    title: "Robust IoT Integration",
    bullets: [
      "Seamlessly connects to other devices and systems for streamlined operations.",
      "Ensures uninterrupted communication across teams.",
    ],
    img: image.overviewIot,
  },
  {
    title: "Versatile Applications",
    bullets: [
      "Ideal for construction sites, manufacturing facilities, and other high-risk work environments.",
    ],
    img: image.overviewVersatile,
  },
  {
    title: "Empowering the Workforce",
    bullets: [
      "Keeps users connected, informed, and safe-maximizing efficiency and peace of mind.",
    ],
    img: image.overviewWorkforce,
  },
];

const featureRows = [
  {
    title: "AI-Enhanced Monitoring",
    body: "The viAct Smart Watch leverages proprietary computer vision AI to provide real-time health and safety monitoring. It ensures users remain aware of their physical condition and surroundings, enhancing both safety and situational awareness.",
    img: image.feature1,
    imageFirst: false,
  },
  {
    title: "Customizable Alerts",
    body: "Tailor notifications to specific needs, such as health metrics or safety warnings. This feature allows for immediate action in critical situations, providing a personalized and proactive safety approach.",
    img: image.feature2,
    imageFirst: true,
  },
  {
    title: "Seamless IoT Integration",
    body: "Designed to integrate effortlessly with other IoT devices in the Smart Site Safety System, the watch enhances situational awareness, streamlines workflows, and boosts overall operational efficiency.",
    img: image.feature3,
    imageFirst: false,
  },
  {
    title: "Rugged Durability with Sleek Design",
    body: "Built to endure harsh environments, the Smart Watch combines a robust, rugged design with a sleek, modern aesthetic, ensuring it's as functional as it is stylish.",
    img: image.feature4,
    imageFirst: true,
  },
  {
    title: "Extended Battery Life",
    body: "With advanced battery technology, the Smart Watch delivers long-lasting performance, ensuring reliability for extended shifts in demanding work environments.",
    img: image.feature5,
    imageFirst: false,
  },
];

const useCases = [
  {
    label: "Work Safety Monitoring",
    title: "Worker Safety Monitoring",
    body: "Detects signs of fatigue or distress among construction and industrial workers and alerts supervisors, helping prevent accidents and ensuring a safer workplace.",
  },
  {
    label: "Real-Time Health Tracking",
    title: "Real-Time Health Tracking",
    body: "Tracks health metrics throughout the shift so supervisors can react to early warning signs and keep workers protected.",
  },
  {
    label: "Emergency Response Coordination",
    title: "Emergency Response Coordination",
    body: "Connects SOS alerts, worker status, and location context to speed up response during critical site events.",
  },
  {
    label: "Regulatory Compliance and Reporting",
    title: "Regulatory Compliance and Reporting",
    body: "Keeps safety events, alerts, and worker status visible for operational reviews and compliance reporting.",
  },
  {
    label: "Remote Monitoring for Supervisors",
    title: "Remote Monitoring for Supervisors",
    body: "Gives supervisors a practical way to monitor distributed, remote, and high-risk workforces from a central view.",
  },
];

const industries = [
  {
    title: "Construction",
    body: "Delivers real-time safety alerts and seamless communication to reduce incident response times and improve on-site safety.",
    icon: "https://static.wixstatic.com/media/a550d3_060639cddd1f47399019c4e4d3b3a9ea~mv2.png/v1/fill/w_130,h_126,al_c,lg_1,q_85,enc_avif,quality_auto/suppor.png",
  },
  {
    title: "Manufacturing",
    body: "Continuously monitors worker health, detecting fatigue or distress early to minimize workplace accidents and improve well-being.",
    icon: "https://static.wixstatic.com/media/a550d3_9605498c9dc44e8e8df3af9598267e82~mv2.png/v1/fill/w_164,h_150,al_c,lg_1,q_85,enc_avif,quality_auto/working-factory.png",
  },
  {
    title: "Oil and Gas",
    body: "Ensures safety in high-risk environments with health monitoring and immediate alerts, allowing for prompt action to prevent accidents.",
    icon: "https://static.wixstatic.com/media/a550d3_32d88010ed6444a9bb1a9ebcc8273f46~mv2.png/v1/fill/w_148,h_150,al_c,lg_1,q_85,enc_avif,quality_auto/oil-bottle.png",
  },
  {
    title: "Mining",
    body: "Provides instant hazard alerts and communication tools to keep miners connected and informed in real-time, enhancing safety protocols.",
    icon: "https://static.wixstatic.com/media/a550d3_e5b29d095d00405a8be683126702bdc6~mv2.png/v1/fill/w_164,h_150,al_c,lg_1,q_85,enc_avif,quality_auto/pickaxe.png",
  },
  {
    title: "Logistics",
    body: "Enhances team coordination with instant messaging and alerts, boosting operational efficiency in warehouses and during transport operations.",
    icon: "https://static.wixstatic.com/media/d8b625_1ce1ec7496ab41a7877cbd17b041a309~mv2.png/v1/fill/w_119,h_115,al_c,lg_1,q_85,enc_avif,quality_auto/logistic-icon.png",
  },
];

const reviews = [
  [
    "Project Manager",
    "Construction Firm",
    "The Smart Watch has transformed our safety protocols. It alerts us to potential hazards before they happen, making our team feel much safer on site!",
  ],
  [
    "Safety Coordinator",
    "Manufacturing Plant",
    "The AI features are impressive! The predictive alerts have helped us prevent accidents and improve overall site safety in real time.",
  ],
  [
    "Field Engineer",
    "Energy Sector",
    "I love how user-friendly the Smart Watch is! It keeps me connected without being distracting, and the health tracking features give me peace of mind.",
  ],
  [
    "Operations Director",
    "Logistics Company",
    "We implemented the Smart Watch across our workforce, and the feedback has been overwhelmingly positive. It's a game-changer for worker safety!",
  ],
  [
    "Safety Officer",
    "Industrial Operations",
    "The ability to monitor my team's health and safety in real-time has been invaluable. The insights from the Smart Watch help me make informed decisions quickly.",
  ],
];

const faqs = [
  [
    "How is an Industrial Smart Watch different from a normal fitness tracker?",
    "A workplace safety watch is built for incident prevention. It combines health signals, motion, location, alerts, and site-system integration rather than passively counting activity.",
  ],
  [
    "What does an industrial IoT smart watch actually monitor in real time?",
    "It can track heart rate, body temperature, SpO2, movement, posture, location, fatigue indicators, and SOS events, then surface actionable alerts in the safety platform.",
  ],
  [
    "How does safety monitoring with viAct IoT smart watch work end-to-end?",
    "The watch captures worker-level data, AI evaluates the signal at the edge or in the cloud, and viHUB gives supervisors alerts, records, and response context.",
  ],
  [
    "Can viAct IoT smart watch detect worker fatigue?",
    "Yes. Biometric trends, motion signals, and configurable thresholds can flag fatigue risk so supervisors can intervene earlier during long or high-risk shifts.",
  ],
  [
    "How does a smart safety watch detect fall events and worker distress?",
    "Motion sensors, posture changes, motionless-worker detection, critical vitals, and manual or automatic SOS can trigger alerts for falls, distress, and non-response events.",
  ],
  [
    "Which industries benefit most from an IoT Safety Watch integration?",
    "Construction, oil and gas, mining, manufacturing, and logistics benefit most because workers often operate in zones where supervisors cannot continuously see them.",
  ],
  [
    "How does viAct Industrial Smart Watch detect and help prevent workplace heat stress?",
    "Skin temperature, heart rate, SpO2, and weather-station context can trigger early warnings so workers and supervisors can intervene before collapse or impairment.",
  ],
  [
    "How does the Smart Watch protect lone workers in remote, confined, underground, or isolated environments with low connectivity?",
    "Location tracking, motionless-worker detection, fall detection, SOS escalation, and edge processing support workers in remote, confined, underground, or low-connectivity zones.",
  ],
  [
    "How much does viAct's Smart Watch cost, and is it available on subscription?",
    "Pricing depends on device count, activated modules, connectivity, deployment model, and contract length. The original page directs commercial questions to sales or a demo.",
  ],
  [
    "How does viAct's Smart Watch protect worker privacy while monitoring health data?",
    "The system treats biometric data as safety and operational data, uses role-based access, encrypts data in transit and at rest, and supports on-premises deployment where required.",
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
        <a className="brand" href="https://www.viact.ai" aria-label="viAct home">
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
                      <a href={hrefFor(item)} key={item}>
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </nav>

        <Button href="https://www.viact.ai/demo">Schedule Demo</Button>
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
                    href={hrefFor(item)}
                    key={item}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item}
                  </a>
                )),
              )}
            </details>
          ))}
          <Button href="https://www.viact.ai/demo">Schedule Demo</Button>
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
          <Button href="https://www.viact.ai/demo">Explore</Button>
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
          <h2>Key Features of the viAct Smart Watch</h2>
        </div>
        <div className="overview-grid">
          <article className="overview-card overview-card-wide">
            <img className="overview-card-bg" src={overviewLead.img} alt="" />
            <div className="overview-card-copy">
              <h3>{overviewLead.title}</h3>
              <p>{overviewLead.body}</p>
            </div>
          </article>
          {overviewTiles.map((card) => (
            <article className="overview-card" key={card.title}>
              <img className="overview-card-bg" src={card.img} alt="" />
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
        <Button href="https://www.viact.ai/demo">Get Started Now</Button>
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
              </div>
              <img
                className="feature-media"
                src={feature.img}
                alt={`${feature.title} smart watch interface`}
              />
            </article>
          ))}
        </div>
        <Button href="https://www.viact.ai/demo">Try Now</Button>
      </section>

      <section className="use-cases section-pad" id="use-cases">
        <h2>Use Cases</h2>
        <div className="case-layout">
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
              alt="Worker safety monitoring use case"
            />
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
              <img src={industry.icon} alt="" />
              <h3>{industry.title}</h3>
              <p>{industry.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews section-pad" id="reviews">
        <div className="reviews-shell">
          <div className="reviews-badge">Reviews</div>
          <h2>What do people say about us?</h2>
          <img className="reviews-arrow" src={image.reviewArrow} alt="" />
          <div className="review-grid">
            {reviews.map(([role, company, quote]) => (
              <article className="review-card" key={`${role}-${company}`}>
                <div className="quote-mark" aria-hidden>
                  &quot;
                </div>
                <p>{quote}</p>
                <div className="review-author">
                  <img src={image.avatar} alt="" />
                  <div>
                    <strong>{role}</strong>
                    <span>{company}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
