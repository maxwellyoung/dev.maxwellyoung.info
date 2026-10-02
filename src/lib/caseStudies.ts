// Case study data - shared between metadata and page component

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  timeline: string;
  role: string;
  team?: string;
  tools: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  challenge: string;
  constraints?: string[];
  decisionLog?: {
    problem: string;
    decision: string;
    tradeoff: string;
    impact?: string;
  }[];
  approach: {
    title: string;
    description: string;
    image?: string;
  }[];
  outcome: string;
  proofPoints?: { label: string; value: string }[];
  avoidedPatterns?: string[];
  nextIterations?: string[];
  learnings: string[];
  nextProject?: { slug: string; title: string };
}

// Employer work stays at project-summary level unless publication is explicitly
// approved. Case studies below cover independent and already-public client work.
export const caseStudies: Record<string, CaseStudy> = {
  afterlight: {
    slug: "afterlight",
    title: "Afterlight",
    subtitle: "Recover a concert history without surrendering it",
    heroImage: "/projectImages/afterlight-cover-2.webp",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    liveUrl: "https://afterlight.ninetynine.digital",
    overview:
      "Afterlight is available on the iPhone App Store as a concert diary. This case study describes the broader Recovery Desk under development, rather than claiming its advanced native integrations are included in that published build. It turns ticket files, incoming shares, calendars, photos, Gmail receipts, Setlist.fm attendance, and listening history into reviewable clues on-device. A clue never becomes a claimed night until the person confirms it.",
    challenge:
      "Concert memories are distributed across camera rolls, ticket receipts, calendar events, Wallet passes, files, setlists, and half-remembered nights. Those sources have very different confidence: a Spotify play is a hint, while a ticket and dated venue photo together are stronger evidence. The product problem was not merely importing data; it was reconciling ambiguous evidence without letting software invent attendance.",
    constraints: [
      "The canonical diary and recovery queue must work on-device; optional connected services cannot become the source of truth.",
      "Low-confidence evidence can suggest a night but can never auto-confirm attendance.",
      "Calendar, photo, and email access must be permission-gated, purpose-limited, and reduced to concert fields rather than retained source content.",
      "Solo build — every feature competes with finishing.",
    ],
    decisionLog: [
      {
        problem: "Each import source originally behaved like its own workflow, and some hints could move too close to diary creation.",
        decision: "Put every source behind one versioned candidate model with provenance, confidence, deduplication, dismissal, editing, and explicit confirmation.",
        tradeoff: "Every integration has to translate into the shared evidence vocabulary instead of taking a shortcut to the diary.",
        impact: "The app can add new recovery sources without weakening the trust boundary: evidence proposes, the person decides.",
      },
      {
        problem: "Music apps default to streaming-service aesthetics — gradients, glass, glow.",
        decision: "Authored a design system from gig poster modernism instead: Factory Records palette, Swiss type discipline, grain, true black.",
        tradeoff: "A strong aesthetic position will alienate some users.",
        impact: "The app feels like the objects it's about — posters, tickets, the printed ephemera of going out.",
      },
      {
        problem: "Spring animation invites spectacle.",
        decision: "Built a small motion grammar — a handful of springs used consistently, nothing animating from scale(0), nothing over 300ms.",
        tradeoff: "Restraint reads as less impressive in a screen recording.",
        impact: "Motion clarifies state instead of performing for the user.",
      },
    ],
    approach: [
      {
        title: "One desk for scattered evidence",
        description:
          "Shares, uploads, calendar scans, photo clusters, Gmail receipts, Setlist.fm attendance, and Spotify hints all land in the same Recovery Desk. Provenance survives merging, so a candidate can explain why it exists.",
      },
      {
        title: "Confirmation is the write boundary",
        description:
          "Recovery candidates remain separate from confirmed concerts. People can review, correct, dismiss, or complete them; only completion calls the existing local concert-creation path.",
      },
      {
        title: "Native reach, local core",
        description:
          "iOS and Android share targets, calendar and photo access, and native Gmail OAuth reach evidence where it already lives. The canonical diary and candidate queue stay on-device, while optional network lookups enrich rather than own the record.",
      },
      {
        title: "Gig poster modernism",
        description:
          "The interface borrows from the printed history of live music — FAC blue, true black, grain textures, and Swiss type discipline — with a restrained motion grammar used to clarify state.",
      },
    ],
    outcome:
      "The concert diary is published on the iPhone App Store. The newer recovery system has local implementations across web and native entry points and regression coverage around evidence parsing and confirmation. Advanced native integrations and improved portable backups remain in development; their inclusion in the published app has not been established.",
    proofPoints: [
      { label: "Published", value: "iPhone App Store" },
      { label: "Recovery work", value: "In development" },
      { label: "Diary writes", value: "User-confirmed only" },
      { label: "Canonical data", value: "On-device" },
    ],
    avoidedPatterns: [
      "Treating listening history, a photo cluster, or a ticket receipt as proof of attendance.",
      "Retaining Gmail message bodies or calendar content after extracting candidate fields.",
      "Making a hosted database the canonical source for a private concert diary.",
    ],
    nextIterations: [
      "Complete Google restricted-scope verification before broad Gmail recovery access.",
      "Ship the updated native targets after same-build physical-device verification.",
      "Expand the versioned archive into a plain, durable export and restore workflow.",
    ],
    learnings: [
      "Import is a trust problem before it is a parsing problem; provenance and confirmation belong in the data model.",
      "Local-first does not mean banning the network. It means connected services can enrich the product without owning its canonical record.",
      "Native extensions fail in platform-specific ways, so simulator compilation is not enough; the share handoff itself needs end-to-end exercise.",
    ],
    nextProject: { slug: "chlita", title: "Ch'lita" },
  },
  whakapapa: {
    slug: "whakapapa",
    title: "Whakapapa",
    subtitle: "Family history software built around source material",
    heroImage: "/projectImages/whakapapa-cover-2.webp",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["Next.js 16", "Supabase", "Claude API", "Tesseract.js", "React Flow", "dagre", "Framer Motion"],
    liveUrl: "https://whakapapa.vercel.app",
    overview:
      "A family history app that turns documents, photos, and recorded stories into structured family records and a navigable tree.",
    challenge:
      "Most genealogy tools are expensive, rigid, and centered on manual data entry. The goal here was to make source capture and review easier without asking users to trust raw AI output.",
    constraints: [
      "Trust is fragile with family history data, so AI output must stay reviewable and reversible.",
      "Many source artifacts are low quality scans and handwritten notes.",
      "The product needed to be viable for a solo builder and affordable for families.",
    ],
    decisionLog: [
      {
        problem: "AI extraction can hallucinate relationships.",
        decision: "Added a suggestion queue with explicit human approval before writing to the tree.",
        tradeoff: "Slightly slower ingestion versus fully automatic sync.",
        impact: "Higher confidence in accepted data and fewer correction loops.",
      },
      {
        problem: "Genealogy tools often bury stories under forms.",
        decision: "Made voice capture and story context first-class alongside people and dates.",
        tradeoff: "More schema complexity and moderation edge cases.",
        impact: "Richer family context and stronger emotional retention.",
      },
    ],
    approach: [
      {
        title: "AI Extraction Pipeline",
        description:
          "Users scan or upload documents, OCR extracts text, and an LLM returns candidate people, dates, places, and relationships for review before anything is written to the tree.",
      },
      {
        title: "Voice-First Story Capture",
        description:
          "The app includes voice recording and transcription so spoken stories can sit alongside documents and photos.",
      },
      {
        title: "Living Tree, Not Dead Database",
        description:
          "React Flow and dagre power the tree view, but the product is broader than a chart. Stories, documents, and media stay attached to the people they relate to.",
      },
      {
        title: "Private by Default",
        description:
          "Family records are protected with Supabase row-level security, and AI suggestions require explicit review before they can change the tree.",
      },
    ],
    outcome:
      "A working genealogy product with document ingestion, review flows, voice capture, and a collaborative tree view.",
    proofPoints: [
      { label: "Review gate", value: "Human approval" },
      { label: "Source capture", value: "Documents + voice" },
      { label: "Data model", value: "Private family records" },
    ],
    avoidedPatterns: [
      "Auto-trusting AI inserts directly into canonical records.",
      "Forcing users into rigid, spreadsheet-like genealogy workflows.",
      "Locking export/import behind paid plans.",
    ],
    nextIterations: [
      "Confidence scoring and source-level reliability badges per extracted entity.",
      "Guided interview flows optimized for elder story capture sessions.",
    ],
    learnings: [
      "AI extraction needs a human review layer to be usable for family records.",
      "Voice capture changes the value of the product because it preserves more than text alone.",
      "Source material and context matter as much as entity extraction.",
      "Supabase and Next.js made the solo build manageable without a separate backend service.",
    ],
    nextProject: { slug: "vape-quit-coach", title: "Vape Quit Coach" },
  },
  liner: {
    slug: "liner",
    title: "Liner",
    subtitle: "See the songs. Shape the release.",
    heroImage: "/projectImages/liner-release-demo-editor.jpg",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    team: "Solo",
    tools: [
      "Next.js",
      "TypeScript",
      "Custom HTML canvas",
      "Web Audio API",
      "Zustand",
      "Convex",
      "Clerk",
    ],
    liveUrl: "https://liner.ninetynine.digital",
    overview:
      "Liner is a visual workspace for organizing songs and planning releases. I designed and built it around the work between making music and putting it out: collecting demos, keeping references and feedback nearby, trying track orders, and deciding what belongs to the record. This case study covers the web app. The pictured release board is a public demo; its notes and alternate tracks are illustrative.",
    challenge:
      "A record takes shape across audio files, playlists, lyric scraps, references, and conversations. A folder keeps the files together, but does not show how the songs relate or which decisions are still open. Liner gives that material a shared visual space, with listening and editing close at hand.",
    constraints: [
      "Canvas selection, pan, zoom, text editing, and playback share the same workspace and need clear interaction boundaries.",
      "Local work needs its own save status; a successful metadata write must not hide a failed canvas write.",
      "Cloud sync is optional. Lossless masters stay local; eligible compressed audio can upload when cloud sync is used.",
    ],
    decisionLog: [
      {
        problem: "Songs and notes were scattered across storage and separate planning tools.",
        decision: "Keep songs, notes, references, and grouping frames on one canvas, backed by a custom HTML engine.",
        tradeoff: "Direct spatial editing requires explicit selection, drag, resize, history, and persistence behavior.",
        impact: "Arrangement and annotations can be viewed together without moving to a separate planning document.",
      },
      {
        problem: "Listening and editing have competing keyboard and selection needs.",
        decision: "Pair interactive song cards with waveform playback, a queue, and keyboard controls while retaining clear editing boundaries.",
        tradeoff: "Playback state and text input need coordination across the canvas and song panel.",
        impact: "The track order can be considered alongside notes and references while the music is playable.",
      },
      {
        problem: "A workspace can appear saved even when one browser-storage destination fails.",
        decision: "Track metadata and canvas save states independently, flush pending canvas saves when the page is hidden, and expose an export-backup action when local saving fails.",
        tradeoff: "Browser storage still has limits; an export recovery path is needed rather than a promise of permanent storage.",
        impact: "The interface can tell the person when current edits are not saved.",
      },
    ],
    approach: [
      { title: "Bring the project into view", description: "Import audio or paste references, arrange songs into frames, and keep the note that explains a decision beside the material. The custom HTML canvas supports pan, zoom, selection, and direct editing." },
      { title: "Hear the sequence while you work", description: "Song cards connect waveform extraction and playback with the working board. A playback queue and timeline view support trying an order without reducing the project to a list of filenames." },
      { title: "Keep the work recoverable", description: "Board metadata and canvas layout persist locally; audio is cached in IndexedDB. Saving is reported by destination, with an export path for failures. Optional cloud sync extends that local workflow rather than being required to start." },
    ],
    outcome:
      "A web workspace that brings song arrangement, annotation, sequencing, and playback into one interface, with explicit local-save states and an export recovery path.",
    proofPoints: [
      { label: "Platform", value: "Web app" },
      { label: "Canvas", value: "Custom HTML engine" },
      { label: "Persistence", value: "Local-first" },
    ],
    avoidedPatterns: [
      "Making an account a prerequisite for organizing a local project.",
      "Forcing every musical decision into a single linear playlist.",
      "Hiding failed canvas saves behind a successful metadata write.",
    ],
    nextIterations: [
      "A short walkthrough of a public release board, showing arrangement, annotation, and listening together.",
      "Clearer collaboration and sync states for shared music workspaces.",
    ],
    learnings: [
      "Spatial editing needs explicit boundaries between selection, text input, and playback.",
      "Local-first work needs honest failure states as well as a happy-path save indicator.",
      "The strongest demonstration is a real musical decision, with the songs and context visible.",
    ],
    nextProject: { slug: "whakapapa", title: "Whakapapa" },
  },
  "vape-quit-coach": {
    slug: "vape-quit-coach",
    title: "Vape Quit Coach",
    subtitle: "An iOS app for quitting vaping",
    heroImage: "/projectImages/vqc-cover-2.webp",
    timeline: "2024 — Present",
    role: "Solo Designer & Developer",
    tools: ["React Native", "Expo", "TypeScript"],
    liveUrl: "https://vapequitcoach.com",
    overview:
      "An iOS app for smoking cessation built around tracking, coaching, and support during cravings and setbacks.",
    challenge:
      "Many quitting apps rely on brittle streak systems and punitive framing. The goal here was to build something calmer and more usable during difficult moments.",
    constraints: [
      "Behavior change support had to avoid shame mechanics and relapse punishment loops.",
      "Support screens needed short, readable actions for high-stress, low-attention moments.",
      "Solo development required disciplined scope and clear UX priorities.",
    ],
    decisionLog: [
      {
        problem: "Streak systems create brittle motivation and anxiety.",
        decision: "Shifted progress framing from perfect streaks to identity and trend signals.",
        tradeoff: "Less instantly gamified feedback.",
        impact: "The interface keeps reflection and support reachable after setbacks; engagement effects have not been measured.",
      },
      {
        problem: "Craving moments are noisy and emotionally charged.",
        decision: "Used calm, low-stimulus intervention screens with short actions.",
        tradeoff: "Less visual spectacle during key moments.",
        impact: "Short actions and restrained visual density are the design choice; no clinical efficacy is claimed.",
      },
    ],
    approach: [
      {
        title: "Behavioral Architecture",
        description:
          "The product focuses on triggers, replacement habits, and support patterns rather than only on streak counting.",
      },
      {
        title: "Progress as Identity",
        description:
          "Progress is tracked in a way that still reflects forward movement after setbacks instead of resetting everything to zero.",
      },
      {
        title: "Liminal Design",
        description:
          "Intervention screens are intentionally low-stimulus so they stay usable during cravings and stress.",
      },
    ],
    outcome:
      "The app is available on the iPhone App Store with quit tracking, reflection, breathing, and online AI coaching. These tools provide practical support; they do not establish clinical efficacy or a biological recovery schedule.",
    proofPoints: [
      { label: "Availability", value: "Live on iOS" },
      { label: "Product scope", value: "Solo shipped" },
    ],
    avoidedPatterns: [
      "Punitive streak resets and public shame nudges.",
      "Engagement loops optimized for app opens rather than quit outcomes.",
      "Clinical fear-based copy during relapse-adjacent moments.",
    ],
    nextIterations: [
      "Adaptive intervention timing based on user-identified trigger windows.",
      "Deeper longitudinal insights that preserve privacy and dignity.",
    ],
    learnings: [
      "Health products need a different interaction model than productivity tools.",
      "Low-stimulus support flows matter more than high-energy motivation during cravings.",
      "Solo work makes the product tradeoffs easier to see because no one else is making them for you.",
    ],
    nextProject: { slug: "dayle", title: "Dayle Palfreyman" },
  },
  chlita: {
    slug: "chlita",
    title: "Ch'lita",
    subtitle: "A portfolio for i-D's Fashion Editor-at-Large",
    heroImage: "/projectImages/chlita-1.webp",
    timeline: "2024",
    role: "Designer & Developer",
    tools: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://chlita.com",
    // githubUrl intentionally omitted
    overview:
      "Portfolio for Ch'lita Collins — Fashion Editor-at-Large at i-D, and stylist whose work spans Rosalía, The Dare, Tom Guinness and Oliver Hadlee Pearch. Built around editorial image presentation and simple CMS updates, so the work stays in front.",
    challenge:
      "The site needed to support strong image presentation without adding visual clutter or creating layout instability.",
    constraints: [
      "The styling work needed to lead; the interface could not compete with image rhythm or art direction.",
      "The client needed a CMS workflow that did not require developer support for routine updates.",
      "Image-heavy pages had to stay fast enough that the portfolio still felt editorial, not sluggish.",
    ],
    decisionLog: [
      {
        problem: "Portfolio sites often over-design the frame around the work.",
        decision: "Kept the interface sparse and made image sequencing the primary design material.",
        tradeoff: "Fewer decorative brand moments in the surrounding UI.",
        impact: "The styling work remains the first thing visitors notice.",
      },
      {
        problem: "Manual portfolio updates create a maintenance bottleneck.",
        decision: "Modeled the work in Sanity so image sets and project details can be managed independently.",
        tradeoff: "More setup work up front than hardcoded pages.",
        impact: "The site can evolve with new work without recurring developer involvement.",
      },
    ],
    approach: [
      {
        title: "Subtractive Design",
        description:
          "The interface was kept deliberately spare so the styling work remained the focus.",
      },
      {
        title: "Image-First Architecture",
        description:
          "The image system was tuned for stable layout, responsive cropping, and good performance.",
      },
      {
        title: "CMS for Independence",
        description:
          "Sanity was set up so the client could manage portfolio content without developer involvement.",
      },
    ],
    outcome:
      "A stable, image-led portfolio that the client can update independently.",
    proofPoints: [
      { label: "Delivery", value: "Client shipped" },
      { label: "Content model", value: "CMS managed" },
    ],
    avoidedPatterns: [
      "Decorative transitions that make the portfolio feel slower than the work deserves.",
      "Hardcoded project pages that make every update a developer task.",
      "Over-cropped responsive images that undermine the styling context.",
    ],
    nextIterations: [
      "Richer editorial grouping for campaigns and press features.",
      "A lighter upload review flow for checking crops before publishing.",
    ],
    learnings: [
      "Restraint is harder than addition. Every feature you don't add is a decision.",
      "The best client work happens when you understand their craft, not just their requirements.",
      "Performance is a design choice. A slow portfolio undermines the work it's showing.",
    ],
    nextProject: { slug: "liner", title: "Liner" },
  },
  skillscan: {
    slug: "skillscan",
    title: "SkillScan",
    subtitle: "Inspect the agent tools before they inspect your machine",
    heroImage: "/projectImages/skillscan-cover.webp",
    timeline: "2026 — Present",
    role: "Solo Designer & Developer",
    team: "Independent",
    tools: ["Next.js", "TypeScript", "Node.js", "Static Analysis", "Vercel"],
    liveUrl: "https://skillscan-rouge.vercel.app",
    githubUrl: "https://github.com/maxwellyoung/skillscan",
    overview:
      "SkillScan is an evidence-first static scanner for agent skills, MCP servers, npm packages, VS Code extensions, GitHub Actions, repositories, and pasted code. It gives each finding a severity, source location, snippet, and remediation note, then turns the combined evidence into a plain-language install verdict. The product is deliberately deterministic: its claims can be traced to visible rules and committed fixtures rather than an opaque model judgment.",
    challenge:
      "Agent tooling crosses unusually powerful trust boundaries. A useful skill may ask for shell, filesystem, network, and credential access—the same capabilities a malicious package needs. Simple keyword matching produces noise, while a reassuring score can imply more certainty than static analysis earns. The product had to surface dangerous combinations quickly without turning a first-pass scan into a safety badge.",
    constraints: [
      "Every public claim must be reproducible from code, tests, fixtures, or the returned scan evidence.",
      "The scanner cannot execute untrusted artifacts as part of analysis.",
      "A clear result must still communicate static analysis limits and preserve the manual-review gate.",
      "Submitted source should not become a retained application dataset; sensitive work needs a local path.",
    ],
    decisionLog: [
      {
        problem: "A model-generated verdict would be flexible but difficult to reproduce or audit.",
        decision: "Built a deterministic rule engine whose findings retain category, severity, file, line, snippet, and remediation.",
        tradeoff: "Novel attacks require new rules, and intent cannot be inferred as freely as it could be with a model.",
        impact: "A developer can inspect why a score changed and test the exact behavior locally.",
      },
      {
        problem: "Package and extension metadata alone can look benign while executable artifacts contain the actual risk.",
        decision: "Fetch and unpack supported npm and OpenVSX artifacts, then scan their relevant source and manifest files.",
        tradeoff: "Artifact limits and provider availability can make a scan partial.",
        impact: "Results describe the code being installed, with explicit warnings when evidence is incomplete.",
      },
      {
        problem: "A numeric score can accidentally read as permission to install.",
        decision: "Pair the score with Block install, Manual review, or Looks clear, plus an explicit explanation of what a clear result cannot prove.",
        tradeoff: "The interface is more cautious than scanners that optimize for a simple green badge.",
        impact: "The product keeps the human decision visible at the moment of highest confidence.",
      },
    ],
    approach: [
      {
        title: "Model capabilities, not product labels",
        description:
          "Rules focus on consequential behavior—secret access, outbound requests, shell execution, destructive commands, persistence, filesystem reach, unsafe package hooks, and CI permissions—so the same engine can inspect several artifact types.",
      },
      {
        title: "Preserve evidence through the pipeline",
        description:
          "Repository and registry adapters normalize files into one scanner input. Findings keep their origin and the API reports partial fetches rather than silently treating missing files as clean.",
      },
      {
        title: "Tune both sides of the error",
        description:
          "Thirteen committed malicious fixtures exercise known hostile combinations. A separate 300-file local corpus catches rules that punish ordinary application and documentation code.",
      },
      {
        title: "Make the cautious path the usable path",
        description:
          "The web interface accepts a URL or direct source, returns a quick verdict, and keeps detailed categories expandable. The same scanner is available through the repository and a reusable Codex skill for local-first review.",
      },
    ],
    outcome:
      "SkillScan now runs 29 deterministic checks across direct code, agent skills, repositories, package artifacts, extensions, and CI workflows. Its 13 adversarial tests pass, its public method and privacy boundary are visible in the product, and every result keeps manual review in the loop.",
    proofPoints: [
      { label: "Deterministic checks", value: "29" },
      { label: "Malicious fixtures", value: "13 / 13" },
      { label: "False-positive corpus", value: "300 files" },
    ],
    avoidedPatterns: [
      "Calling a clean static result proof that an artifact is safe.",
      "Hiding evidence behind a single proprietary risk score.",
      "Executing untrusted packages in order to decide whether they are trustworthy.",
      "Sending local source to a model when deterministic analysis can run first.",
    ],
    nextIterations: [
      "Export machine-readable findings for CI and code-review workflows.",
      "Expand the real-incident corpus and measure rule precision over time.",
      "Improve branch, monorepo, minified-code, and dependency-chain coverage.",
    ],
    learnings: [
      "The most useful scanner output is not a score; it is a short path from suspicion to source evidence.",
      "False-positive work is part of the security model because noisy tools teach people to ignore them.",
      "Partial evidence must be a first-class result state, not a footnote.",
      "A product can be decisive about dangerous behavior while staying honest about what it cannot prove.",
    ],
    nextProject: { slug: "default-index", title: "Default Index" },
  },
  "default-index": {
    slug: "default-index",
    title: "Default Index",
    subtitle: "Turn frontend taste arguments into an inspectable benchmark",
    heroImage: "/projectImages/default-index-cover.webp",
    timeline: "2026 — Present",
    role: "Solo Designer & Researcher",
    team: "Independent",
    tools: ["React", "TypeScript", "Vite", "Playwright", "Vitest"],
    liveUrl: "https://default-index.vercel.app",
    overview:
      "Default Index is a technical investigation into recurring design patterns in model-generated frontends and the instructions that may reduce them. It replaces screenshot-level taste claims with a registered protocol, artifact capture, rule-based detectors, uncertainty, and blind review. The current public release is a deterministic calibration corpus: 108 artifacts prove that the measurement system works end to end, but they are not presented as findings about frontier models.",
    challenge:
      "Critiques of generated interfaces often collapse into a familiar but weak claim: everything looks the same. Without fixed briefs, preserved source, comparable render conditions, explicit detectors, and human review, that claim cannot distinguish a model default from a prompt effect, framework convention, or evaluator preference. The investigation needed a way to make design-pattern evidence inspectable before spending compute on provider comparisons.",
    constraints: [
      "Fixture calibration must remain visibly separate from claims about real models or providers.",
      "Every aggregate needs a path back to source, desktop and mobile renders, detector evidence, and review state.",
      "Design-pattern detectors are proxies with uncertainty, not objective measurements of interface quality.",
      "Provider runs and their cost remain gated until the protocol and smoke tests justify them.",
    ],
    decisionLog: [
      {
        problem: "Starting with live model runs would spend compute before the analysis pipeline had been calibrated.",
        decision: "Created deterministic fixture profiles and ran every condition through the complete generation-to-analysis system first.",
        tradeoff: "The first release validates the apparatus rather than answering the headline model question.",
        impact: "Pipeline failures and misleading detectors can be corrected before expensive evidence is collected.",
      },
      {
        problem: "A pattern count without retained artifacts is impossible to challenge.",
        decision: "Keep source, responsive renders, detector evidence, uncertainty, and blind-review state behind every aggregate.",
        tradeoff: "The corpus is heavier and the interface must support drill-down as well as summary.",
        impact: "A reader can move from a chart to the exact artifact that produced it.",
      },
      {
        problem: "One interface could not serve overview, detector debugging, and artifact comparison equally well.",
        decision: "Built three complementary surfaces: Observatory for the release view, Lab for pattern analysis, and Corpus for artifact inspection.",
        tradeoff: "The product has a steeper information architecture than a single dashboard.",
        impact: "Each mode answers a distinct question without discarding the shared evidence model.",
      },
    ],
    approach: [
      {
        title: "Register the comparison",
        description:
          "Six briefs, three fixture profiles, and three instruction conditions define the calibration matrix. Stable identifiers and manifests keep conditions comparable instead of relying on hand-picked screenshots.",
      },
      {
        title: "Capture the full artifact",
        description:
          "Each run retains source plus desktop and mobile renders. Playwright standardizes capture so responsive behavior can be inspected alongside the code that produced it.",
      },
      {
        title: "Detect patterns with uncertainty",
        description:
          "Static and visual detectors record their evidence rather than emitting unexplained labels. Ambiguous cases can enter a blind-review queue instead of being forced into a confident aggregate.",
      },
      {
        title: "Separate calibration from claims",
        description:
          "The product labels the current corpus as synthetic fixture evidence throughout the method and interface. Real provider findings remain a future, separately gated phase.",
      },
    ],
    outcome:
      "The calibration release contains 108 deterministic artifacts across six briefs, three fixture profiles, and three instruction conditions. It demonstrates the complete measurement, rendering, detection, aggregation, and review pipeline while keeping the central frontier-model question explicitly unanswered.",
    proofPoints: [
      { label: "Calibration artifacts", value: "108" },
      { label: "Registered briefs", value: "6" },
      { label: "Evidence surfaces", value: "3" },
    ],
    avoidedPatterns: [
      "Treating synthetic fixtures as evidence about current frontier models.",
      "Publishing pattern percentages without the artifacts and detector evidence behind them.",
      "Using visual taste as if it were a context-free quality metric.",
      "Spending provider compute before validating the protocol and failure modes.",
    ],
    nextIterations: [
      "Run a minimal provider smoke test only after compute and credentials are explicitly approved.",
      "Calibrate detector thresholds against blinded human review.",
      "Publish real-model comparisons as a new evidence layer, not a rewrite of the fixture release.",
    ],
    learnings: [
      "A benchmark is a product: its state labels, drill-down paths, and uncertainty language shape what readers believe.",
      "Calibration can be a meaningful release when it proves the method and refuses the headline claim.",
      "Design-pattern criticism becomes more useful when every disagreement has an artifact to inspect.",
      "Security and design research share a discipline: preserve evidence, expose limits, and keep the human judgment visible.",
    ],
    nextProject: { slug: "skillscan", title: "SkillScan" },
  },
  dayle: {
    slug: "dayle",
    title: "Dayle Palfreyman",
    subtitle: "An artist portfolio with a full-screen gallery",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: [
      "Next.js 15",
      "Sanity CMS",
      "Framer Motion",
      "Tailwind CSS",
      "TypeScript",
    ],
    liveUrl: "https://dayle.vercel.app",
    // githubUrl intentionally omitted
    overview:
      "A portfolio for installation artist Dayle Palfreyman with a full-screen gallery, simple navigation, and Sanity CMS.",
    challenge:
      "The site needed to present artwork clearly without introducing too much interface noise, while still being manageable by the client.",
    constraints: [
      "Visual restraint was non-negotiable: the site could not compete with artworks.",
      "Client autonomy required robust CMS patterns over one-off hardcoded pages.",
      "Accessibility and performance had to hold on media-heavy routes.",
    ],
    decisionLog: [
      {
        problem: "Portfolio templates encourage UI chrome over artwork presence.",
        decision: "Adopted full-screen, vertically snapping gallery with minimal persistent chrome.",
        tradeoff: "Less conventional page structure for some users.",
        impact: "Stronger immersion and clearer artwork-first hierarchy.",
      },
      {
        problem: "Rich motion can quickly become distracting in art contexts.",
        decision: "Constrained motion vocabulary to subtle spring-driven transitions.",
        tradeoff: "Lower novelty and fewer visual flourishes.",
        impact: "Consistent tone with reduced cognitive interference.",
      },
    ],
    approach: [
      {
        title: "Full-Screen Immersive Gallery",
        description:
          "The homepage uses a vertically snapping gallery where each artwork fills the viewport and opens into a detail view with supporting media and metadata.",
      },
      {
        title: "Motion with Restraint",
        description:
          "Motion is limited to a small set of transitions between gallery and detail views, with reduced-motion support included from the start.",
      },
      {
        title: "Accessibility as Foundation",
        description:
          "The site includes keyboard navigation, focus management, accessible artwork metadata, and screen-reader support across the gallery flow.",
      },
      {
        title: "CMS-Driven Independence",
        description:
          "Sanity handles artworks, exhibitions, writing, and site settings so the client can manage the site without code changes.",
      },
    ],
    outcome:
      "A media-heavy portfolio that performs well, stays usable, and is fully managed by the client through Sanity.",
    proofPoints: [
      { label: "Delivery", value: "Client shipped" },
      { label: "Content model", value: "Sanity CMS" },
      { label: "Access", value: "Keyboard + screen reader" },
    ],
    avoidedPatterns: [
      "Autoplay-heavy transitions that distract from images.",
      "CMS models that require developer intervention for routine updates.",
      "Accessibility retrofits after visual design lock-in.",
    ],
    nextIterations: [
      "Collection-level storytelling templates for exhibition narratives.",
      "Media compression pipeline tuning for even faster cold loads.",
    ],
    learnings: [
      "Art portfolios are mostly an exercise in restraint.",
      "Motion needs to support navigation, not compete with the work on screen.",
      "Accessibility decisions shape the structure of the product early, not late.",
      "Automated SEO and CMS setup reduce long-term maintenance for the client.",
    ],
    nextProject: { slug: "afterlight", title: "Afterlight" },
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}
