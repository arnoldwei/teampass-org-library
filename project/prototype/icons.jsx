// Tiny inline-SVG icon set. 1.5px stroke, currentColor.
// Stays consistent with the screenshot vocabulary.

const Ic = {
  building: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15" />
      <path d="M16 9h2a2 2 0 0 1 2 2v10" />
      <path d="M3 21h18" />
      <path d="M8 7h2M8 11h2M8 15h2" />
    </svg>
  ),
  org: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  ),
  home: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  ),
  bars: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
  trend: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  ),
  upload: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 16V8M9 11l3-3 3 3" />
    </svg>
  ),
  library: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h7v14H3zM14 5h7v14h-7z" />
      <path d="M6 9h1M17 9h1" />
    </svg>
  ),
  playbook: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4l6 5-6 5V4zM13 9l8-5v16l-8-5" />
    </svg>
  ),
  roster: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M17 11h4M19 9v4" />
    </svg>
  ),
  org2: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V7l5-3 5 3v14M13 21V11l4-2 4 2v10M3 21h18" />
      <path d="M6 11h2M6 15h2M16 14h1" />
    </svg>
  ),
  play: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 5l12 7-12 7z" />
    </svg>
  ),
  doc: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h7M9 17h5" />
    </svg>
  ),
  check: (p) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l4 4 10-10" />
    </svg>
  ),
  plus: (p) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  minus: (p) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
    </svg>
  ),
  arrowLeft: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  ),
  swap: (p) => (
    <svg width={p.size||12} height={p.size||12} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h12M16 4l3 3-3 3" />
      <path d="M17 17H5M8 14l-3 3 3 3" />
    </svg>
  ),
  info: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </svg>
  ),
  warn: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16h.01" />
    </svg>
  ),
  field: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M12 5v14M3 12h18" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  eye: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  close: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  ellipsis: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  ),
  inbox: (p) => (
    <svg width={p.size||32} height={p.size||32} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13l3-7h12l3 7v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="M3 13h5l1 2h6l1-2h5" />
    </svg>
  ),
};

window.Ic = Ic;
