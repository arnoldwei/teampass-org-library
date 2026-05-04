// Sidebar + page chrome — matches the screenshots:
// Boca / Volley team switcher, eyebrow-grouped nav, active item gets the brand pill.

const { Ic } = window;

const shellStyles = {
  shell: {
    display: "grid",
    gridTemplateColumns: "248px minmax(0, 1fr)",
    minHeight: "100vh",
    background: "var(--bg)",
  },
  // ---- Sidebar
  side: {
    background: "#FFFFFF",
    borderRight: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "18px 20px 14px",
    borderBottom: "1px solid var(--border)",
  },
  brandMark: {
    width: 22, height: 22, borderRadius: 5,
    background: "var(--fg)",
    color: "#fff",
    display: "grid", placeItems: "center",
    fontSize: 11, fontWeight: 500,
    letterSpacing: "-0.02em",
  },
  brandWord: {
    fontSize: 13, fontWeight: 500, letterSpacing: "0.04em",
    color: "var(--muted)",
  },
  brandWordStrong: { color: "var(--fg)" },

  navWrap: { padding: "8px 12px", flex: 1, overflow: "auto" },
  eyebrow: {
    fontSize: 10, fontWeight: 600,
    letterSpacing: "0.08em", textTransform: "uppercase",
    color: "var(--muted)",
    padding: "12px 8px 6px",
  },
  navItem: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "8px 10px",
    borderRadius: 6,
    color: "var(--muted)",
    fontSize: 13, fontWeight: 400,
    cursor: "pointer",
    border: "1px solid transparent",
    position: "relative",
    whiteSpace: "nowrap",
  },
  navItemActive: {
    background: "var(--brand-bg)",
    color: "var(--brand-text)",
    borderColor: "var(--brand-border)",
    fontWeight: 500,
  },
  navItemHover: {
    background: "var(--surface)",
    color: "var(--fg)",
  },

  teamSwitcher: {
    margin: "8px 12px 0",
    padding: "10px 12px",
    borderLeft: "2px solid var(--fg)",
    background: "var(--bg)",
    borderRadius: "0 var(--r-md) var(--r-md) 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    cursor: "pointer",
  },
  teamOrg: { fontSize: 11, color: "var(--muted)" },
  teamName: { fontSize: 14, fontWeight: 500, color: "var(--fg)", marginTop: 1 },
  teamSwitchLbl: {
    display: "flex", alignItems: "center", gap: 4,
    fontSize: 11, color: "var(--muted)",
  },

  footer: {
    borderTop: "1px solid var(--border)",
    padding: "14px 16px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  avatar: {
    width: 30, height: 30, borderRadius: 15,
    background: "var(--fg)", color: "#fff",
    display: "grid", placeItems: "center",
    fontSize: 11, fontWeight: 500,
  },
  logout: {
    fontSize: 12, color: "var(--muted)",
    textDecoration: "underline", textUnderlineOffset: 3,
    cursor: "pointer", background: "transparent", border: "none",
    padding: 0,
  },

  // ---- Page main
  main: { padding: "32px 40px 64px", maxWidth: 1180, width: "100%" },
};

function NavItem({ icon, label, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  const style = {
    ...shellStyles.navItem,
    ...(active ? shellStyles.navItemActive : {}),
    ...(!active && hover ? shellStyles.navItemHover : {}),
  };
  return (
    <div style={style}
         onClick={onClick}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}>
      <span style={{ display: "inline-flex" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function Sidebar({ active, onNavigate }) {
  return (
    <aside style={shellStyles.side}>
      <div style={shellStyles.brand}>
        <div style={shellStyles.brandMark}>A</div>
        <div style={shellStyles.brandWord}>
          TEAM<span style={shellStyles.brandWordStrong}>PASS</span>
        </div>
      </div>

      <div style={shellStyles.navWrap}>
        <div style={shellStyles.eyebrow}>ADMIN</div>
        <NavItem icon={<Ic.org2 />} label="Organizations" />

        <div style={shellStyles.teamSwitcher}>
          <div>
            <div style={shellStyles.teamOrg}>Boca</div>
            <div style={shellStyles.teamName}>Volley</div>
          </div>
          <div style={shellStyles.teamSwitchLbl}>
            Switch <Ic.swap size={12} />
          </div>
        </div>

        <div style={shellStyles.eyebrow}>ANALYTICS</div>
        <NavItem icon={<Ic.home />} label="Home" />
        <NavItem icon={<Ic.bars />} label="Reports" />
        <NavItem icon={<Ic.trend />} label="Generate Reports" />

        <div style={shellStyles.eyebrow}>MY TEAM</div>
        <NavItem icon={<Ic.upload />} label="Upload Content" />
        <NavItem
          icon={<Ic.library />}
          label="Content Library"
          active={active === "library" || active === "org-library"}
          onClick={() => onNavigate("library")}
        />
        <NavItem icon={<Ic.playbook />} label="Playbook" />
        <NavItem icon={<Ic.roster />} label="Manage Roster" />
        <NavItem icon={<Ic.org2 />} label="Organization" />
      </div>

      <div style={shellStyles.footer}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={shellStyles.avatar}>AD</div>
        </div>
        <button style={shellStyles.logout}>Log Out</button>
      </div>
    </aside>
  );
}

function Shell({ active, onNavigate, children }) {
  return (
    <div style={shellStyles.shell}>
      <Sidebar active={active} onNavigate={onNavigate} />
      <main style={shellStyles.main}>{children}</main>
    </div>
  );
}

window.Shell = Shell;
