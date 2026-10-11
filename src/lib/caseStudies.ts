// Case study data - shared between metadata and page component

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  timeline: string;
  role: string;
  team?: string;
  credits?: { text: string; links: { label: string; href: string }[] };
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
  "second-brain": {
    slug: "second-brain",
    title: "Second Brain",
    subtitle: "Keep the source close to the study session",
    heroImage: "/projectImages/second-brain-sources.png",
    timeline: "Personal tool · ongoing",
    role: "Designer & Developer",
    tools: ["TypeScript", "React", "Vite", "Local storage"],
    overview: "I built Second Brain for my own studying. It's a private workspace where the source documents, a plan for today and a few minutes of practice sit side by side, and everything I've learned can be exported and restored. The screenshots use authored sample notes and a fictional course, not real course material or student records.",
    challenge: "A note app is good at holding things and bad at helping me use them. What I wanted was a short path from \"what needs my attention today\" to the source that explains it, then straight into practice, without losing my place between those steps.",
    approach: [
      { title: "Read with the source in view", description: "The library opens source text inside the workspace. Reading and practice keep their source identity, so an explanation can be checked against the material behind it.", image: "/projectImages/second-brain-sources.png" },
      { title: "Plan around the next deadline", description: "The local build brings upcoming work and review needs into a daily view. Practice scheduling considers prior attempts and future assessment dates; it does not treat practice as a completed assessment.", image: "/projectImages/second-brain-today.png" },
      { title: "Keep learning history portable", description: "Practice attempts use a validated learning ledger. Imports merge records rather than blindly replacing the current history, and export provides a backup outside browser storage." },
    ],
    outcome: "A personal study workspace I can keep refining around my own use. The source reader and learning ledger have direct implementation and test evidence. The newer adaptive work is local development, and the answer-generation audit is unfinished; this case study does not claim a released tutoring service or verified learning outcomes.",
    proofPoints: [{ label: "Delivery", value: "Private personal tool" }, { label: "Screenshot data", value: "Authored synthetic fixtures" }],
    learnings: ["Reading and practice work better when the original source remains easy to open.", "A completed practice attempt and a completed assessment need separate records.", "A browser-stored history needs validation and a portable backup."],
    nextProject: { slug: "margin", title: "Margin" },
  },
  "margin": {
    slug: "margin",
    title: "Margin",
    subtitle: "Catch it without breaking flow, then hand agents the evidence",
    heroImage: "/projectImages/margin-meeting.png",
    timeline: "Personal tool · October 2026 · ongoing",
    role: "Designer & Developer",
    tools: ["Swift", "SwiftUI", "AppKit", "Python", "whisper.cpp", "MCP"],
    overview: "I spend most of my day working with coding agents now, and the thing they need most is context: what I was thinking, what we decided, what someone smart said in a video last week. I loved how Raycast's floating notes sit one hotkey away, so I built a smarter version of that for myself. One shortcut opens a small panel over whatever I'm doing; I type the thought, a bug or a YouTube link, and keep going. It lands in an Inbox, Margin offers a home when it's confident, meetings are transcribed on my Mac, and my agents can search and quote all of it through a read-only interface. The screenshots show the real app running as a separate demo instance with a fictional library.",
    challenge: "Agentic work is mostly context switching. The useful thought arrives mid-sentence: an idea during a demo, a bug while testing, a decision on a call, a line in a Theo or Matt Pocock video that changes how I'd build something. If capturing it means picking a folder, writing a title or switching apps, I lose the thought or the flow. And when an agent picks the work up later, it needs the original words, not my paraphrase of them. So it had to feel native and instant, which meant Swift, and a lot of care over how the panel opens; much of that came from studying Emil Kowalski's work on motion.",
    constraints: [
      "Capture must work with no network, no model and no setup decisions.",
      "Private notes and recordings stay on the Mac unless I explicitly send them.",
      "Agents may read; saving, moving, deleting and handing off stay human actions.",
    ],
    decisionLog: [
      { problem: "Choosing a destination before saving slows capture down.", decision: "Inbox is a real destination. A matching project is offered as a suggestion that waits for ⌘P; an explicit #project tag files directly.", tradeoff: "Sorting becomes a separate step, so the Inbox has to stay cheap to empty." },
      { problem: "A sorter that guesses wrong is worse than no sorter.", decision: "Margin learns what each project holds and suggests one only when a capture is clearly closer to it than to the runner-up. I measured it by hiding each filed source and checking where it would go: on my library 95% of its suggestions were right, and it stayed quiet the rest of the time.", tradeoff: "It offers a home about three times in four, not every time. Nothing is filed without a key." },
      { problem: "AI summaries of a project read well but can't be checked.", decision: "Insights are patterns found in saved text, not generated prose: topics more sources mention lately than before, open questions and decisions from my own notes and meetings, and what agents read most. Each shows the exact sentence and links to where it was said.", tradeoff: "Less fluent than a summary, and quiet when there isn't enough dated material." },
      { problem: "A transcript that says \"System audio\" hides who committed to what.", decision: "Because my microphone is its own track, only the call side needs splitting. Margin separates it into Speaker 1, 2… on the Mac and lets me name them per meeting. Remembering a voice for later calls is opt-in and stays local, because a voice signature is biometric data.", tradeoff: "It's an optional install and still experimental. On two recorded real meetings it attributed 80–88% of speech correctly on one and about 60% on the other, so names are easy to correct and never filled in silently." },
      { problem: "\"Ask again Wednesday\" written in a note does nothing on Wednesday.", decision: "A day a note mentions becomes its follow-up, and the Inbox brings it back that day with the words I wrote. Plain rules, not a model, and ordinary words like \"sat\" or \"may\" are deliberately ignored.", tradeoff: "It only understands dates written fairly plainly." },
      { problem: "Creators make confident predictions and nobody checks them later.", decision: "A ledger collects forecasts from saved videos with the quote, a timestamped link and the date it was said. I keep or dismiss each one, and only my verdicts count toward the record.", tradeoff: "It needs my review; nothing is scored automatically, and drafted verdicts stay labelled as drafts." },
      { problem: "Most flagged passages aren't predictions, and the review queue was long.", decision: "I measured two filters before shipping either. Phrase rules were no better than chance, and the on-device model kept only 58% of real predictions while refusing a quarter of excerpts as sensitive. So instead of filtering, review got fast: keyboard keep or skip, auto-advance, and skipping a whole video at once.", tradeoff: "Every candidate still passes my eyes, a few seconds each." },
      { problem: "Notes typed during a meeting lose their link to what was being said.", decision: "A note saved while recording keeps the recording and the second it was written. The meeting lists those notes at their time, and each note links back.", tradeoff: "The anchor is fixed at save time; editing a note never moves it." },
      { problem: "Agents need context but should not be able to change it.", decision: "A read-only MCP server and a JSON CLI share one lookup path, with exact text, hashes and explicit coverage limits.", tradeoff: "Agents can quote and cite, but every write still goes through me." },
      { problem: "An agent-facing command that defaults to recording is a trap.", decision: "The canonical command never opens the microphone without an explicit verb; only the legacy alias used by a hotkey keeps its old toggle.", tradeoff: "Two command names behave slightly differently, which is documented." },
    ],
    approach: [
      { title: "One shortcut, one field", description: "⌃⌥Space opens a nonactivating panel over whatever I am doing. Type or paste, press ⌘Return, keep going. A save can be undone for a few seconds, and drafts survive hiding the panel or restarting.", image: "/projectImages/margin-capture.png" },
      { title: "Meetings with notes in the margin", description: "Microphone and call audio are recorded on separate tracks and transcribed on the Mac with whisper.cpp, so \"Me\" is always exact. An optional, still experimental on-device step tries to tell the voices on the call apart, and a click names them. Notes written during the call are anchored to that moment.", image: "/projectImages/margin-meeting.png" },
      { title: "Context agents can cite", description: "Projects, notes, meetings, documents and saved video transcripts are available to agents through a read-only MCP server and CLI. Results include exact source text, SHA-256 hashes, dates and what was left out, so an answer can be checked against its source." },
      { title: "Sorting that knows when to stay quiet", description: "Quick Capture offers \"Suggest Lumen ⌘P\" as you type, and the Inbox lists confident homes separately from the items that need a decision. Swift scores the same model the Python side trains and measures, and a test checks they agree.", image: "/projectImages/margin-inbox.png" },
      { title: "What keeps coming up", description: "Selecting a project shows what is rising across its sources in the last 30 days, by when it was said, with the creators and the quote. Open questions and decisions come from my own notes and meetings. On my own library it currently shows orchestrator agents, software factories and guard rails rising across several creators.", image: "/projectImages/margin-insights.png" },
      { title: "Who called it", description: "Forecasts from saved videos (\"by 2027\", \"X is dead\", \"I'd bet\") are found automatically and wait for review. Kept ones get a plain-language claim and, later, my verdict. Agents can read the ledger too, and are told when a verdict is only a draft.", image: "/projectImages/margin-predictions.png" },
      { title: "Trust before features", description: "Backups are verified with checksums, restores go into a new folder with outgoing actions paused, Trash is reversible, and a separate demo instance keeps testing and screenshots away from the personal library." },
    ],
    outcome: "A tool I use on my own Mac, with about 1,500 saved sources so far and 438 possible predictions found in them, waiting for review. Capture, library, backup, sorting, insights, follow-ups, speaker naming and agent access have automated coverage (289 tests, native UI checks, a Swift/Python parity check and a generated three-voice call run through real transcription), and builds are notarized. Real-call transcription accuracy, wider hardware coverage and a public release are still open; this case study does not claim a distributed product.",
    proofPoints: [{ label: "Delivery", value: "Private personal tool" }, { label: "Agent access", value: "Read-only MCP server and CLI" }, { label: "Suggested homes", value: "95% right when offered (leave-one-out)" }, { label: "Screenshot data", value: "Separate demo instance, fictional library" }],
    avoidedPatterns: ["Asking for a folder or title before saving", "Background screen or clipboard collection", "Agents that can quietly create tasks or edit sources", "Generated summaries presented as findings", "Filing things automatically on a guess"],
    nextIterations: ["Measure speaker separation on real multi-person calls", "Bring predictions back when their date arrives, so they actually get scored", "A small beta for other Macs"],
    learnings: ["Fast capture is mostly about what you don't ask the user to decide.", "An agent interface needs a safe default more than it needs more commands.", "A note's moment in a meeting is context worth keeping.", "Measure a suggestion before you show it. A confident wrong guess costs more trust than silence."],
    nextProject: { slug: "autobahn-extensions", title: "Autobahn extensions" },
  },
  "autobahn-extensions": {
    slug: "autobahn-extensions",
    title: "Autobahn extensions",
    subtitle: "A markdown board that runs agents across my machines, and tells me the one thing that needs me",
    heroImage: "/projectImages/autobahn-board.png",
    timeline: "Private extensions · October 2026 · ongoing",
    role: "Extensions & workflow design",
    credits: { text: "Original Autobahn by Eli Rousso / Rams · MIT licensed", links: [{ label: "Eli Rousso", href: "https://elirousso.com" }, { label: "Original Autobahn", href: "https://github.com/rams-design/autobahn" }] },
    tools: ["JavaScript", "Node.js", "Python", "Markdown", "T3 Code", "MCP"],
    overview: "Autobahn is Eli Rousso's (Rams) MIT-licensed board that keeps work as plain markdown cards, and I've built my agent workflow on top of it. My private extensions turn it into a control room: a card becomes a bounded agent run on whichever of my machines has room, every run comes back with its own evidence, and the home screen opens on the one thing that actually needs me. The images use the real local UI with a synthetic board and a simulated fleet; no real runs, workers or client systems are shown.",
    challenge: "Once I had several agents running at once across more than one machine, starting work stopped being the hard part. Knowing what was really happening was: which run is working, which is stuck, which is waiting on me, whether there's budget left, and whether a finished run actually proved anything. A busy board can look like progress when nothing has happened.",
    constraints: [
      "The board stays a readable markdown file I can edit by hand.",
      "Nothing is pushed, merged or written to an issue tracker without a second, explicit confirmation.",
      "Planned, running, reviewed and shipped are different states and must look different.",
      "A missing reading is shown as missing, never filled in.",
    ],
    decisionLog: [
      { problem: "Dashboards full of status still left me asking what to do next.", decision: "Home opens with one sentence and one next step. Home, Review and the phone view share the same advice, so they never disagree.", tradeoff: "Detail moves one click down; the default view is deliberately sparse." },
      { problem: "Agent runs failed for boring reasons: half-installed dependencies, the wrong Node version, a full disk.", decision: "An admission check runs before every start, gives each run the toolchain its checkout pins, and says in plain words why a run is held or stopped.", tradeoff: "Some runs wait that might have worked; a clear reason beats a mysterious failure." },
      { problem: "Usage limits ran out mid-run, often just before a reset.", decision: "Budget pacing uses the recent average and says when a runout would land relative to the reset, so the queue slows down before it hits the wall.", tradeoff: "Pacing is an estimate and is labelled as one." },
      { problem: "A finished run is not the same as finished work.", decision: "Each run records completion proof (checks, diff and, for UI changes, a read-only browser check) that can be replayed during review. Claims are judged by the card's own updates, not an external timestamp.", tradeoff: "Review takes a little longer, but approval rests on evidence." },
    ],
    approach: [
      { title: "One board, plain text", description: "Cards stay Autobahn's markdown blocks across Inbox, Now, Next and Later. Now is capped, blocked work says what it is waiting on, and shipped cards move to an archive verbatim.", image: "/projectImages/autobahn-board.png" },
      { title: "A small fleet of machines", description: "Runs are dispatched to coding-agent threads on my MacBook, a Mac mini and a ThinkPad. Each machine reports what is running, queued or held, and an offline machine is shown as offline rather than idle." },
      { title: "Evidence before approval", description: "Review brings together each run's stages, checks, diff and completion proof. Missing or stale evidence stays visible, and context passed in from Margin keeps its source and model provenance.", image: "/projectImages/autobahn-review.png" },
      { title: "Guardrails that run themselves", description: "Hourly off-machine snapshots of unpushed work, a weekly friction review that turns repeated annoyances into fixes, and reusable sweep recipes for maintenance across a codebase." },
    ],
    outcome: "A private extension of an existing open-source tool that now coordinates agent work across up to three machines and is in daily use. The web UI has 460 passing tests, with a separate Python runtime suite. The screenshots are a synthetic board and simulated fleet, not real model executions or shipped client work.",
    proofPoints: [{ label: "Foundation", value: "Autobahn by Eli Rousso / Rams · MIT" }, { label: "My contribution", value: "Dispatch, review, pacing and safety extensions" }, { label: "Screenshot data", value: "Synthetic board, simulated machines" }],
    avoidedPatterns: ["Agents pushing or posting without a second confirmation", "A green check standing in for proof of the actual change", "Dashboards that list everything and recommend nothing"],
    nextIterations: ["Sharper replay of completion proof inside Review", "Pacing that learns per model rather than per provider"],
    learnings: ["The planned state of a ticket should not stand in for execution evidence.", "Most agent failures are environment problems; say why a run stopped in plain words.", "A home screen earns trust by recommending one thing, not by showing everything."],
    nextProject: { slug: "liner", title: "Liner" },
  },
  afterlight: {
    slug: "afterlight",
    title: "Afterlight",
    subtitle: "Recover a concert history without surrendering it",
    heroImage: "/projectImages/afterlight-cover-2.webp",
    timeline: "2025 — Present",
    role: "Solo Designer & Developer",
    tools: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    liveUrl: "https://afterlight.ninetynine.digital",
    overview: "Afterlight is my concert diary, available on the iPhone App Store. This case study is about the Recovery Desk I'm building on top of it, not the published build, which doesn't include these native integrations yet. It reads ticket files, shares, calendars, photos, Gmail receipts, Setlist.fm attendance and listening history on the device and turns them into clues to review. A clue never becomes a night you were at until you confirm it.",
    challenge: "Concert memories end up scattered across camera rolls, ticket receipts, calendar events, Wallet passes, files, setlists and half-remembered nights, and those sources deserve very different trust: a Spotify play is a hint, while a ticket plus a dated photo at the venue is strong evidence. So the real problem wasn't importing data. It was reconciling messy evidence without letting software invent that someone was there.",
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
    overview: "I'm building Whakapapa as a family history app that starts from the source material families actually have, the documents, photos and recorded stories, and turns it into structured records and a tree you can explore.",
    challenge: "Most genealogy tools are expensive, rigid and built around typing everything in by hand. I wanted capturing and reviewing sources to be the easy part, without ever asking anyone to trust raw AI output about their family.",
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
    overview: "Liner is a visual workspace for the part of making music nobody designs for: the stretch between finishing songs and putting them out. I built it around how a record actually comes together, collecting demos, keeping references and feedback nearby, trying track orders and deciding what belongs on it. This case study covers the web app; the release board pictured is a public demo, and its notes and alternate tracks are illustrative.",
    challenge: "A record takes shape across audio files, playlists, lyric scraps, references and conversations. A folder keeps the files together but can't show how the songs relate or which decisions are still open. I wanted one shared visual space for all of it, with listening and editing close at hand.",
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
    overview: "Vape Quit Coach is an iOS app I designed and built to help people quit vaping, built around tracking, coaching and support for the moments that matter most: cravings and setbacks.",
    challenge: "A lot of quitting apps lean on brittle streaks and punishing framing, which feels worst exactly when someone slips. I wanted something calmer that's still easy to use in a hard moment.",
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
      "Working solo meant carrying the product from interaction design through implementation.",
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
    team: "Solo",
    tools: ["Next.js", "Sanity CMS", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://chlita.com",
    // githubUrl intentionally omitted
    overview: "I designed and built the portfolio for Ch'lita Collins, Fashion Editor-at-Large at i-D and a stylist whose work spans Rosalía, The Dare, Tom Guinness and Oliver Hadlee Pearch. Everything about it is in service of keeping her work in front: editorial image presentation, and a simple CMS so she can update it herself.",
    challenge: "Her images needed to be shown with real presence, without visual clutter and without layouts jumping around while they load.",
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
    liveUrl: "https://skillscan.ninetynine.digital",
    githubUrl: "https://github.com/maxwellyoung/skillscan",
    overview: "SkillScan answers the question every agent tool should raise before you install it: what can this actually do on my machine? It's a static scanner I designed and built for agent skills, MCP servers, npm packages, VS Code extensions, repositories and pasted code. One TypeScript engine powers a public web app, a published npm CLI and a GitHub Action, and every finding comes with a severity, its location in the source, a snippet and a fix. JSON and SARIF exports let the same evidence travel into CI and code review.",
    challenge: "Agent tools sit across unusually powerful trust boundaries. A genuinely useful skill might ask for shell, filesystem, network and credential access, which is exactly what a malicious package wants too. Keyword matching drowns you in noise, and a reassuring score claims more certainty than static analysis can earn. It had to surface the dangerous combinations fast, without turning a first-pass scan into a safety badge.",
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
        decision: "Validate each fetch destination and redirect, bound downloads and decompression, and prioritize manifests and executable entrypoints before file caps. Inspect text by content rather than extension.",
        tradeoff: "Artifact limits and provider availability can make a scan partial.",
        impact: "Archive padding, disguised scripts, unsafe redirects, and decompression limits have regression coverage. Missing evidence forces review instead of a clean result.",
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
          "The release passes 54 regression tests and blocks all 13 committed malicious fixtures. Benign controls check ordinary runtime names, lockfiles, and documentation; these are regression results, not a real-world detection rate.",
      },
      {
        title: "Make the cautious path the usable path",
        description:
          "The web interface accepts a URL or pasted source. The published npm CLI scans local files without uploading them, and the GitHub Action shares its exit codes and reports. Explicit exclusions are disclosed; incomplete scans exit with a distinct status even when no finding threshold is selected.",
      },
    ],
    outcome:
      "SkillScan is live at skillscan.ninetynine.digital, with @maxwellyoung/skillscan 0.1.0 published to npm and a GitHub Action tested against the public package. Hosted CI passes the 54-test regression suite, CLI packaging checks, and web build. The same 29 checks power each entry point, and a partial scan cannot produce a clean verdict. Static rules still miss unfamiliar patterns and do not certify an artifact as safe.",
    proofPoints: [
      { label: "Deterministic checks", value: "29" },
      { label: "Malicious fixtures", value: "13 / 13" },
      { label: "Regression tests", value: "54 / 54" },
    ],
    avoidedPatterns: [
      "Calling a clean static result proof that an artifact is safe.",
      "Hiding evidence behind a single proprietary risk score.",
      "Executing untrusted packages in order to decide whether they are trustworthy.",
      "Sending local source to a model when deterministic analysis can run first.",
    ],
    nextIterations: [
      "Expand the real-incident corpus and measure precision beyond synthetic fixtures.",
      "Improve minified-code and transitive-dependency coverage.",
      "Evaluate shared rate limits for larger public deployments.",
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
    overview: "Default Index tests a claim that's everywhere right now: that AI-generated frontends all look the same. It's a technical investigation into recurring design patterns in model-generated interfaces, and into the instructions that might reduce them, built on a registered protocol, captured artifacts, rule-based detectors, stated uncertainty and blind review. The current public release is a deterministic calibration corpus: 108 artifacts that prove the measurement works end to end, deliberately not presented as findings about frontier models.",
    challenge: "\"Everything looks the same\" is easy to say and hard to prove. Without fixed briefs, preserved source, comparable rendering, explicit detectors and human review, you can't tell a model's default from the prompt, a framework convention or the reviewer's own taste. I needed design-pattern evidence people could inspect before spending money on comparing providers.",
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
    overview: "I designed and built the portfolio for installation artist Dayle Palfreyman: a full-screen gallery, simple navigation, and Sanity CMS so the site stays easy for her to run.",
    challenge: "The work needed to be shown clearly with as little interface in the way as possible, while staying simple enough for Dayle to manage herself.",
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
