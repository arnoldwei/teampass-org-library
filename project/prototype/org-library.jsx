// Org Library — full-page browse view, breadcrumb back to Content Library.
// Hover a row → ellipsis hidden, "Add to my library" revealed.
// Already-added rows show "Added" status (not a toggle).
// Per PRD: no ellipsis menu for org content at all — only add/added.

const { Ic } = window;

const olStyles = {
  // Top bar with breadcrumb + title
  breadcrumb: {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontSize: 12, color: "var(--muted)",
    background: "transparent", border: "none",
    padding: "4px 0",
    cursor: "pointer",
    marginBottom: 4,
  },
  breadcrumbHover: { color: "var(--fg)" },

  header: { marginBottom: 24 },
  titleRow: {
    display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
    marginBottom: 0,
  },
  title: {
    fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em",
    color: "var(--fg)",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  titleBadge: {
    display: "inline-flex", alignItems: "center", gap: 5,
    background: "var(--brand-bg)",
    color: "var(--brand-text)",
    border: "1px solid var(--brand-border)",
    borderRadius: 999,
    padding: "3px 10px",
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0,
  },
  sub: {
    fontSize: 13, color: "var(--muted)", marginTop: 6,
    maxWidth: 640,
  },

  // Hint strip
  hint: {
    display: "flex", alignItems: "center", gap: 8,
    fontSize: 12, color: "var(--muted)",
    padding: "0 4px 8px",
  },
};

window.olStyles = olStyles;
