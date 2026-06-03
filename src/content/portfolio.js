/* ============================================================
   PORTFOLIO CONTENT
   ------------------------------------------------------------
   The three case studies below (Aperture, Cadence, Meridian) are
   well-reasoned DEMO pieces — they exist so the site reads as real
   and show the case-study structure. Replace them with your own
   work as you build it. Edit `profile` with your real links.
   ============================================================ */

export const profile = {
  name: 'Netsakh Walewangko',
  monogram: 'NW',
  role: 'Product & UI/UX Designer',
  email: 'netsakhwalewangko@gmail.com',
  // TODO: tweak to your real location / availability line
  location: 'Working remotely · worldwide',
  socials: {
    linkedin: 'https://www.linkedin.com/in/netsakh-walewangko-08170325a',
    whatsapp: 'https://wa.me/6282290747795',
    github: 'https://github.com/theflorist18',
    // Your existing security-research portfolio — cross-linked, kept separate
    security: 'https://theflorist18.github.io/el_portafolio/',
  },
}

const content = {
  "hero": {
    "eyebrow": "PRODUCT / UI-UX DESIGN",
    "headline": "Interfaces that\nearn their restraint",
    "subhead": "I design products for clarity under pressure — the moments where a single decision either steadies a user or loses them.",
    "micro": "Open to select product work, 2026",
    "ctaPrimary": "See selected work",
    "ctaSecondary": "Read the approach"
  },
  "about": {
    "heading": "About",
    "paragraphs": [
      "Netsakh Walewangko is a product and UI/UX designer working where structure meets feel. The work tends toward systems — type scales, state logic, the quiet rules that hold a product together as it grows.",
      "Before a screen exists there is a question: what is the person actually trying to do, and what stands in the way. The interface is the answer to that question, edited until nothing extra remains.",
      "A second discipline runs alongside the design practice — security research, kept at a separate address. The overlap is a habit of mind: read the system honestly, find where it breaks, design for the case nobody planned for."
    ],
    "philosophy": "Design is decisions made visible — every element should be able to say why it is there."
  },
  "skills": [
    {
      "group": "Product design",
      "items": [
        "Interaction design",
        "Information architecture",
        "Flows and state mapping",
        "Prototyping",
        "Usability testing"
      ]
    },
    {
      "group": "Design systems",
      "items": [
        "Component libraries",
        "Type and spacing scales",
        "Tokens and theming",
        "Accessibility (WCAG)",
        "Documentation"
      ]
    },
    {
      "group": "Craft and tooling",
      "items": [
        "Figma",
        "Motion and micro-interaction",
        "Front-end handoff",
        "HTML / CSS",
        "Spline"
      ]
    },
    {
      "group": "Research",
      "items": [
        "User interviews",
        "Competitive teardown",
        "Heuristic review",
        "Synthesis and framing"
      ]
    }
  ],
  "contact": {
    "heading": "Contact",
    "line": "If you are building something that deserves careful attention, I would like to hear about it.",
    "ctaLabel": "Start a conversation"
  },
  "seo": {
    "title": "Netsakh Walewangko — Product & UI/UX Designer",
    "description": "Product and UI/UX designer focused on clarity, design systems, and considered interaction. Selected work, approach, and a way to get in touch.",
    "ogTitle": "Netsakh Walewangko — Product & UI/UX Designer",
    "ogDescription": "Interfaces that earn their restraint. Product and UI/UX design, design systems, and considered interaction — by Netsakh Walewangko."
  },
  "marquee": [
    "PRODUCT DESIGN",
    "DESIGN SYSTEMS",
    "INTERACTION",
    "PROTOTYPING",
    "RESEARCH",
    "ACCESSIBILITY",
    "TYPOGRAPHY",
    "MOTION"
  ],
  "studies": [
    {
      "slug": "aperture",
      "title": "Aperture",
      "tagline": "Rebuilding the trust moment in fintech onboarding — where verification met the most users and lost the most of them.",
      "category": "Fintech / 0 to 1 onboarding redesign",
      "year": "2026",
      "role": [
        "Lead product designer",
        "Interaction and flow design",
        "Usability research",
        "Front-end handoff"
      ],
      "tools": [
        "Figma",
        "FigJam",
        "Maze",
        "Lyssna (unmoderated tests)",
        "Lottie"
      ],
      "summary": "A redesign concept for a consumer money app's onboarding, focused on the identity-verification step where the largest share of new users stalled or quit. The work reframed verification as a moment the product earns rather than demands, and cut the path from eleven screens to six.",
      "accent": "#A8773C",
      "problem": [
        "Onboarding asked for a government ID and a live selfie within the first ninety seconds — before the product had shown a single reason to trust it with either.",
        "The verification step was a black box. Once a user submitted documents, the screen offered no estimate of how long it would take, no sense of what was happening, and no way out without losing progress.",
        "Eleven screens stood between install and a funded account. Each carried its own validation, its own copy, its own chance to lose someone — and the drop was steepest exactly where the stakes felt highest."
      ],
      "research": [
        "Funnel data placed the sharpest fall at the ID-capture screen: of those who reached it, a large share opened it, hesitated, and never submitted. The exit was deliberate, not accidental — people read the screen and chose to stop.",
        "Across eight unmoderated sessions, the recurring phrase was a version of 'why do they need this already.' The objection was rarely the camera or the upload; it was being asked before the product had earned the ask.",
        "A teardown of six competitors showed two camps: those who front-loaded verification and bled users, and those who let people explore a limited account first and verified only at the moment money moved. The second camp converted noticeably better in their own published figures."
      ],
      "process": [
        "The first instinct was to polish the ID screen — better camera framing, friendlier copy. I built it, tested it, and the drop barely moved. The screen was not the problem; its position in the sequence was. That dead end was the most useful result of the project, because it pushed the work upstream.",
        "I remapped the flow as a state machine and asked a blunt question of every screen: what does the user get for completing this, and could it wait. Most could. Verification only genuinely needs to happen before the first outbound transfer, not before account creation — so I moved it there and let people in earlier.",
        "Deferring verification created a real risk: a half-verified account is a compliance and fraud surface. I worked through the constraint rather than around it — an explore-only state with hard caps on what an unverified account can do, and a single honest prompt at the moment a user tries to cross that line, when the reason for the ask is self-evident.",
        "For the step itself, I replaced the silent black box with a three-state strip — capturing, checking, done — carrying a realistic time estimate and a clear way to set it down and return. Reframing a wait as a visible, bounded process did more for perceived trust than any reassurance copy I tried."
      ],
      "solution": [
        "Verification moved from the second screen to the moment it is actually required — the first transfer — so the product proves itself before it asks anything sensitive of the user.",
        "An explore-only account state lets new users browse, set up, and understand the product within safe limits, turning a hard gate into a gradual one without weakening the underlying compliance requirement.",
        "The verification step became legible: a live status strip with a bounded time estimate, plain-language reasons for each request, and a resume-later path that holds the user's place instead of discarding it."
      ],
      "impact": [
        "In a moderated prototype test with twelve participants, completion through onboarding rose from seven of twelve on the current flow to eleven of twelve on the redesign — and hesitation at verification, measured as time-to-first-action on that screen, fell by roughly half. These are prototype figures; a production claim would require a live A/B.",
        "Participants described the deferred-verification flow as 'fair' and 'in my control.' The same step that had read as a demand now read as a reasonable request, which was the entire intent."
      ],
      "reflection": [
        "The strongest decision was the one that looked like a detour: spending real effort polishing the ID screen, watching it fail, and treating that failure as the finding. It is what gave me the evidence to argue for moving the step rather than decorating it.",
        "Taken further, I would pressure-test the explore-only state against fraud and regulatory review earlier, with the actual compliance team. The design holds in a prototype, but the real constraint lives in policy — that is where a concept like this is won or lost."
      ],
      "metrics": [
        { "value": "11 → 6", "label": "Screens from install to funded account" },
        { "value": "7/12 → 11/12", "label": "Onboarding completion in prototype test" },
        { "value": "~50%", "label": "Drop in hesitation at verification (time-to-action)" },
        { "value": "12", "label": "Moderated test participants" }
      ],
      "deliverables": [
        "Annotated current-state flow audit with drop-off mapped to each screen",
        "State-machine diagram of the redesigned onboarding, including the explore-only account state",
        "High-fidelity Figma prototype of the six-screen flow",
        "Verification status component with capturing / checking / done states",
        "Usability test plan and synthesis from twelve moderated sessions",
        "Front-end handoff notes and Lottie specs for the status strip"
      ]
    },
    {
      "slug": "cadence",
      "title": "Cadence",
      "tagline": "A habit companion built for gentle consistency, not the dopamine of the streak.",
      "category": "Wellness / 0 to 1 product",
      "year": "2025",
      "role": [
        "Lead product designer",
        "Interaction and visual design",
        "User research",
        "Design-system author"
      ],
      "tools": ["Figma", "FigJam", "Maze", "Spline", "Principle"],
      "summary": "A 0-to-1 habit-building app that treats consistency as a long arc rather than an unbroken line — designed so a missed day reads as ordinary, not as failure.",
      "accent": "#8C9B86",
      "problem": [
        "Habit apps borrow their core loop from games: a counter that climbs while you comply and resets to zero the moment you slip. The streak is engineered to be addictive, and it works — until it doesn't.",
        "For the behaviours people actually care about — sleep, movement, reading, time off a screen — the streak quietly inverts the goal. A broken count becomes a reason to abandon the habit entirely, because the number can no longer be perfect.",
        "The brief asked a harder question than how to drive engagement: how do you design motivation that survives an off day, and survives the user no longer needing the app at all."
      ],
      "research": [
        "Twelve interviews with people who had tried and quit at least two habit apps. The recurring moment was not boredom but shame — a specific memory of the number resetting, and the decision to stop opening the app rather than face it.",
        "A teardown of nine competitors showed near-total convergence: a flame icon, a count, and red used to mark absence. Streaks, notification pressure, and loss-aversion language were treated as the genre's defaults rather than choices.",
        "Behaviour-change literature — Fogg, and habit-formation work that puts automaticity well past the mythical 21 days — pointed the same direction: consistency is built by lowering the cost of returning after a lapse, not by punishing the lapse."
      ],
      "process": [
        "First decision: remove the streak counter outright. Early concepts kept a gentler streak — greying out instead of red, freezing the number — but testing showed people still read any single tracked number as a score to protect. The half-measures preserved the anxiety. The number had to go entirely.",
        "I replaced it with a rolling 30-day band: a quiet horizontal field where each day is a soft mark, denser when you show up, never empty when you don't. It answers 'how have I been lately' instead of 'how perfect is my record', and a single gap barely changes the texture.",
        "That is where the small model came from. I named three states a habit can be in — Tending (active, recent), Resting (a planned or natural pause), Returning (picking back up). The product's job is to make Returning frictionless: one tap, warm copy, no ceremony, no apology asked for. Most decisions trace back to which state a screen is serving.",
        "The hardest fight was notifications. A reminder is a nudge or a guilt trip depending on tone and timing. I cut the count from every message, removed the night-time 'don't lose your streak' prompt entirely, and rewrote reminders as invitations — 'a good time to read?' — that go quiet on their own after two unanswered days rather than escalating."
      ],
      "solution": [
        "A habit's home is the 30-day band, not a number — a calm record of presence that absorbs a missed day without visibly flinching. Tapping a day shows context, never a verdict.",
        "The three-state model lives in the interface, not just the strategy deck. Pausing a habit is a first-class, one-tap action framed as rest, so stepping away never means deleting and starting over at zero.",
        "A restrained system underneath: a four-step type scale, eight-point spacing, and the sage accent reserved only for the act of showing up — so the single moment of colour is the moment of doing, not the moment of being reminded."
      ],
      "impact": [
        "In moderated testing with sixteen participants over a simulated two-week flow, fourteen described the missed-day experience as 'neutral' or 'fine' — against a baseline where most could recall quitting a previous app specifically over a reset count. Success on pausing and resuming a habit reached 15/16, with the average resume taking under four seconds.",
        "Self-reported intent to keep using after a deliberate three-day gap ran markedly higher than for the streak-based control. The phrase that recurred was 'it doesn't make me feel watched.' These figures come from a small qualitative study and are directional, not market-validated."
      ],
      "reflection": [
        "Removing the streak was the right call and the riskiest one — it strips out the cheap engagement lever the whole genre leans on, and a real launch would have to prove that calm retains as well as anxiety does over months, not a two-week test. I would want a longitudinal study before claiming it.",
        "The deeper lesson was that a design model earns its place only when it changes the pixels. Tending / Resting / Returning could have stayed a tidy diagram; it mattered because every contested decision — copy, colour, when a notification goes silent — had a clear question to answer: which state is the person in, and what would a kind product do next."
      ],
      "metrics": [
        { "value": "14/16", "label": "found a missed day emotionally neutral" },
        { "value": "15/16", "label": "succeeded at pause and resume" },
        { "value": "<4s", "label": "average time to resume a habit" },
        { "value": "0", "label": "guilt-framed notifications shipped" }
      ],
      "deliverables": [
        "End-to-end product design, onboarding through long-term use",
        "The Cadence design system: tokens, type and spacing scales, component library",
        "Tending / Resting / Returning behaviour model and decision framework",
        "Interactive Figma prototype of the core habit loop",
        "Notification tone-and-timing guidelines",
        "Accessibility pass to WCAG AA, including non-colour state cues"
      ]
    },
    {
      "slug": "meridian",
      "title": "Meridian",
      "tagline": "A design system for a B2B platform that had outgrown its own consistency.",
      "category": "B2B SaaS / Design system",
      "year": "2025",
      "role": [
        "Lead product designer, design system",
        "Token architecture and theming",
        "Component API and documentation",
        "Accessibility and governance"
      ],
      "tools": ["Figma", "Variables and tokens", "Storybook", "Style Dictionary", "WCAG audit tooling"],
      "summary": "A unifying design system — tokens, components, governance, and accessibility built in — for a 40-person B2B SaaS that had drifted into eleven shades of the same blue and four ways to confirm a destructive action.",
      "accent": "#4E8A90",
      "problem": [
        "The product had grown faster than its rules. Three squads shipped in parallel, each solving the same interface problems in isolation — buttons, tables, empty states, validation — until the platform spoke in slightly different accents on every screen.",
        "An audit surfaced the cost: eleven blues that should have been one, four distinct confirmation patterns for destructive actions, and modals that trapped keyboard focus on some screens and leaked it on others. Inconsistency had quietly become a reliability problem.",
        "Engineering felt it as duplication; users felt it as friction. The same task looked different depending on which team had built the page, and trust erodes when a product cannot agree with itself."
      ],
      "research": [
        "I started with an inventory, not a redesign. Pulling every production screen onto one board made the drift legible: I counted the variants of each pattern and tagged where two components did the same job under different names.",
        "Interviews with seven engineers and three PMs located the real failure point — not taste, but handoff. Designers shipped pixels; engineers reverse-engineered intent. Decisions lived in people's heads, so they were re-litigated on every feature.",
        "A teardown of three mature systems — Carbon, Polaris, Atlassian — clarified the trade I wanted to make: enough constraint to remove decisions, enough escape hatch to avoid forking the system the first time it didn't fit."
      ],
      "process": [
        "The first real decision was where truth lives. I built a three-tier token model — primitive, semantic, component — so a colour was never named for what it looked like (blue-600) but for what it did (action.background.default). It costs more upfront and pays back every time the brand shifts or a dark theme arrives without touching a single component.",
        "I resisted building components first. A library on shaky tokens just hardens the inconsistency. So tokens shipped and got adopted in live code before a single component was official — proof the foundation held weight under real load.",
        "The hardest debate was governance, not pixels. A locked system breeds shadow components; a fully open one is no system at all. We settled on a contribution model: anything used twice becomes a candidate, a lightweight RFC records the reasoning, and a rotating review keeps any one person from becoming the bottleneck.",
        "I cut scope on purpose. The temptation was to systematise everything at once; instead I sequenced by blast radius — buttons, inputs, and the destructive-action pattern first, because they appeared on nearly every screen and carried the most risk when wrong."
      ],
      "solution": [
        "Meridian shipped as a coupled set: a tokenised foundation in Figma variables mirrored one-to-one in code via Style Dictionary, a component library with documented APIs, and a governance handbook that treats the system as a product with a roadmap rather than a frozen asset.",
        "Every component carries its reasoning. Each entry states what it is for, when not to use it, its accessibility contract, and the token it draws from — so the why travels with the what and stops being re-argued in code review.",
        "Accessibility is structural, not a pass at the end. Contrast is guaranteed by semantic token pairs that fail the build if they drop below 4.5:1, focus order is part of each component's spec, and the single confirmation pattern for destructive actions now reads the same to a screen reader on every screen."
      ],
      "impact": [
        "In moderated usability testing across three core flows, completion rose from roughly 71% to 88% (n=12), and participants stopped hesitating at confirmation steps once the destructive-action pattern read identically everywhere. These are illustrative figures from a controlled session, not production analytics.",
        "Internally the system removed argument: eleven blues collapsed to one semantic set, the first dark theme shipped by retokenising rather than rebuilding, and new feature work began from assembled components instead of blank frames."
      ],
      "reflection": [
        "The system succeeded as much for its governance as its components. The handbook and contribution model were the unglamorous parts I almost under-invested in, and they are the reason Meridian kept cohering after I stepped back instead of quietly forking.",
        "If I ran it again I would seat an engineer in the token work from day one. I treated adoption as a downstream handoff when it was the actual design problem — a system is only real on the day someone else builds with it without asking me what a token means."
      ],
      "metrics": [
        { "value": "+17pts", "label": "Task completion in usability testing (71% to 88%, n=12)" },
        { "value": "11 → 1", "label": "Blues collapsed to a single semantic action colour" },
        { "value": "3 tiers", "label": "Token architecture: primitive, semantic, component" },
        { "value": "4 → 1", "label": "Destructive-action patterns unified" }
      ],
      "deliverables": [
        "Tokenised foundation in Figma variables, mirrored in code via Style Dictionary",
        "Component library with documented APIs and usage boundaries",
        "Three-tier token architecture with built-in dark-theme support",
        "Accessibility contract per component, contrast enforced at build time",
        "Governance handbook and contribution RFC model",
        "Production audit board mapping every pattern and its variants"
      ]
    }
  ]
}

export const { hero, about, skills, contact, seo, marquee, studies } = content
export const getStudy = (slug) => studies.find((s) => s.slug === slug)
export const studyIndexBySlug = (slug) => studies.findIndex((s) => s.slug === slug)
