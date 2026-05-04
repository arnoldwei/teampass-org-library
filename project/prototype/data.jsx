// Seed data for the prototype.
// Org content lives at the org level. The coach's personal library is
// derived from (a) their own uploads + (b) any org items they've added.

const ORG = { name: "Boca", team: "Volley" };

// ---------------------------------------------------------------------------
// Coach's own uploads (always editable, never read-only).
// ---------------------------------------------------------------------------
const COACH_OWN_ITEMS = [
  {
    id: "own-1",
    kind: "video",
    name: "Dodge and throw drill — advanced",
    meta: "Video · Unpublished · Added Apr 28, 2026",
    published: false,
    addedAt: "Apr 28, 2026",
  },
  {
    id: "own-2",
    kind: "video",
    name: "aw teampass add admin test 5309",
    meta: "Video · Unpublished · Added Apr 27, 2026",
    published: false,
    addedAt: "Apr 27, 2026",
  },
  {
    id: "own-3",
    kind: "doc",
    name: "athes_teampass_ux_report_v2.docx",
    meta: "Document · Unpublished · Added Apr 26, 2026",
    published: false,
    addedAt: "Apr 26, 2026",
  },
  {
    id: "own-4",
    kind: "doc",
    name: "teampass-clubhouse-prd.docx",
    meta: "Document · Published · Added Apr 22, 2026",
    published: true,
    addedAt: "Apr 22, 2026",
  },
];

// ---------------------------------------------------------------------------
// Document body content. Used by the long-doc preview reader.
// Each doc has structured blocks: heading | h2 | h3 | p | list | quote | divider.
// ---------------------------------------------------------------------------
const DOC_BODIES = {
  "org-3": {
    pageCount: 8,
    wordCount: 3120,
    fileType: "PDF",
    fileSize: "1.4 MB",
    blocks: [
      { type: "heading", text: "Boca Defensive Scheme — 2025 Season" },
      { type: "p", text: "This document is the canonical reference for our defensive scheme this season. All teams within Boca should align to these principles, with team-specific variations documented as addenda." },
      { type: "p", text: "The scheme balances pressure and recovery. We want to force the offense into predictable areas of the floor, then collapse with weak-side help. Coaches should review this in pre-season and revisit at mid-season checkpoints." },
      { type: "h2", text: "1. Core Principles" },
      { type: "p", text: "Our scheme rests on four non-negotiable principles. Every adjustment must remain consistent with these. If a situational call seems to violate one, default to the principle." },
      { type: "list", items: [
        "Ball pressure: every on-ball defender contests the catch and the first move.",
        "One pass away: deny strong-side, force the catch backwards or to the perimeter.",
        "Two passes away: gap help in line with the ball and the rim.",
        "Weak-side: rotate to the rim first, then the next available shooter.",
      ] },
      { type: "h2", text: "2. Stance and Footwork" },
      { type: "p", text: "Defenders maintain a low athletic stance with feet wider than shoulders. Weight stays on the balls of the feet. The first step is always a directional push step — never a cross step on the initial reaction." },
      { type: "h3", text: "2.1 Closeouts" },
      { type: "p", text: "Closeouts are short and choppy in the last two strides, with hands high and active. Defenders should arrive with weight back, ready to push off in the direction the ball-handler chooses." },
      { type: "h3", text: "2.2 Recovery" },
      { type: "p", text: "On a beat, the on-ball defender opens to the help side, sprints to the level of the ball, and re-contests. We do not chase from behind unless the help-side defender has already cut off the drive." },
      { type: "h2", text: "3. Pick-and-Roll Coverage" },
      { type: "p", text: "Our base coverage is drop, with a hard hedge as the secondary call against teams with a primary scoring guard. The defender on the screener is responsible for the call, and the on-ball defender must hear it." },
      { type: "list", items: [
        "Drop: big sits at the level of the screen, guard fights over.",
        "Hedge: big steps out aggressively to the level of the ball, recovers on the second action.",
        "Switch: only on like-sized matchups or in late-clock situations.",
      ] },
      { type: "quote", text: "If you don't communicate the coverage, you don't have a coverage. Talk early, talk loud." },
      { type: "h2", text: "4. Transition Defense" },
      { type: "p", text: "On a missed shot or turnover, the first three players sprint to the paint with eyes on the ball. The fourth player sprints to the strong-side wing. The fifth player is the safety, last to cross half-court." },
      { type: "h3", text: "4.1 Match-up Rules" },
      { type: "p", text: "We match up by floor position, not by jersey. The first defender back picks up the ball. The second defender picks up the most dangerous threat. After the ball is contained, we sort matchups." },
      { type: "h2", text: "5. Adjustments" },
      { type: "p", text: "Mid-game adjustments are made at quarter breaks unless the score gap demands earlier intervention. Coaches should signal adjustments using the season call sheet, not improvised hand signals." },
    ],
  },
  "org-5": {
    pageCount: 6,
    wordCount: 1980,
    fileType: "PDF",
    fileSize: "920 KB",
    blocks: [
      { type: "heading", text: "Pre-Season Conditioning Plan" },
      { type: "p", text: "A six-week conditioning ramp leading into the competitive season. Designed to build aerobic base, then layer in anaerobic capacity, then sport-specific intensity." },
      { type: "h2", text: "Week 1–2: Aerobic Base" },
      { type: "p", text: "Three sessions per week. Steady-state runs at 65–75% of max heart rate, 30–40 minutes. Focus on consistent breathing and cadence. No interval work yet." },
      { type: "list", items: [
        "Monday: 30 min steady run + mobility cooldown",
        "Wednesday: 35 min steady run + core circuit",
        "Friday: 40 min steady run + stretching",
      ] },
      { type: "h2", text: "Week 3–4: Tempo and Threshold" },
      { type: "p", text: "Introduce tempo work to raise the lactate threshold. Sessions become four times per week. Include one threshold session and one tempo session per week." },
      { type: "h3", text: "Sample threshold session" },
      { type: "p", text: "10 min warm-up. Then 4 × 6 minutes at threshold pace with 90 seconds easy between. 10 min cool-down. Heart rate should sit at 85–90% of max during work intervals." },
      { type: "h2", text: "Week 5–6: Sport-Specific" },
      { type: "p", text: "Intervals matched to game demands. Short bursts of 10–30 seconds at near-max effort, with full recovery. Add change-of-direction work and reactive drills." },
      { type: "quote", text: "The ramp ends with a full-intensity scrimmage week. Treat conditioning as the foundation, not the headline." },
    ],
  },
  "org-7": {
    pageCount: 4,
    wordCount: 1520,
    fileType: "PDF",
    fileSize: "640 KB",
    blocks: [
      { type: "heading", text: "Volleyball Serve Receive Primer" },
      { type: "p", text: "Reading the server, platform mechanics, and target passing. This primer covers fundamentals every passer should internalize before serve-receive drills become game-realistic." },
      { type: "h2", text: "Reading the Server" },
      { type: "p", text: "Watch the toss, not the server's body. Toss height and location predict serve type with high reliability. A toss in front of the lead shoulder usually produces a topspin jump serve." },
      { type: "h2", text: "Platform Mechanics" },
      { type: "list", items: [
        "Hands together, thumbs flat and parallel, wrists down.",
        "Angle the platform toward the target, not at the ball.",
        "Absorb on contact — do not swing the arms.",
      ] },
      { type: "h2", text: "Target Passing" },
      { type: "p", text: "The target is a 4-foot box on the right side of the net, two feet off. Passes inside this box give the setter every option. Passes outside it eliminate the middle attack." },
    ],
  },
  "org-9": {
    pageCount: 3,
    wordCount: 1010,
    fileType: "DOCX",
    fileSize: "180 KB",
    blocks: [
      { type: "heading", text: "Game-Day Checklist (Coach Edition)" },
      { type: "p", text: "End-to-end checklist from arrival through post-game review. Use this as a living document — adapt for travel games and tournament play." },
      { type: "h2", text: "Pre-Game (90 min before tip)" },
      { type: "list", items: [
        "Arrive at venue, locate locker room.",
        "Confirm officials and scorekeeper.",
        "Set up film equipment and check audio.",
        "Run dynamic warm-up at 60 minutes before tip.",
        "Position-specific work at 40 minutes before tip.",
      ] },
      { type: "h2", text: "Pre-Game (15 min before tip)" },
      { type: "list", items: [
        "Final scout review with starters.",
        "Confirm starting lineup with officials.",
        "Pre-game speech — keep it under 3 minutes.",
      ] },
      { type: "h2", text: "Post-Game" },
      { type: "p", text: "Cool-down, brief film note for tomorrow, and a 60-second team huddle. Save the long debrief for the next day's film session." },
    ],
  },
  "org-12": {
    pageCount: 5,
    wordCount: 1740,
    fileType: "PDF",
    fileSize: "780 KB",
    blocks: [
      { type: "heading", text: "Player Evaluation Rubric" },
      { type: "p", text: "Standard rubric for mid-season and end-of-season evaluations. Each player is scored 1–5 across four domains. Aggregate scores feed into development plans." },
      { type: "h2", text: "Domain 1: Technical Skill" },
      { type: "p", text: "Position-specific fundamentals. For ball handlers: dribble, pass, shoot. For bigs: post moves, screens, finishing. Score against position standard, not absolute level." },
      { type: "h2", text: "Domain 2: Tactical Awareness" },
      { type: "p", text: "Decision making in live play. Reads, off-ball movement, defensive rotations. The player either sees the play or doesn't — score what you observe, not what you wish." },
      { type: "h2", text: "Domain 3: Effort and Compete" },
      { type: "p", text: "Sprint speed in transition, contested rebounds, ball pressure on defense. This is the easiest domain to coach and the easiest to score honestly." },
      { type: "h2", text: "Domain 4: Coachability" },
      { type: "p", text: "Response to feedback, willingness to try a new approach, behavior in practice. Score how the player shows up, not how talented they are." },
    ],
  },
  "org-13": {
    pageCount: 4,
    wordCount: 1280,
    fileType: "PDF",
    fileSize: "520 KB",
    blocks: [
      { type: "heading", text: "Parent Communication Guidelines" },
      { type: "p", text: "Tone, cadence, and escalation paths for parent communications. Boca expects all coaches to maintain professional, proactive contact with families." },
      { type: "h2", text: "Cadence" },
      { type: "list", items: [
        "Pre-season: one welcome email by August 15.",
        "In-season: one update every two weeks.",
        "Post-season: one wrap-up email within 10 days of the final game.",
      ] },
      { type: "h2", text: "Tone" },
      { type: "p", text: "Direct, warm, and specific. Avoid vague positivity. Cite specific player progress when possible. Never compare players in writing." },
      { type: "h2", text: "Escalation" },
      { type: "p", text: "If a conversation becomes contentious, move to a phone call. If the issue persists, loop in the program director. Document all formal escalations." },
    ],
  },
};

// Default body for any document without a custom one.
const DEFAULT_DOC_BODY = {
  pageCount: 5,
  wordCount: 1620,
  fileType: "PDF",
  fileSize: "740 KB",
  blocks: [
    { type: "heading", text: "Document overview" },
    { type: "p", text: "This document was approved by your organization for use across all teams. The full content is preserved when added to your library — players see the version your org published." },
    { type: "h2", text: "Section 1" },
    { type: "p", text: "Coaches should review this document in full before using it with players. Highlights have been preserved from the original organization upload." },
    { type: "list", items: [
      "Reference key concepts before practice.",
      "Use the diagrams as discussion prompts.",
      "Pair with relevant video drills where appropriate.",
    ] },
    { type: "h2", text: "Section 2" },
    { type: "p", text: "The latter half of the document covers application notes and common variations. Coaches with experienced groups may skip ahead; younger groups should work through it linearly." },
    { type: "quote", text: "When in doubt, default to the principle and adjust the tactic." },
    { type: "h2", text: "Section 3" },
    { type: "p", text: "Closing notes and references. The bibliography includes both internal Boca documents and external materials — see the org library for related items." },
  ],
};

// Tags applied to org content for filtering in the Browse All view.
// (Topic tags are illustrative.)
const TAGS = ["Defense", "Offense", "Conditioning", "Set Plays", "Fundamentals", "Player Dev", "Operations"];

// ---------------------------------------------------------------------------
// Helpers to expand seed lists.
// Generates a realistic-feeling library of 40+ videos, 50+ schemes, 25+ docs.
// ---------------------------------------------------------------------------

function pad2(n) { return String(n).padStart(2, "0"); }

function makeDate(month, day, year) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[month - 1]} ${day}, ${year}`;
}

function dur(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${pad2(s)}`;
}

// Curated video pool (fundamentals + tactics + drills).
const ORG_VIDEOS_RAW = [
  ["Ground ball fundamentals", "Footwork, body position, and clean pickup mechanics.", 28, "Feb 2, 2025", "Fundamentals"],
  ["Give-and-go — attack movement", "Spacing and timing for a clean two-player give-and-go.", 24, "Feb 14, 2025", "Offense"],
  ["Transition offense — 3v2 break", "Decision tree for the trailing player on a 3v2.", 41, "Mar 4, 2025", "Offense"],
  ["Set play — corner overload", "Numbers advantage on the strong-side corner.", 33, "Mar 18, 2025", "Set Plays"],
  ["Defensive footwork ladder", "Ladder progression for defensive shuffle and crossover steps.", 19, "Feb 21, 2025", "Defense"],
  ["Rebound positioning — boxing out", "Body angle, hand activity, and the contact-then-pursue rule.", 36, "Feb 9, 2025", "Defense"],
  ["Volley defensive scheme walk-through", "Coach-led walkthrough of the printed defensive scheme.", 62, "Jan 11, 2025", "Defense"],
  ["Warm-up routine — 8 minute", "Dynamic warm-up the staff has standardized across all teams.", 48, "Oct 4, 2024", "Conditioning"],
  ["Closeout technique — short and choppy", "Arrival angle, hand position, and the recovery step.", 22, "Feb 26, 2025", "Defense"],
  ["Pick-and-roll — drop coverage drill", "Big drops, guard fights over, with help-side rotation.", 54, "Mar 12, 2025", "Defense"],
  ["Pick-and-roll — hedge coverage drill", "Hard hedge progression with show-and-recover.", 47, "Mar 14, 2025", "Defense"],
  ["Shell drill — base", "Four-on-four shell with help-side rotations and recoveries.", 71, "Jan 22, 2025", "Defense"],
  ["Shell drill — closeout add-on", "Shell with skip passes and contested closeouts.", 58, "Jan 28, 2025", "Defense"],
  ["Free-throw line spacing", "Off-ball spacing rules with a free-throw shooter on the line.", 26, "Feb 1, 2025", "Offense"],
  ["Two-man game — wing entry", "Side pick-and-roll from a wing entry.", 39, "Mar 22, 2025", "Offense"],
  ["Two-man game — top entry", "Top pick-and-roll with a stagger option.", 42, "Mar 24, 2025", "Offense"],
  ["Conditioning ladder — sprint pyramid", "Pyramid intervals matched to game demands.", 84, "Sep 18, 2024", "Conditioning"],
  ["Conditioning circuit — full court", "Full-court agility circuit, six stations.", 96, "Sep 20, 2024", "Conditioning"],
  ["Footwork — defensive slide pyramid", "Slide pyramid progression with reactive cues.", 45, "Oct 12, 2024", "Conditioning"],
  ["Setter platform — overhead release", "Hand position, release angle, and follow-through.", 31, "Feb 6, 2025", "Fundamentals"],
  ["Setter footwork — under the ball", "Getting square to the target before the contact.", 28, "Feb 8, 2025", "Fundamentals"],
  ["Serve receive — three-passer rotation", "Standard three-passer base with seam responsibilities.", 53, "Feb 12, 2025", "Fundamentals"],
  ["Serve receive — two-passer alignment", "Two-passer system with a libero seam call.", 49, "Feb 13, 2025", "Fundamentals"],
  ["Hitting approach — three-step", "Three-step approach with arm swing mechanics.", 35, "Feb 18, 2025", "Fundamentals"],
  ["Hitting approach — four-step", "Four-step approach for outside hitters.", 38, "Feb 19, 2025", "Fundamentals"],
  ["Block timing — middle", "Middle blocker timing on the read.", 41, "Feb 25, 2025", "Defense"],
  ["Block timing — outside", "Outside blocker timing and seam responsibilities.", 39, "Feb 26, 2025", "Defense"],
  ["Set play — quick middle", "Quick middle attack with a back-row decoy.", 32, "Mar 6, 2025", "Set Plays"],
  ["Set play — back-row attack", "Back-row attack from the right side.", 36, "Mar 8, 2025", "Set Plays"],
  ["Set play — slide attack", "Middle slide attack with timing cues.", 33, "Mar 10, 2025", "Set Plays"],
  ["Free play — six-on-six wash", "Wash drill with serve-receive and transition reps.", 124, "Jan 30, 2025", "Offense"],
  ["Free play — queen of the court", "Queen of the court rotation with the bench.", 96, "Feb 4, 2025", "Offense"],
  ["Recovery and mobility — post-practice", "Standard mobility flow for after practice.", 52, "Oct 28, 2024", "Conditioning"],
  ["Mental performance — pre-game routine", "Player-led pre-game mental routine.", 64, "Nov 14, 2024", "Player Dev"],
  ["Film study — guided session", "How a guided film session should run.", 88, "Nov 22, 2024", "Player Dev"],
  ["Player development — individual session structure", "Standard structure for a 30-minute IDP session.", 71, "Dec 3, 2024", "Player Dev"],
  ["Captain meeting — agenda template", "Weekly captain meeting walk-through.", 42, "Dec 9, 2024", "Operations"],
  ["Pre-season parents meeting — outline", "Outline for the pre-season parents meeting.", 58, "Aug 18, 2024", "Operations"],
  ["Mid-season check-in — coaches", "Mid-season coaches check-in framework.", 47, "Jan 8, 2025", "Operations"],
  ["End-of-season debrief — format", "End-of-season debrief format and prompts.", 51, "Apr 18, 2025", "Operations"],
  ["Travel day — operations checklist", "Travel day operations checklist walkthrough.", 36, "Mar 28, 2025", "Operations"],
  ["Officials communication — guidelines", "How to communicate with officials in-game.", 29, "Apr 2, 2025", "Operations"],
];

const ORG_VIDEOS = ORG_VIDEOS_RAW.map((row, i) => ({
  id: `org-v-${i + 1}`,
  kind: "video",
  name: row[0],
  duration: dur(row[2]),
  addedToOrg: row[3],
  description: row[1],
  tag: row[4],
}));

// Schemes & formations — 50+ entries.
// Each is a ScXY where X is the formation family and Y the variant.
// We seed 8 hand-tuned ones and procedurally generate the rest with positions
// that read like real diagrams.
const HAND_SCHEMES = [
  {
    name: "Corner overload — strong side",
    addedToOrg: "Mar 5, 2025",
    description: "4-out trap on the strong-side corner with weak-side rotation.",
    tag: "Set Plays",
    marks: [
      { type: "o", x: 18, y: 25 }, { type: "o", x: 28, y: 50 }, { type: "o", x: 22, y: 75 },
      { type: "x", x: 70, y: 30 }, { type: "x", x: 78, y: 55 }, { type: "x", x: 72, y: 78 },
      { type: "ball", x: 28, y: 50 },
      { type: "arrow", x: 28, y: 50, x2: 60, y2: 30 },
      { type: "arrow", x: 18, y: 25, x2: 50, y2: 25 },
    ],
  },
  {
    name: "2-3 zone defense — base",
    addedToOrg: "Feb 16, 2025",
    description: "Standard 2-3 zone with weak-side help responsibilities.",
    tag: "Defense",
    marks: [
      { type: "x", x: 35, y: 30 }, { type: "x", x: 35, y: 70 },
      { type: "x", x: 55, y: 25 }, { type: "x", x: 55, y: 50 }, { type: "x", x: 55, y: 75 },
      { type: "o", x: 22, y: 50 }, { type: "ball", x: 22, y: 50 },
    ],
  },
  {
    name: "Give-and-go entry — wing",
    addedToOrg: "Jan 24, 2025",
    description: "Two-player give-and-go from the wing into the lane.",
    tag: "Offense",
    marks: [
      { type: "o", x: 22, y: 30 }, { type: "o", x: 38, y: 60 },
      { type: "x", x: 35, y: 35 }, { type: "x", x: 60, y: 60 },
      { type: "ball", x: 22, y: 30 },
      { type: "arrow", x: 22, y: 30, x2: 38, y2: 60 },
      { type: "arrow", x: 22, y: 30, x2: 55, y2: 35 },
      { type: "arrow", x: 38, y: 60, x2: 55, y2: 35 },
    ],
  },
  {
    name: "Set play — back-screen lob",
    addedToOrg: "Apr 1, 2025",
    description: "Down-screen for the cutter, lob entry over the top.",
    tag: "Set Plays",
    marks: [
      { type: "o", x: 22, y: 50 }, { type: "o", x: 45, y: 25 }, { type: "o", x: 45, y: 70 },
      { type: "x", x: 38, y: 28 }, { type: "x", x: 60, y: 50 },
      { type: "ball", x: 22, y: 50 },
      { type: "arrow", x: 45, y: 70, x2: 65, y2: 30 },
      { type: "arrow", x: 22, y: 50, x2: 65, y2: 30 },
    ],
  },
  {
    name: "1-3-1 zone — soft trap",
    addedToOrg: "Feb 4, 2025",
    description: "1-3-1 zone with corner soft-trap rotation.",
    tag: "Defense",
    marks: [
      { type: "x", x: 30, y: 50 }, { type: "x", x: 50, y: 25 }, { type: "x", x: 50, y: 50 }, { type: "x", x: 50, y: 75 },
      { type: "x", x: 70, y: 50 },
      { type: "o", x: 18, y: 50 }, { type: "ball", x: 18, y: 50 },
    ],
  },
  {
    name: "Horns — twist option",
    addedToOrg: "Mar 12, 2025",
    description: "Horns set with a guard-guard twist into a pick-and-roll.",
    tag: "Offense",
    marks: [
      { type: "o", x: 35, y: 50 }, { type: "o", x: 28, y: 38 }, { type: "o", x: 28, y: 62 },
      { type: "o", x: 18, y: 30 }, { type: "o", x: 18, y: 70 },
      { type: "ball", x: 35, y: 50 },
      { type: "arrow", x: 28, y: 38, x2: 28, y2: 62 },
      { type: "arrow", x: 35, y: 50, x2: 50, y2: 50 },
    ],
  },
  {
    name: "Spread pick-and-roll — middle",
    addedToOrg: "Feb 21, 2025",
    description: "Middle pick-and-roll with two shooters spaced corner.",
    tag: "Offense",
    marks: [
      { type: "o", x: 30, y: 50 }, { type: "o", x: 40, y: 50 },
      { type: "o", x: 18, y: 18 }, { type: "o", x: 18, y: 82 }, { type: "o", x: 25, y: 25 },
      { type: "x", x: 38, y: 48 }, { type: "x", x: 48, y: 50 },
      { type: "ball", x: 30, y: 50 },
      { type: "arrow", x: 30, y: 50, x2: 55, y2: 35 },
    ],
  },
  {
    name: "Box-and-one — defensive special",
    addedToOrg: "Mar 30, 2025",
    description: "Box-and-one against a primary scorer.",
    tag: "Defense",
    marks: [
      { type: "x", x: 38, y: 30 }, { type: "x", x: 38, y: 70 },
      { type: "x", x: 55, y: 30 }, { type: "x", x: 55, y: 70 },
      { type: "x", x: 25, y: 50 },
      { type: "o", x: 22, y: 50 }, { type: "ball", x: 22, y: 50 },
    ],
  },
];

const SCHEME_FAMILIES = [
  ["Quick-set", "Fast tempo set with middle attack into a perimeter look.", "Set Plays"],
  ["Pin-down", "Pin-down screen with a curl into the paint.", "Offense"],
  ["Iverson cut", "Iverson cut into a pick-and-roll on the wing.", "Offense"],
  ["Floppy", "Floppy action with double-stagger options.", "Offense"],
  ["Zipper", "Zipper cut into a top of the key set.", "Offense"],
  ["Fist", "Fist call with an empty corner pick-and-roll.", "Offense"],
  ["Stagger", "Stagger screens for the lead shooter.", "Offense"],
  ["Hammer", "Hammer screen on the weak side baseline.", "Set Plays"],
  ["Drag", "Drag screen in early offense.", "Offense"],
  ["Veer", "Veer cut into a backdoor.", "Offense"],
  ["Trail", "Trail action into a stagger.", "Offense"],
  ["Diamond", "Diamond press break alignment.", "Offense"],
  ["1-2-2 press", "1-2-2 full-court press with rotation.", "Defense"],
  ["2-2-1 press", "2-2-1 three-quarter court press.", "Defense"],
  ["3-2 zone", "3-2 zone with extended pressure.", "Defense"],
  ["Triangle-and-two", "Triangle-and-two with two ball-deniers.", "Defense"],
  ["Match-up zone", "Match-up zone with man rules.", "Defense"],
  ["BLOB", "Baseline out-of-bounds set.", "Set Plays"],
  ["SLOB", "Sideline out-of-bounds set.", "Set Plays"],
  ["After-timeout", "After-timeout horns set.", "Set Plays"],
  ["End-of-quarter", "End-of-quarter clock-killer set.", "Set Plays"],
];

// Procedural marks generator — placeholder pitch shapes by family index.
function genMarks(seed) {
  const o = [];
  const x = [];
  for (let i = 0; i < 5; i++) {
    o.push({ type: "o", x: 18 + ((i * 13 + seed * 7) % 30), y: 18 + ((i * 17 + seed * 11) % 64) });
    x.push({ type: "x", x: 50 + ((i * 11 + seed * 13) % 30), y: 18 + ((i * 19 + seed * 5) % 64) });
  }
  const ball = { type: "ball", x: o[0].x, y: o[0].y };
  const arrows = [
    { type: "arrow", x: o[0].x, y: o[0].y, x2: o[2].x, y2: o[2].y },
    { type: "arrow", x: o[1].x, y: o[1].y, x2: 55 + (seed % 18), y2: 35 + (seed % 30) },
  ];
  return [...o, ...x, ball, ...arrows];
}

const GENERATED_SCHEMES = [];
let schemeCount = 0;
SCHEME_FAMILIES.forEach((family, fi) => {
  const variants = ["base", "weak side", "counter", "quick"];
  variants.forEach((variant, vi) => {
    schemeCount += 1;
    const day = ((schemeCount * 7) % 27) + 1;
    const month = ((schemeCount * 3) % 12) + 1;
    GENERATED_SCHEMES.push({
      name: `${family[0]} — ${variant}`,
      addedToOrg: makeDate(month, day, 2025),
      description: family[1],
      tag: family[2],
      marks: genMarks(fi * 4 + vi + 1),
    });
  });
});

const ORG_SCHEMES = [...HAND_SCHEMES, ...GENERATED_SCHEMES].map((s, i) => ({
  id: `scheme-${i + 1}`,
  kind: "scheme",
  field: "horizontal",
  ...s,
}));

// Documents — 25+ items.
const ORG_DOCS_RAW = [
  ["Boca defensive scheme 2025", "Canonical defensive scheme and rotations for the season.", "Jan 14, 2025", "Defense"],
  ["Pre-season conditioning plan", "Six-week conditioning ramp leading into the competitive season.", "Dec 2, 2024", "Conditioning"],
  ["Volleyball serve receive primer", "Reading the server, platform mechanics, and pass targets.", "Jan 22, 2025", "Fundamentals"],
  ["Game-day checklist (coach edition)", "End-to-end checklist from arrival through post-game review.", "Apr 8, 2025", "Operations"],
  ["Player evaluation rubric", "Standard rubric for mid-season and end-of-season evals.", "Mar 18, 2025", "Player Dev"],
  ["Parent communication guidelines", "Tone, cadence, and escalation paths for parent comms.", "Sep 4, 2024", "Operations"],
  ["Captain leadership framework", "Boca's framework for player-led leadership.", "Sep 28, 2024", "Player Dev"],
  ["Travel and tournament protocol", "Travel-day operations and tournament protocols.", "Oct 18, 2024", "Operations"],
  ["Strength and lifting program", "Off-season and in-season strength program.", "Aug 22, 2024", "Conditioning"],
  ["Mental performance handbook", "Pre-game routines, recovery practices, and visualization scripts.", "Nov 12, 2024", "Player Dev"],
  ["Film study playbook", "How to run a guided film session.", "Nov 28, 2024", "Player Dev"],
  ["Recruiting communication template", "Email and call templates for recruiting.", "Aug 4, 2024", "Operations"],
  ["Off-season training plan", "Skill development and conditioning plan for the off-season.", "May 14, 2025", "Conditioning"],
  ["Captain meeting agenda template", "Weekly captain meeting agenda template.", "Dec 4, 2024", "Operations"],
  ["End-of-season debrief format", "Standard debrief format and prompt list.", "Apr 22, 2025", "Operations"],
  ["Concussion protocol — quick reference", "Quick reference for in-game concussion protocol.", "Aug 30, 2024", "Operations"],
  ["Hydration and nutrition guide", "Hydration and nutrition basics for athletes.", "Sep 12, 2024", "Conditioning"],
  ["Officials communication guide", "How to communicate with officials in-game.", "Mar 22, 2025", "Operations"],
  ["Set play install order", "Recommended order for installing set plays.", "Feb 24, 2025", "Set Plays"],
  ["Defensive principles cheat sheet", "One-page summary of defensive principles.", "Feb 6, 2025", "Defense"],
  ["Offensive principles cheat sheet", "One-page summary of offensive principles.", "Feb 7, 2025", "Offense"],
  ["Practice plan template", "Standard practice plan template for the season.", "Aug 14, 2024", "Operations"],
  ["Team rules and code of conduct", "Team rules and code of conduct.", "Aug 18, 2024", "Operations"],
  ["Equipment checklist — full season", "Full-season equipment checklist.", "Jul 28, 2024", "Operations"],
  ["Mid-season coaches check-in", "Mid-season coaches check-in framework.", "Jan 16, 2025", "Operations"],
];

const ORG_DOCS = ORG_DOCS_RAW.map((row, i) => ({
  id: `org-d-${i + 1}`,
  kind: "doc",
  name: row[0],
  description: row[1],
  addedToOrg: row[2],
  tag: row[3],
}));

// Pre-link doc bodies for the well-known seeded ones, by mapping to their id.
// We give the first few ORG_DOCS the rich bodies above for variety.
const DOC_BODY_MAP = {
  "org-d-1": DOC_BODIES["org-3"],
  "org-d-2": DOC_BODIES["org-5"],
  "org-d-3": DOC_BODIES["org-7"],
  "org-d-4": DOC_BODIES["org-9"],
  "org-d-5": DOC_BODIES["org-12"],
  "org-d-6": DOC_BODIES["org-13"],
};

// Which org items the coach has pre-added (so the prototype shows a mixed state).
const PRE_ADDED_ORG_IDS = ["org-v-7", "scheme-2", "org-d-4"];

window.SEED = {
  ORG, COACH_OWN_ITEMS,
  ORG_VIDEOS, ORG_SCHEMES, ORG_DOCS,
  PRE_ADDED_ORG_IDS,
  DOC_BODIES, DOC_BODY_MAP, DEFAULT_DOC_BODY,
  TAGS,
};
