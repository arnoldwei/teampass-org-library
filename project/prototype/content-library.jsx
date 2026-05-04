// Content Library — coach's personal library.
// Shows their own uploads + any org items they've added (with org badge).
// Hover an org-sourced row → reveal "Remove from my library" (error tokens).
// Hover an own row → reveal an ellipsis menu placeholder.

const { Ic } = window;

const clStyles = {
  // Page header
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em",
    color: "var(--fg)",
  },
  sub: { fontSize: 13, color: "var(--muted)", marginTop: 4 },
  actions: { display: "flex", gap: 8, alignItems: "center" },

  btnGhost: {
    background: "transparent",
    color: "var(--muted)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r-md)",
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  btnPrimary: {
    background: "var(--primary-bg)",
    color: "var(--primary-text)",
    border: "1px solid var(--primary-border)",
    borderRadius: "var(--r-md)",
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    boxShadow: "var(--shadow-sm)",
  },

  // Stats
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r-lg)",
    padding: "14px 16px",
  },
  statHead: {
    display: "flex", alignItems: "center", gap: 6,
    color: "var(--muted)",
    fontSize: 10.5, fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "uppercase",
    marginBottom: 8,
    whiteSpace: "nowrap",
  },
  statRow: {
    display: "flex", alignItems: "baseline", justifyContent: "space-between",
  },
  statVal: { fontSize: 26, fontWeight: 500, color: "var(--fg)" },
  statSub: { fontSize: 11, color: "var(--muted)" },
  dotG: {
    width: 8, height: 8, borderRadius: 4,
    background: "var(--brand-border)", display: "inline-block",
  },
  dotY: {
    width: 8, height: 8, borderRadius: 4,
    background: "#D9A40D", display: "inline-block",
  },

  // Banner
  banner: {
    background: "var(--warning-bg)",
    border: "1px solid var(--warning-border)",
    borderRadius: "var(--r-lg)",
    padding: 16,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  bannerHead: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 12,
  },
  bannerTitle: {
    display: "flex", alignItems: "center", gap: 8,
    color: "var(--warning-text)",
    fontSize: 14, fontWeight: 500,
  },
  bannerBody: {
    color: "var(--warning-text)",
    fontSize: 13, lineHeight: 1.5,
    opacity: 0.9,
  },
  bannerDismiss: {
    background: "transparent", border: "none",
    color: "var(--warning-text)",
    fontSize: 12,
    textDecoration: "underline", textUnderlineOffset: 3,
    opacity: 0.8,
  },
  bannerCta: {
    background: "var(--primary-bg)", color: "var(--primary-text)",
    border: "1px solid var(--primary-border)",
    borderRadius: "var(--r-sm)",
    padding: "6px 12px",
    fontSize: 12, fontWeight: 500,
    alignSelf: "flex-start",
    whiteSpace: "nowrap",
  },

  // Tabs
  tabsRow: {
    display: "flex",
    borderBottom: "1px solid var(--border)",
    marginBottom: 16,
    gap: 4,
  },
  tab: {
    background: "transparent", border: "none",
    padding: "10px 14px",
    fontSize: 13, color: "var(--muted)",
    borderBottom: "2px solid transparent",
    marginBottom: -1,
    display: "inline-flex", alignItems: "center", gap: 8,
  },
  tabActive: {
    color: "var(--fg)", fontWeight: 500,
    borderBottomColor: "var(--brand-border)",
  },
  tabCount: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 999,
    padding: "1px 7px",
    fontSize: 11,
    color: "var(--muted)",
  },
  tabCountActive: {
    background: "var(--brand-bg)",
    borderColor: "var(--brand-border)",
    color: "var(--brand-text)",
  },

  // Empty
  empty: {
    background: "var(--card)",
    border: "1px dashed var(--border)",
    borderRadius: "var(--r-lg)",
    padding: "48px 24px",
    textAlign: "center",
    color: "var(--muted)",
  },
  emptyTitle: { fontSize: 15, fontWeight: 500, color: "var(--fg)", marginBottom: 4 },
};

function StatCard({ label, value, sub, dot, icon }) {
  return (
    <div style={clStyles.statCard}>
      <div style={clStyles.statHead}>
        {icon}
        <span>{label}</span>
      </div>
      <div style={clStyles.statRow}>
        <div style={clStyles.statVal}>{value}</div>
        {sub && <div style={clStyles.statSub}>{sub}</div>}
        {dot && <span style={dot === "g" ? clStyles.dotG : clStyles.dotY} />}
      </div>
    </div>
  );
}

function Tabs({ tabs, active, onChange }) {
  return (
    <div style={clStyles.tabsRow}>
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            style={{ ...clStyles.tab, ...(isActive ? clStyles.tabActive : {}) }}
            onClick={() => onChange(t.id)}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span style={{ ...clStyles.tabCount, ...(isActive ? clStyles.tabCountActive : {}) }}>
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

window.StatCard = StatCard;
window.Tabs = Tabs;
window.clStyles = clStyles;
