// App entry — handles routing between Content Library, Org Library, and Browse All.
// add/remove state, preview panel, and renders all content affordances.

const { Ic, Shell, StatCard, Tabs, clStyles, olStyles, FieldDiagram, PreviewPanel } = window;
const { ORG, COACH_OWN_ITEMS, ORG_VIDEOS, ORG_DOCS, ORG_SCHEMES, PRE_ADDED_ORG_IDS, TAGS } = window.SEED;

// Combined list of all org-library content (videos, docs, schemes).
const ALL_ORG_CONTENT = [...ORG_VIDEOS, ...ORG_DOCS, ...ORG_SCHEMES];
function findOrgItem(id) { return ALL_ORG_CONTENT.find((i) => i.id === id); }

// ---------------------------------------------------------------------------
// CSS — hover states, transitions, button hover, browse all page.
// ---------------------------------------------------------------------------

const HOVER_CSS = `
.cr {
  position: relative; display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; background: var(--card);
  border: 1px solid var(--border); border-radius: var(--r-md);
  transition: border-color 120ms, background 120ms, box-shadow 220ms;
  cursor: pointer;
}
.cr:hover { border-color: var(--border-hover); background: #FCFCFB; }
.cr.pulse { box-shadow: 0 0 0 3px rgba(110,157,16,0.18); border-color: var(--brand-border); }

.cr .hover-action { opacity: 0; pointer-events: none; transition: opacity 120ms; }
.cr:hover .hover-action { opacity: 1; pointer-events: auto; }
.cr .rest-action { opacity: 1; transition: opacity 120ms; }
.cr:hover .rest-action { opacity: 0; pointer-events: none; }

.vc {
  position: relative; background: var(--card);
  border: 1px solid var(--border); border-radius: var(--r-lg);
  overflow: hidden; transition: border-color 140ms, transform 220ms, box-shadow 220ms;
  display: flex; flex-direction: column; cursor: pointer;
}
.vc:hover {
  border-color: var(--border-hover); transform: translateY(-2px);
  box-shadow: 0 6px 18px -10px #27252026, 0 2px 4px -2px #27252014;
}
.vc.pulse { box-shadow: 0 0 0 3px rgba(110,157,16,0.22); border-color: var(--brand-border); }
.vc .play-overlay {
  position: absolute; inset: 0; display: grid; place-items: center;
  background: linear-gradient(180deg, transparent 40%, #00000055 100%);
  opacity: 0; transition: opacity 160ms;
}
.vc:hover .play-overlay { opacity: 1; }
.vc .play-bubble {
  width: 48px; height: 48px; border-radius: 24px;
  background: #FFFFFFE6; display: grid; place-items: center;
  color: var(--fg); box-shadow: 0 4px 12px -4px #00000033;
  transform: translateY(4px); transition: transform 160ms;
}
.vc:hover .play-bubble { transform: translateY(0); }

.carousel-track {
  display: grid; grid-auto-flow: column; grid-auto-columns: 280px;
  gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory;
  scroll-behavior: smooth; padding: 4px 2px 14px; scrollbar-width: thin;
}
.carousel-track > * { scroll-snap-align: start; }
.carousel-track::-webkit-scrollbar { height: 8px; }
.carousel-track::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

/* Add / Added / Remove button hover states */
.btn-add { background: var(--card); color: var(--fg); border: 1px solid var(--border);
  transition: background 120ms, border-color 120ms, box-shadow 120ms, transform 100ms; }
.btn-add:hover { background: var(--fg); color: #FFFFFF; border-color: var(--primary-border);
  box-shadow: 0 2px 6px -2px #2725204D; }
.btn-add:active { transform: translateY(1px); }

.btn-added { background: var(--success-bg); color: var(--success-text);
  border: 1px solid var(--success-border); cursor: default;
  transition: background 120ms; }
.btn-added:hover { background: #BFF0D6; }

.btn-remove { background: var(--error-bg); color: var(--error-text);
  border: 1px solid var(--error-border);
  transition: background 120ms, border-color 120ms; }
.btn-remove:hover { background: #FBE5E5; border-color: #F1A6A6; }

.btn-primary-h { transition: background 120ms, box-shadow 120ms, transform 100ms; }
.btn-primary-h:hover { background: #10100E; box-shadow: 0 4px 12px -3px #27252066; }
.btn-primary-h:active { transform: translateY(1px); }

.btn-ghost-h { transition: background 120ms, color 120ms, border-color 120ms; }
.btn-ghost-h:hover { background: var(--surface); color: var(--fg); border-color: var(--border-hover); }

/* Browse All search input */
.browse-search:focus { outline: none; border-color: var(--border-hover); box-shadow: 0 0 0 3px rgba(110,157,16,0.1); }

/* Type filter chip hover */
.type-chip:hover { border-color: var(--border-hover) !important; }
.type-chip.active:hover { border-color: var(--brand-border) !important; }

/* Skeleton shimmer */
@keyframes shimmer {
  0% { background-position: -400% 0; }
  100% { background-position: 400% 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--surface) 25%, #E8E6E1 50%, var(--surface) 75%);
  background-size: 400% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: var(--r-sm);
}

/* Toast */
.toast-wrap {
  position: fixed; bottom: 28px; right: 28px;
  z-index: 200; pointer-events: none;
}
.toast {
  background: var(--fg); color: #FFFFFF;
  border-radius: var(--r-lg);
  padding: 14px 16px;
  display: flex; align-items: center; gap: 12px;
  box-shadow: 0 8px 28px -6px #27252044, 0 2px 8px -2px #2725201A;
  min-width: 280px; max-width: 400px;
  pointer-events: auto;
  transform: translateY(16px); opacity: 0;
  transition: transform 300ms cubic-bezier(.2,.8,.2,1), opacity 220ms;
}
.toast.visible { transform: translateY(0); opacity: 1; }
.toast-name { font-size: 13px; font-weight: 500; flex: 1; line-height: 1.4; }
.toast-link {
  font-size: 12px; font-weight: 500; white-space: nowrap;
  color: var(--brand-bg); background: transparent; border: none;
  cursor: pointer; padding: 0; text-decoration: underline; text-underline-offset: 3px;
  transition: color 120ms;
}
.toast-link:hover { color: #FFFFFF; }
.toast-close {
  width: 22px; height: 22px; border-radius: 4px;
  background: #FFFFFF18; border: none; cursor: pointer;
  display: grid; place-items: center; color: #FFFFFF99;
  transition: background 120ms, color 120ms; flex-shrink: 0;
}
.toast-close:hover { background: #FFFFFF30; color: #FFFFFF; }
`;

(function injectHoverCss() {
  if (!document.getElementById("__cr_hover_css")) {
    const s = document.createElement("style");
    s.id = "__cr_hover_css";
    s.textContent = HOVER_CSS;
    document.head.appendChild(s);
  }
})();

// ---------------------------------------------------------------------------
// Toast notification — shown when an item is added to the personal library.
// ---------------------------------------------------------------------------

function ToastNotification({ toast, onNavigateLibrary }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!toast) { setVisible(false); return; }
    const show = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(show);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="toast-wrap">
      <div className={`toast${visible ? " visible" : ""}`}>
        <span className="toast-name">
          <span style={{ opacity: 0.7, fontWeight: 400 }}>Added to your library: </span>
          {toast.name}
        </span>
        <button className="toast-link" onClick={onNavigateLibrary}>
          Take me there
        </button>
        <button className="toast-close" onClick={toast.onDismiss} aria-label="Dismiss">
          <Ic.close size={11} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton rows — shown briefly while Browse All "loads".
// ---------------------------------------------------------------------------

function SkeletonRows({ count = 8 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 14px",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-md)",
        }}>
          <div className="skeleton" style={{ width: 40, height: 40, borderRadius: "var(--r-md)", flexShrink: 0 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="skeleton" style={{ height: 13, width: `${45 + (i * 13) % 30}%` }} />
            <div className="skeleton" style={{ height: 10, width: `${25 + (i * 7) % 20}%` }} />
          </div>
          <div className="skeleton" style={{ height: 28, width: 110, borderRadius: "var(--r-sm)", flexShrink: 0 }} />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Common style fragments used by buttons (className handles hover state).
// ---------------------------------------------------------------------------

const btnBase = {
  display: "inline-flex", alignItems: "center", gap: 5,
  fontSize: 12, fontWeight: 500,
  padding: "6px 12px",
  borderRadius: "var(--r-sm)",
  whiteSpace: "nowrap",
  boxShadow: "var(--shadow-sm)",
};
const orgBadgeStyle = {
  display: "inline-flex", alignItems: "center", gap: 4,
  background: "var(--brand-bg)", color: "var(--brand-text)",
  border: "1px solid var(--brand-border)",
  borderRadius: "var(--r-sm)",
  padding: "1px 6px 1px 5px",
  fontSize: 11, fontWeight: 500,
  whiteSpace: "nowrap",
};

// ---------------------------------------------------------------------------
// Row component — used for documents and Browse All list items.
//   mode: "own" | "org-source" | "org-added"
// ---------------------------------------------------------------------------

const rowStyles = {
  iconWrap: {
    width: 40, height: 40, borderRadius: "var(--r-md)",
    display: "grid", placeItems: "center", flexShrink: 0,
  },
  iconVideo: { background: "var(--info-bg)", color: "var(--info-text)" },
  iconDoc: { background: "#ECFDF5", color: "var(--success-text)" },
  iconScheme: { background: "#F4F8EA", color: "var(--brand-text)" },
  info: { flex: 1, minWidth: 0 },
  nameLine: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  name: { fontSize: 13.5, fontWeight: 500, color: "var(--fg)" },
  meta: { fontSize: 11.5, color: "var(--muted)", marginTop: 3 },
  actionSlot: {
    position: "relative", flexShrink: 0,
    minWidth: 192, height: 30,
    display: "flex", alignItems: "center", justifyContent: "flex-end",
  },
  actionItem: {
    position: "absolute", right: 0, top: 0, bottom: 0,
    display: "inline-flex", alignItems: "center",
  },
  ellipsis: {
    width: 30, height: 30,
    border: "1px solid var(--border)", background: "var(--card)",
    borderRadius: "var(--r-sm)",
    display: "grid", placeItems: "center",
    color: "var(--muted)", cursor: "pointer",
  },
};

function buildMeta(item, mode) {
  const kind = item.kind === "video" ? "Video" : item.kind === "scheme" ? "Scheme" : "Document";
  const dur = item.duration ? ` · ${item.duration}` : "";
  if (mode === "org-source") return `${kind}${dur} · Added ${item.addedToOrg}`;
  if (mode === "org-added")  return `${kind}${dur} · From org library · Not yet published`;
  return item.meta;
}

function ContentRow({ item, mode, isAdded, justChanged, onAdd, onRemove, onPreview }) {
  const isVideo  = item.kind === "video";
  const isScheme = item.kind === "scheme";
  // Show org badge in the personal library where provenance matters.
  // In the org library itself (org-source) the context strip makes it clear.
  const showOrgBadge = mode === "org-added";

  let restAction = null;
  let hoverAction = null;

  if (mode === "own") {
    restAction = (
      <button style={{ ...rowStyles.ellipsis, opacity: 0.6 }} aria-label="More actions"
        onClick={(e) => e.stopPropagation()}>
        <Ic.ellipsis />
      </button>
    );
    hoverAction = (
      <button style={rowStyles.ellipsis} aria-label="More actions"
        onClick={(e) => e.stopPropagation()}>
        <Ic.ellipsis />
      </button>
    );
  } else if (mode === "org-source") {
    if (isAdded) {
      const btn = (
        <button className="btn-added" style={btnBase} aria-label="Already added"
          onClick={(e) => e.stopPropagation()}>
          <Ic.check size={11} /> Added
        </button>
      );
      restAction = btn; hoverAction = btn;
    } else {
      hoverAction = (
        <button className="btn-add" style={btnBase}
          onClick={(e) => { e.stopPropagation(); onAdd(item.id); }}>
          <Ic.plus size={11} /> Add to my library
        </button>
      );
    }
  } else if (mode === "org-added") {
    hoverAction = (
      <button className="btn-remove" style={btnBase}
        onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}>
        <Ic.minus size={11} /> Remove from my library
      </button>
    );
  }

  const persistent = mode === "org-source" && isAdded;
  const clickable = mode === "org-source" || mode === "org-added";

  return (
    <div
      className={`cr${justChanged ? " pulse" : ""}`}
      onClick={() => clickable && onPreview && onPreview(item)}
      style={{ cursor: clickable ? "pointer" : "default" }}
    >
      <div style={{
        ...rowStyles.iconWrap,
        ...(isVideo ? rowStyles.iconVideo : isScheme ? rowStyles.iconScheme : rowStyles.iconDoc),
      }}>
        {isVideo ? <Ic.play size={16} /> : isScheme ? <Ic.field size={16} /> : <Ic.doc size={16} />}
      </div>

      <div style={rowStyles.info}>
        <div style={rowStyles.nameLine}>
          <span style={rowStyles.name}>{item.name}</span>
          {showOrgBadge && (
            <span style={orgBadgeStyle}>
              <Ic.building size={11} /> {ORG.name}
            </span>
          )}
        </div>
        <div style={rowStyles.meta}>{buildMeta(item, mode)}</div>
      </div>

      <div style={rowStyles.actionSlot}>
        {persistent ? (
          <div style={rowStyles.actionItem}>{restAction}</div>
        ) : (
          <React.Fragment>
            {restAction && (
              <div className="rest-action" style={rowStyles.actionItem}>{restAction}</div>
            )}
            {hoverAction && (
              <div className="hover-action" style={rowStyles.actionItem}>{hoverAction}</div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Video / Scheme card — hero treatment with thumbnail + duration chip.
// ---------------------------------------------------------------------------

const videoStyles = {
  thumb: {
    aspectRatio: "16 / 10",
    background:
      "repeating-linear-gradient(135deg, #2725200A 0 8px, transparent 8px 16px), var(--info-bg)",
    color: "var(--info-text)",
    position: "relative", display: "grid", placeItems: "center",
    borderBottom: "1px solid var(--border)",
  },
  thumbInner: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: 11, color: "var(--info-text)",
    opacity: 0.55, letterSpacing: "0.04em", textTransform: "uppercase",
  },
  duration: {
    position: "absolute", right: 10, bottom: 10,
    background: "#10100ECC", color: "#FFFFFF",
    fontSize: 11, fontWeight: 500,
    padding: "2px 6px", borderRadius: 4,
    fontVariantNumeric: "tabular-nums",
  },
  body: {
    padding: "12px 14px 14px",
    display: "flex", flexDirection: "column", gap: 6, flex: 1,
  },
  title: {
    fontSize: 14, fontWeight: 500, color: "var(--fg)", lineHeight: 1.35,
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
    overflow: "hidden", minHeight: 38,
  },
  desc: {
    fontSize: 12, color: "var(--muted)", lineHeight: 1.45,
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
    overflow: "hidden", minHeight: 32,
  },
  metaRow: { fontSize: 11, color: "var(--muted)", marginTop: 2 },
  actionRow: { marginTop: 8, display: "flex" },
  fullBtn: { width: "100%", justifyContent: "center", boxShadow: "none" },
};

function MediaCard({ item, isAdded, justChanged, onAdd, onPreview, mediaSlot }) {
  return (
    <div className={`vc${justChanged ? " pulse" : ""}`} onClick={() => onPreview(item)}>
      {mediaSlot}
      <div style={videoStyles.body}>
        <div style={videoStyles.title}>{item.name}</div>
        <div style={videoStyles.desc}>{item.description}</div>
        <div style={videoStyles.metaRow}>Added {item.addedToOrg}</div>
        <div style={videoStyles.actionRow}>
          {isAdded ? (
            <button className="btn-added" style={{ ...btnBase, ...videoStyles.fullBtn }}
              onClick={(e) => e.stopPropagation()}>
              <Ic.check size={11} /> Added to my library
            </button>
          ) : (
            <button className="btn-add" style={{ ...btnBase, ...videoStyles.fullBtn }}
              onClick={(e) => { e.stopPropagation(); onAdd(item.id); }}>
              <Ic.plus size={11} /> Add to my library
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoCard(props) {
  const { item } = props;
  return (
    <MediaCard {...props} mediaSlot={
      <div style={videoStyles.thumb}>
        <div style={videoStyles.thumbInner}>video thumbnail</div>
        {item.duration && <div style={videoStyles.duration}>{item.duration}</div>}
        <div className="play-overlay">
          <div className="play-bubble"><Ic.play size={18} /></div>
        </div>
      </div>
    } />
  );
}

function SchemeCard(props) {
  const { item } = props;
  return (
    <MediaCard {...props} mediaSlot={
      <div style={{ borderBottom: "1px solid var(--border)" }}>
        <FieldDiagram marks={item.marks} ratio="16 / 10" />
      </div>
    } />
  );
}

// ---------------------------------------------------------------------------
// Carousel — horizontal scrolling card track with prev/next arrows + View all.
// ---------------------------------------------------------------------------

const carouselStyles = {
  controlsRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11, fontWeight: 600, color: "var(--muted)",
    letterSpacing: "0.06em", textTransform: "uppercase",
    display: "flex", alignItems: "center", gap: 8,
  },
  count: {
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: 999, padding: "1px 7px",
    fontSize: 11, fontWeight: 500, color: "var(--muted)",
    letterSpacing: 0, textTransform: "none",
  },
  rightControls: { display: "flex", alignItems: "center", gap: 8 },
  viewAll: {
    fontSize: 12, color: "var(--muted)",
    background: "transparent", border: "none",
    cursor: "pointer", padding: "2px 4px",
    display: "inline-flex", alignItems: "center", gap: 4,
    textDecoration: "underline", textUnderlineOffset: 3,
    transition: "color 120ms",
  },
  arrows: { display: "flex", gap: 6 },
  arrow: {
    width: 30, height: 30,
    border: "1px solid var(--border)", background: "var(--card)",
    borderRadius: "var(--r-sm)",
    display: "grid", placeItems: "center",
    color: "var(--muted)", cursor: "pointer",
  },
  arrowDisabled: { opacity: 0.4, cursor: "not-allowed" },
};

function Carousel({ title, items, addedIds, justChangedId, onAdd, onPreview, CardComp, onViewAll }) {
  const trackRef = React.useRef(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const update = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  React.useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, items.length]);

  function nudge(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  }

  return (
    <div>
      <div style={carouselStyles.controlsRow}>
        <div style={carouselStyles.sectionTitle}>
          {title} <span style={carouselStyles.count}>{items.length}</span>
        </div>
        <div style={carouselStyles.rightControls}>
          {onViewAll && (
            <button style={carouselStyles.viewAll} onClick={onViewAll}>
              View all
            </button>
          )}
          <div style={carouselStyles.arrows}>
            <button className="btn-ghost-h"
              style={{ ...carouselStyles.arrow, ...(canPrev ? {} : carouselStyles.arrowDisabled) }}
              onClick={() => nudge(-1)} disabled={!canPrev} aria-label="Previous">
              <Ic.arrowLeft size={14} />
            </button>
            <button className="btn-ghost-h"
              style={{ ...carouselStyles.arrow, ...(canNext ? {} : carouselStyles.arrowDisabled) }}
              onClick={() => nudge(1)} disabled={!canNext} aria-label="Next">
              <span style={{ display: "inline-flex", transform: "scaleX(-1)" }}>
                <Ic.arrowLeft size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="carousel-track">
        {items.map((item) => (
          <CardComp
            key={item.id}
            item={item}
            isAdded={addedIds.includes(item.id)}
            justChanged={item.id === justChangedId}
            onAdd={onAdd}
            onPreview={onPreview}
          />
        ))}
      </div>
    </div>
  );
}

// ===========================================================================
// Page: Content Library
// ===========================================================================

function ContentLibraryPage({ ownItems, addedOrgItems, onNavigateOrg, justChangedId, onRemove, onPreview }) {
  const [tab, setTab] = React.useState("docs");
  const [bannerOpen, setBannerOpen] = React.useState(true);

  const docs = [
    ...ownItems.filter((i) => i.kind === "doc"),
    ...addedOrgItems.filter((i) => i.kind === "doc" || i.kind === "scheme"),
  ];
  const videos = [
    ...ownItems.filter((i) => i.kind === "video"),
    ...addedOrgItems.filter((i) => i.kind === "video"),
  ];

  const totalDocs = docs.length;
  const totalVideos = videos.length;
  const unpublished = ownItems.filter((i) => !i.published).length + addedOrgItems.length;
  const published = ownItems.filter((i) => i.published).length;

  const list = tab === "docs" ? docs : videos;

  return (
    <div>
      <div style={clStyles.header}>
        <div>
          <div style={clStyles.title}>Content Library</div>
          <div style={clStyles.sub}>
            Your central hub for managing, editing, and publishing team content.
          </div>
        </div>
        <div style={clStyles.actions}>
          <button className="btn-ghost-h" style={clStyles.btnGhost} onClick={onNavigateOrg}>
            <Ic.building size={13} /> Browse Org Library
          </button>
          <button className="btn-primary-h" style={clStyles.btnPrimary}>
            <Ic.plus size={11} /> Upload New
          </button>
        </div>
      </div>

      <div style={clStyles.stats}>
        <StatCard label="Total documents" value={totalDocs} sub={`${totalDocs * 0} views`} icon={<Ic.doc size={13} />} />
        <StatCard label="Drill videos" value={totalVideos} sub={`${totalVideos * 0} views`} icon={<Ic.play size={12} />} />
        <StatCard label="Published" value={published} dot="g" icon={<Ic.check size={11} />} />
        <StatCard label="Unpublished" value={unpublished} dot="y" icon={<Ic.warn size={12} />} />
      </div>

      {bannerOpen && unpublished > 0 && (
        <div style={clStyles.banner}>
          <div style={clStyles.bannerHead}>
            <div style={clStyles.bannerTitle}>
              <Ic.warn size={14} /> {`${unpublished} unpublished item${unpublished === 1 ? "" : "s"}`}
            </div>
            <button style={clStyles.bannerDismiss} onClick={() => setBannerOpen(false)}>
              Dismiss
            </button>
          </div>
          <div style={clStyles.bannerBody}>
            You have content that's ready for review but not published yet. Review metadata
            and publish to make it visible to your team.
          </div>
          <button className="btn-primary-h" style={clStyles.bannerCta}>
            Review unpublished content
          </button>
        </div>
      )}

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "docs", label: "All Documents", count: totalDocs },
          { id: "videos", label: "All Videos", count: totalVideos },
        ]}
      />

      {list.length === 0 ? (
        <div style={clStyles.empty}>
          <div style={{ display: "grid", placeItems: "center", marginBottom: 12, color: "var(--border-hover)" }}>
            <Ic.inbox size={36} />
          </div>
          <div style={clStyles.emptyTitle}>No {tab === "docs" ? "documents" : "videos"} yet</div>
          <div style={{ fontSize: 13 }}>
            Upload your own, or browse the {ORG.name} Org Library for approved materials.
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {list.map((item) => {
            const isOrg = item.id.startsWith("org-") || item.id.startsWith("scheme-");
            return (
              <ContentRow
                key={item.id}
                item={item}
                mode={isOrg ? "org-added" : "own"}
                justChanged={item.id === justChangedId}
                onRemove={onRemove}
                onPreview={onPreview}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Page: Org Library
// — page-level context strip telegraphs "you're in Boca's library"
// — videos carousel, schemes carousel, documents list (per-row badges removed)
// ===========================================================================

const orgPageStyles = {
  contextStrip: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r-md)",
    padding: "10px 14px",
    display: "flex", alignItems: "center", gap: 10,
    marginBottom: 24,
  },
  contextIcon: {
    display: "grid", placeItems: "center",
    color: "var(--muted)",
    flexShrink: 0,
  },
  contextText: { flex: 1, color: "var(--muted)" },
  contextTitle: { fontSize: 12.5, fontWeight: 400 },
  contextSub: null,
  countPill: null,
  sectionGap: { marginBottom: 32 },
  docsHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 10,
  },
  docsLeft: {
    fontSize: 11, fontWeight: 600, color: "var(--muted)",
    letterSpacing: "0.06em", textTransform: "uppercase",
    display: "flex", alignItems: "center", gap: 8,
  },
  count: {
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: 999, padding: "1px 7px",
    fontSize: 11, fontWeight: 500, color: "var(--muted)",
    letterSpacing: 0, textTransform: "none",
  },
};

function OrgLibraryPage({ videos, docs, schemes, addedIds, onBack, onAdd, onPreview, justChangedId, onViewAll }) {
  const total = videos.length + schemes.length + docs.length;
  const [stripVisible, setStripVisible] = React.useState(true);

  return (
    <div>
      <button className="btn-ghost-h" style={olStyles.breadcrumb} onClick={onBack}>
        <Ic.arrowLeft size={13} /> Content Library
      </button>

      <div style={olStyles.header}>
        <div style={olStyles.titleRow}>
          <div style={olStyles.title}>Org Library</div>
        </div>
        <div style={olStyles.sub}>
          Browse content approved by your org. Click any item to preview, then add
          it to your personal library to publish to players. Org content is read-only.
        </div>
      </div>

      {stripVisible && (
        <div style={orgPageStyles.contextStrip}>
          <div style={orgPageStyles.contextIcon}>
            <Ic.building size={14} />
          </div>
          <div style={orgPageStyles.contextText}>
            <span style={orgPageStyles.contextTitle}>
              Browsing {ORG.name}'s shared library · {total} approved items · All content is read-only
            </span>
          </div>
          <button
            onClick={() => setStripVisible(false)}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              color: "var(--muted)", display: "grid", placeItems: "center",
              padding: 4, borderRadius: "var(--r-sm)", flexShrink: 0,
              transition: "color 120ms",
            }}
            aria-label="Dismiss"
          >
            <Ic.close size={12} />
          </button>
        </div>
      )}

      {videos.length > 0 && (
        <div style={orgPageStyles.sectionGap}>
          <Carousel
            title="Videos"
            items={videos}
            addedIds={addedIds}
            justChangedId={justChangedId}
            onAdd={onAdd}
            onPreview={onPreview}
            CardComp={VideoCard}
            onViewAll={() => onViewAll("video")}
          />
        </div>
      )}

      {schemes.length > 0 && (
        <div style={orgPageStyles.sectionGap}>
          <Carousel
            title="Schemes & formations"
            items={schemes}
            addedIds={addedIds}
            justChangedId={justChangedId}
            onAdd={onAdd}
            onPreview={onPreview}
            CardComp={SchemeCard}
            onViewAll={() => onViewAll("scheme")}
          />
        </div>
      )}

      {docs.length > 0 && (
        <div>
          <div style={orgPageStyles.docsHeader}>
            <div style={orgPageStyles.docsLeft}>
              Documents <span style={orgPageStyles.count}>{docs.length}</span>
            </div>
            <button style={carouselStyles.viewAll} onClick={() => onViewAll("doc")}>
              View all
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {docs.slice(0, 8).map((item) => (
              <ContentRow
                key={item.id}
                item={item}
                mode="org-source"
                isAdded={addedIds.includes(item.id)}
                justChanged={item.id === justChangedId}
                onAdd={onAdd}
                onPreview={onPreview}
              />
            ))}
            {docs.length > 8 && (
              <button
                className="btn-ghost-h"
                style={{
                  width: "100%", padding: "10px",
                  border: "1px dashed var(--border)",
                  borderRadius: "var(--r-md)",
                  fontSize: 13, color: "var(--muted)",
                  background: "transparent", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}
                onClick={() => onViewAll("doc")}
              >
                View all {docs.length} documents
              </button>
            )}
          </div>
        </div>
      )}

      {total === 0 && (
        <div style={clStyles.empty}>
          <div style={{ display: "grid", placeItems: "center", marginBottom: 12, color: "var(--border-hover)" }}>
            <Ic.inbox size={36} />
          </div>
          <div style={clStyles.emptyTitle}>Your org hasn't published any content yet.</div>
          <div style={{ fontSize: 13 }}>
            When {ORG.name} approves drills or documents, they'll appear here.
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Page: Browse All — full filterable/searchable view for large libraries.
// ===========================================================================

const browseStyles = {
  searchWrap: {
    position: "relative",
    flex: "1 1 240px",
    minWidth: 200,
  },
  searchIcon: {
    position: "absolute", left: 10, top: "50%",
    transform: "translateY(-50%)",
    color: "var(--muted)", pointerEvents: "none",
    display: "flex",
  },
  searchInput: {
    width: "100%",
    paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
    border: "1px solid var(--border)", borderRadius: "var(--r-md)",
    fontSize: 13, fontFamily: "var(--font)",
    background: "var(--card)", color: "var(--fg)",
    transition: "border-color 120ms, box-shadow 120ms",
  },
  filterBar: {
    display: "flex", alignItems: "center", gap: 10,
    marginBottom: 14, flexWrap: "wrap",
  },
  chipRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  sortRow: { display: "flex", gap: 6, marginLeft: "auto" },
  resultsLine: {
    display: "flex", alignItems: "center", gap: 10,
    marginBottom: 14, flexWrap: "wrap",
  },
  resultsCount: { fontSize: 12, color: "var(--muted)" },
  tagChipRow: { display: "flex", gap: 6, flexWrap: "wrap" },
};

function TypeChip({ id, label, count, active, onClick }) {
  return (
    <button
      className={`type-chip${active ? " active" : ""}`}
      onClick={onClick}
      style={{
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 12, fontWeight: active ? 500 : 400,
        border: `1px solid ${active ? "var(--brand-border)" : "var(--border)"}`,
        background: active ? "var(--brand-bg)" : "var(--card)",
        color: active ? "var(--brand-text)" : "var(--muted)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        display: "inline-flex", alignItems: "center", gap: 6,
        transition: "background 120ms, border-color 120ms, color 120ms",
      }}
    >
      {label}
      <span style={{
        fontSize: 10.5, fontWeight: 500, lineHeight: 1,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: active ? "var(--brand-border)" : "var(--surface)",
        color: active ? "white" : "var(--muted)",
        borderRadius: 999, padding: "1px 5px", minWidth: 18,
        transition: "background 120ms, color 120ms",
      }}>
        {count}
      </span>
    </button>
  );
}

function SortBtn({ id, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 10px",
        borderRadius: "var(--r-sm)",
        fontSize: 12, fontWeight: active ? 500 : 400,
        border: `1px solid ${active ? "var(--border-hover)" : "var(--border)"}`,
        background: active ? "var(--surface)" : "transparent",
        color: active ? "var(--fg)" : "var(--muted)",
        cursor: "pointer",
        transition: "background 120ms, color 120ms, border-color 120ms",
      }}
    >
      {label}
    </button>
  );
}

function TagChip({ tag, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "3px 9px",
        borderRadius: 999, fontSize: 11, fontWeight: 500,
        border: `1px solid ${active ? "var(--info-border)" : "var(--border)"}`,
        background: active ? "var(--info-bg)" : "transparent",
        color: active ? "var(--info-text)" : "var(--muted)",
        cursor: "pointer",
        transition: "background 100ms, color 100ms, border-color 100ms",
      }}
    >
      {tag === "all" ? "All topics" : tag}
    </button>
  );
}

function BrowseAllPage({ videos, schemes, docs, addedIds, onBack, onNavigateLibrary, onAdd, onPreview, justChangedId, defaultType }) {
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState(defaultType || "all");
  const [tagFilter, setTagFilter] = React.useState("all");
  const [loading, setLoading] = React.useState(true);

  // Scroll to top + brief skeleton on every mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, []);

  const all = [...videos, ...schemes, ...docs];

  const filtered = React.useMemo(() => {
    return all.filter((item) => {
      if (typeFilter !== "all" && item.kind !== typeFilter) return false;
      if (tagFilter !== "all" && item.tag !== tagFilter) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [all, typeFilter, tagFilter, search]);

  const counts = {
    all: all.length,
    video: videos.length,
    scheme: schemes.length,
    doc: docs.length,
  };

  const typeOptions = [
    { id: "all", label: "All" },
    { id: "video", label: "Videos" },
    { id: "scheme", label: "Schemes" },
    { id: "doc", label: "Documents" },
  ];

  // Breadcrumb separator
  const sep = <span style={{ color: "var(--border-hover)", fontSize: 12, margin: "0 2px" }}>/</span>;

  return (
    <div>
      {/* Two-level breadcrumb: Content Library / Org Library / Browse All */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
        <button
          className="btn-ghost-h"
          style={{ ...olStyles.breadcrumb, marginBottom: 0 }}
          onClick={onNavigateLibrary}
        >
          Content Library
        </button>
        {sep}
        <button
          className="btn-ghost-h"
          style={{ ...olStyles.breadcrumb, marginBottom: 0 }}
          onClick={onBack}
        >
          Org Library
        </button>
        {sep}
        <span style={{ fontSize: 12, color: "var(--fg)", fontWeight: 500 }}>Browse All</span>
      </div>

      <div style={{ ...clStyles.header, marginBottom: 20 }}>
        <div>
          <div style={clStyles.title}>Browse All</div>
          <div style={clStyles.sub}>
            {ORG.name}'s complete library — {all.length} approved items across videos, schemes, and documents.
          </div>
        </div>
      </div>

      {/* Search + type filter */}
      <div style={{ ...browseStyles.filterBar, alignItems: "flex-start" }}>
        <div style={browseStyles.searchWrap}>
          <div style={browseStyles.searchIcon}>
            <Ic.search size={14} />
          </div>
          <input
            type="text"
            placeholder="Search by name or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="browse-search"
            style={browseStyles.searchInput}
          />
        </div>

        <div style={browseStyles.chipRow}>
          {typeOptions.map(({ id, label }) => (
            <TypeChip
              key={id}
              id={id}
              label={label}
              count={id === "all" ? counts.all : id === "video" ? counts.video : id === "scheme" ? counts.scheme : counts.doc}
              active={typeFilter === id}
              onClick={() => setTypeFilter(id)}
            />
          ))}
        </div>
      </div>

      {/* Results count + topic tags */}
      <div style={browseStyles.resultsLine}>
        <span style={browseStyles.resultsCount}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          {search.trim() ? ` for "${search.trim()}"` : ""}
        </span>
        <div style={browseStyles.tagChipRow}>
          {["all", ...TAGS].map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              active={tagFilter === tag}
              onClick={() => setTagFilter(tag)}
            />
          ))}
        </div>
      </div>

      {/* Skeleton or results */}
      {loading ? (
        <SkeletonRows count={10} />
      ) : filtered.length === 0 ? (
        <div style={clStyles.empty}>
          <div style={{ display: "grid", placeItems: "center", marginBottom: 12, color: "var(--border-hover)" }}>
            <Ic.inbox size={36} />
          </div>
          <div style={clStyles.emptyTitle}>No results</div>
          <div style={{ fontSize: 13 }}>Try a different search or clear the filters.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((item) => (
            <ContentRow
              key={item.id}
              item={item}
              mode="org-source"
              isAdded={addedIds.includes(item.id)}
              justChanged={item.id === justChangedId}
              onAdd={onAdd}
              onPreview={onPreview}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// Root
// ===========================================================================

function App() {
  const [route, setRoute] = React.useState("library");
  const [addedIds, setAddedIds] = React.useState(PRE_ADDED_ORG_IDS);
  const [justChangedId, setJustChangedId] = React.useState(null);
  const [ownItems] = React.useState(COACH_OWN_ITEMS);
  const [previewId, setPreviewId] = React.useState(null);
  const [browseAllDefaultType, setBrowseAllDefaultType] = React.useState("all");
  const [toast, setToast] = React.useState(null);
  const toastTimerRef = React.useRef(null);

  const addedOrgItems = ALL_ORG_CONTENT.filter((i) => addedIds.includes(i.id));
  const previewItem = previewId ? findOrgItem(previewId) : null;

  function dismissToast() {
    clearTimeout(toastTimerRef.current);
    setToast(null);
  }

  function flashChange(id) {
    setJustChangedId(id);
    setTimeout(() => setJustChangedId((cur) => (cur === id ? null : cur)), 900);
  }
  function handleAdd(id) {
    if (!addedIds.includes(id)) {
      setAddedIds((prev) => [...prev, id]);
      flashChange(id);
      const item = findOrgItem(id);
      if (item) {
        clearTimeout(toastTimerRef.current);
        setToast({ name: item.name, onDismiss: dismissToast });
        toastTimerRef.current = setTimeout(dismissToast, 5000);
      }
    }
  }
  function handleRemove(id) {
    setAddedIds(addedIds.filter((x) => x !== id));
  }
  function handlePreview(item) {
    if (!item) return;
    const isOrg = item.id.startsWith("org-") || item.id.startsWith("scheme-");
    if (!isOrg) return;
    setPreviewId(item.id);
  }
  function navigateBrowseAll(type) {
    setBrowseAllDefaultType(type || "all");
    setRoute("browse-all");
  }

  return (
    <React.Fragment>
      <Shell active={route} onNavigate={setRoute}>
        {route === "library" && (
          <ContentLibraryPage
            ownItems={ownItems}
            addedOrgItems={addedOrgItems}
            onNavigateOrg={() => setRoute("org-library")}
            justChangedId={justChangedId}
            onRemove={handleRemove}
            onPreview={handlePreview}
          />
        )}
        {route === "org-library" && (
          <OrgLibraryPage
            videos={ORG_VIDEOS}
            docs={ORG_DOCS}
            schemes={ORG_SCHEMES}
            addedIds={addedIds}
            onBack={() => setRoute("library")}
            onAdd={handleAdd}
            onPreview={handlePreview}
            justChangedId={justChangedId}
            onViewAll={navigateBrowseAll}
          />
        )}
        {route === "browse-all" && (
          <BrowseAllPage
            videos={ORG_VIDEOS}
            docs={ORG_DOCS}
            schemes={ORG_SCHEMES}
            addedIds={addedIds}
            onBack={() => setRoute("org-library")}
            onNavigateLibrary={() => setRoute("library")}
            onAdd={handleAdd}
            onPreview={handlePreview}
            justChangedId={justChangedId}
            defaultType={browseAllDefaultType}
          />
        )}
      </Shell>

      <PreviewPanel
        item={previewItem}
        isAdded={previewItem ? addedIds.includes(previewItem.id) : false}
        onClose={() => setPreviewId(null)}
        onAdd={(id) => { handleAdd(id); }}
      />

      <ToastNotification
        toast={toast}
        onNavigateLibrary={() => { setRoute("library"); dismissToast(); }}
      />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
