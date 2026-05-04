// App entry — handles routing between Content Library + Org Library,
// add/remove state, preview panel, and renders content affordances.

const { Ic, Shell, StatCard, Tabs, clStyles, olStyles, FieldDiagram, PreviewPanel } = window;
const { ORG, COACH_OWN_ITEMS, ORG_ITEMS, ORG_SCHEMES, PRE_ADDED_ORG_IDS } = window.SEED;

// Combined list of all org-library content (videos, docs, schemes).
const ALL_ORG_CONTENT = [...ORG_ITEMS, ...ORG_SCHEMES];
function findOrgItem(id) { return ALL_ORG_CONTENT.find((i) => i.id === id); }

// ---------------------------------------------------------------------------
// CSS — hover states, transitions, button hover.
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
// Row component — used for documents.
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
  if (mode === "org-source") return `${kind}${dur} · Added to org ${item.addedToOrg}`;
  if (mode === "org-added")  return `${kind}${dur} · From org library · Not yet published`;
  return item.meta;
}

function ContentRow({ item, mode, isAdded, justChanged, onAdd, onRemove, onPreview }) {
  const isVideo  = item.kind === "video";
  const isScheme = item.kind === "scheme";
  // In the org library, drop per-row org badges (the page-level context strip
  // makes it clear). In the personal library, always show the badge.
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
// Video card — hero treatment with thumbnail placeholder + duration chip.
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
        <div style={videoStyles.metaRow}>Added to org {item.addedToOrg}</div>
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
// Carousel
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

function Carousel({ title, items, addedIds, justChangedId, onAdd, onPreview, CardComp }) {
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
    background: "linear-gradient(0deg, var(--brand-bg) 0%, #EAFCB5 100%)",
    border: "1px solid var(--brand-border)",
    borderRadius: "var(--r-lg)",
    padding: "14px 18px",
    display: "flex", alignItems: "center", gap: 14,
    marginBottom: 24,
  },
  contextIcon: {
    width: 38, height: 38, borderRadius: "var(--r-md)",
    background: "#FFFFFF99",
    border: "1px solid var(--brand-border)",
    display: "grid", placeItems: "center",
    color: "var(--brand-text)",
    flexShrink: 0,
  },
  contextText: { flex: 1, color: "var(--brand-text)" },
  contextTitle: { fontSize: 14, fontWeight: 500 },
  contextSub: { fontSize: 12, opacity: 0.85, marginTop: 2 },
  countPill: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "#FFFFFFCC", border: "1px solid var(--brand-border)",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 12, fontWeight: 500,
    color: "var(--brand-text)",
  },
  sectionGap: { marginBottom: 32 },
  docsHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 10,
  },
  docsTitle: {
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

function OrgLibraryPage({ orgItems, schemes, addedIds, onBack, onAdd, onPreview, justChangedId }) {
  const videos = orgItems.filter((i) => i.kind === "video");
  const docs = orgItems.filter((i) => i.kind === "doc");
  const total = videos.length + schemes.length + docs.length;

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

      <div style={orgPageStyles.contextStrip}>
        <div style={orgPageStyles.contextIcon}>
          <Ic.building size={18} />
        </div>
        <div style={orgPageStyles.contextText}>
          <div style={orgPageStyles.contextTitle}>Browsing {ORG.name}'s shared library</div>
          <div style={orgPageStyles.contextSub}>
            All content here is published by your organization and is read-only.
          </div>
        </div>
        <div style={orgPageStyles.countPill}>
          <Ic.check size={11} /> {total} approved item{total === 1 ? "" : "s"}
        </div>
      </div>

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
          />
        </div>
      )}

      {docs.length > 0 && (
        <div>
          <div style={orgPageStyles.docsHeader}>
            <div style={orgPageStyles.docsTitle}>
              Documents <span style={orgPageStyles.count}>{docs.length}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {docs.map((item) => (
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
// Root
// ===========================================================================

function App() {
  const [route, setRoute] = React.useState("library");
  const [addedIds, setAddedIds] = React.useState(PRE_ADDED_ORG_IDS);
  const [justChangedId, setJustChangedId] = React.useState(null);
  const [ownItems] = React.useState(COACH_OWN_ITEMS);
  const [previewId, setPreviewId] = React.useState(null);

  const addedOrgItems = ALL_ORG_CONTENT.filter((i) => addedIds.includes(i.id));
  const previewItem = previewId ? findOrgItem(previewId) : null;

  function flashChange(id) {
    setJustChangedId(id);
    setTimeout(() => setJustChangedId((cur) => (cur === id ? null : cur)), 900);
  }
  function handleAdd(id) {
    if (!addedIds.includes(id)) {
      setAddedIds([...addedIds, id]);
      flashChange(id);
    }
  }
  function handleRemove(id) {
    setAddedIds(addedIds.filter((x) => x !== id));
  }
  function handlePreview(item) {
    // Only org items get a preview
    if (!item || (!item.id.startsWith("org-") && !item.id.startsWith("scheme-"))) return;
    setPreviewId(item.id);
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
            orgItems={ORG_ITEMS}
            schemes={ORG_SCHEMES}
            addedIds={addedIds}
            onBack={() => setRoute("library")}
            onAdd={handleAdd}
            onPreview={handlePreview}
            justChangedId={justChangedId}
          />
        )}
      </Shell>

      <PreviewPanel
        item={previewItem}
        isAdded={previewItem ? addedIds.includes(previewItem.id) : false}
        onClose={() => setPreviewId(null)}
        onAdd={(id) => { handleAdd(id); }}
      />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
