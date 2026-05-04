// Slide-over preview panel. Opened by clicking a row/card in the org library.
// Renders the appropriate preview body for each content type and includes the
// Add to my library / Added action inline. For documents, renders a long
// scrollable mock document with realistic structure (headings, paragraphs,
// lists, quotes) plus a page-count and word-count chip.

const previewStyles = {
  scrim: {
    position: "fixed", inset: 0,
    background: "#10100E66",
    backdropFilter: "blur(2px)",
    zIndex: 40,
    opacity: 0,
    transition: "opacity 180ms",
    pointerEvents: "none",
  },
  scrimOpen: { opacity: 1, pointerEvents: "auto" },

  panel: {
    position: "fixed", top: 0, right: 0, bottom: 0,
    background: "var(--card)",
    borderLeft: "1px solid var(--border)",
    boxShadow: "-12px 0 32px -8px #2725201F",
    zIndex: 41,
    transform: "translateX(100%)",
    transition: "transform 240ms cubic-bezier(.2,.8,.2,1)",
    display: "flex",
    flexDirection: "column",
  },
  panelOpen: { transform: "translateX(0)" },
  // Wider panel for documents so they read like a real document reader.
  panelDoc: { width: "min(820px, 96vw)" },
  panelMedia: { width: "min(560px, 92vw)" },

  header: {
    padding: "16px 20px",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    flexShrink: 0,
  },
  eyebrow: {
    fontSize: 11, fontWeight: 600, color: "var(--muted)",
    letterSpacing: "0.06em", textTransform: "uppercase",
    display: "flex", alignItems: "center", gap: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 18, fontWeight: 500, color: "var(--fg)",
    letterSpacing: "-0.01em", lineHeight: 1.3,
  },
  closeBtn: {
    width: 32, height: 32, borderRadius: "var(--r-sm)",
    border: "1px solid var(--border)", background: "var(--card)",
    color: "var(--muted)",
    display: "grid", placeItems: "center", cursor: "pointer",
    flexShrink: 0,
  },

  body: {
    padding: "18px 20px 20px",
    overflowY: "auto",
    flex: 1,
  },

  // Video preview
  videoMedia: {
    aspectRatio: "16 / 9",
    background: "repeating-linear-gradient(135deg, #2725200A 0 8px, transparent 8px 16px), var(--info-bg)",
    color: "var(--info-text)",
    borderRadius: "var(--r-md)",
    border: "1px solid var(--border)",
    display: "grid", placeItems: "center",
    position: "relative",
    overflow: "hidden",
    marginBottom: 16,
  },
  playBubble: {
    width: 56, height: 56, borderRadius: 28,
    background: "#FFFFFFE6",
    display: "grid", placeItems: "center",
    color: "var(--fg)",
    boxShadow: "0 6px 18px -4px #00000033",
  },
  duration: {
    position: "absolute",
    right: 12, bottom: 12,
    background: "#10100ECC", color: "#fff",
    fontSize: 12, fontWeight: 500,
    padding: "3px 8px", borderRadius: 4,
  },

  // Scheme preview
  schemeMedia: {
    borderRadius: "var(--r-md)",
    overflow: "hidden",
    border: "1px solid var(--border)",
    marginBottom: 16,
  },

  // Document preview — toolbar + paged reader
  docToolbar: {
    display: "flex", alignItems: "center", gap: 10,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r-md) var(--r-md) 0 0",
    borderBottom: "none",
    padding: "8px 12px",
    fontSize: 12, color: "var(--muted)",
  },
  docToolbarChip: {
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "2px 8px",
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 999,
    fontSize: 11, color: "var(--muted)",
  },
  docReader: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "0 0 var(--r-md) var(--r-md)",
    padding: "20px 20px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginBottom: 16,
  },
  docPage: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--r-sm)",
    padding: "32px 40px",
    boxShadow: "0 1px 2px 0 #2725200F",
    position: "relative",
  },
  docPageNum: {
    position: "absolute",
    bottom: 10, right: 14,
    fontSize: 10, color: "var(--muted)",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.04em",
  },
  docHeading: {
    fontSize: 22, fontWeight: 500, color: "var(--fg)",
    letterSpacing: "-0.01em", lineHeight: 1.25,
    marginBottom: 14,
  },
  docH2: {
    fontSize: 16, fontWeight: 500, color: "var(--fg)",
    marginTop: 18, marginBottom: 8,
  },
  docH3: {
    fontSize: 13.5, fontWeight: 500, color: "var(--fg)",
    marginTop: 14, marginBottom: 6,
  },
  docP: {
    fontSize: 13.5, lineHeight: 1.65, color: "var(--fg)",
    marginBottom: 10,
  },
  docList: {
    fontSize: 13.5, lineHeight: 1.65, color: "var(--fg)",
    marginLeft: 18, marginBottom: 10,
  },
  docQuote: {
    borderLeft: "3px solid var(--brand-border)",
    background: "var(--brand-bg)",
    color: "var(--brand-text)",
    padding: "10px 14px",
    fontSize: 13.5, fontStyle: "italic",
    lineHeight: 1.55,
    margin: "12px 0",
    borderRadius: "0 var(--r-sm) var(--r-sm) 0",
  },
  docDivider: {
    height: 1, background: "var(--border)",
    margin: "12px 0",
  },
  docFade: {
    height: 64,
    background: "linear-gradient(0deg, var(--surface) 0%, transparent 100%)",
    marginTop: -56,
    pointerEvents: "none",
  },

  // Common metadata + description
  fieldKv: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    rowGap: 8,
    columnGap: 16,
    fontSize: 13,
    marginBottom: 16,
  },
  fieldKey: { color: "var(--muted)" },
  fieldVal: { color: "var(--fg)" },

  description: {
    fontSize: 14, lineHeight: 1.55, color: "var(--fg)",
    marginBottom: 16,
  },

  actionBar: {
    padding: "16px 20px",
    borderTop: "1px solid var(--border)",
    background: "var(--card)",
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
    flexShrink: 0,
  },
};

// Distribute blocks across N pages so the reader shows multiple paged sheets.
function paginateBlocks(blocks, pageCount) {
  if (!blocks.length) return [];
  // We don't have real pagination; just split blocks evenly into N pages.
  const pages = [];
  const target = Math.ceil(blocks.length / Math.max(1, pageCount));
  for (let i = 0; i < pageCount; i++) {
    const slice = blocks.slice(i * target, (i + 1) * target);
    if (slice.length) pages.push(slice);
  }
  // If we ran out of blocks before reaching pageCount, just return what we have.
  return pages;
}

function renderBlock(block, idx) {
  switch (block.type) {
    case "heading": return <div key={idx} style={previewStyles.docHeading}>{block.text}</div>;
    case "h2":      return <div key={idx} style={previewStyles.docH2}>{block.text}</div>;
    case "h3":      return <div key={idx} style={previewStyles.docH3}>{block.text}</div>;
    case "p":       return <p key={idx} style={previewStyles.docP}>{block.text}</p>;
    case "list":    return (
      <ul key={idx} style={previewStyles.docList}>
        {block.items.map((it, j) => <li key={j} style={{ marginBottom: 4 }}>{it}</li>)}
      </ul>
    );
    case "quote":   return <div key={idx} style={previewStyles.docQuote}>{block.text}</div>;
    case "divider": return <div key={idx} style={previewStyles.docDivider} />;
    default:        return null;
  }
}

function DocReader({ body }) {
  // Take pageCount from body; pad blocks across pages.
  const pages = paginateBlocks(body.blocks, body.pageCount || 1);
  return (
    <React.Fragment>
      <div style={previewStyles.docToolbar}>
        <span style={previewStyles.docToolbarChip}>
          <Ic.doc size={11} /> {body.fileType || "PDF"}
        </span>
        <span style={previewStyles.docToolbarChip}>
          {body.pageCount} pages
        </span>
        <span style={previewStyles.docToolbarChip}>
          ~{body.wordCount.toLocaleString()} words
        </span>
        {body.fileSize && (
          <span style={{ ...previewStyles.docToolbarChip, marginLeft: "auto" }}>
            {body.fileSize}
          </span>
        )}
      </div>
      <div style={previewStyles.docReader}>
        {pages.map((blocks, i) => (
          <div key={i} style={previewStyles.docPage}>
            {blocks.map(renderBlock)}
            <div style={previewStyles.docPageNum}>{i + 1} / {body.pageCount}</div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

function PreviewPanel({ item, isAdded, onClose, onAdd }) {
  const open = !!item;

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const kindLabel = item ? (
    item.kind === "video" ? "Video" :
    item.kind === "scheme" ? "Scheme / Formation" :
    "Document"
  ) : "";

  const isDoc = item && item.kind === "doc";
  const docBody = isDoc
    ? (window.SEED.DOC_BODY_MAP[item.id] || window.SEED.DEFAULT_DOC_BODY)
    : null;

  return (
    <React.Fragment>
      <div
        style={{ ...previewStyles.scrim, ...(open ? previewStyles.scrimOpen : {}) }}
        onClick={onClose}
      />
      <aside
        style={{
          ...previewStyles.panel,
          ...(isDoc ? previewStyles.panelDoc : previewStyles.panelMedia),
          ...(open ? previewStyles.panelOpen : {}),
        }}
        aria-hidden={!open}
      >
        {item && (
          <React.Fragment>
            <div style={previewStyles.header}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={previewStyles.eyebrow}>
                  <Ic.eye size={12} /> Preview · {kindLabel}
                </div>
                <div style={previewStyles.title}>{item.name}</div>
              </div>
              <button style={previewStyles.closeBtn} onClick={onClose} aria-label="Close preview">
                <Ic.close size={14} />
              </button>
            </div>

            <div style={previewStyles.body}>
              {item.kind === "video" && (
                <div style={previewStyles.videoMedia}>
                  <div style={previewStyles.playBubble}><Ic.play size={20} /></div>
                  {item.duration && <div style={previewStyles.duration}>{item.duration}</div>}
                </div>
              )}
              {item.kind === "scheme" && (
                <div style={previewStyles.schemeMedia}>
                  <FieldDiagram marks={item.marks} ratio="16 / 9" />
                </div>
              )}
              {isDoc && <DocReader body={docBody} />}

              <div style={previewStyles.description}>{item.description}</div>

              <div style={previewStyles.fieldKv}>
                <div style={previewStyles.fieldKey}>Type</div>
                <div style={previewStyles.fieldVal}>{kindLabel}</div>
                {item.duration && (
                  <React.Fragment>
                    <div style={previewStyles.fieldKey}>Duration</div>
                    <div style={previewStyles.fieldVal}>{item.duration}</div>
                  </React.Fragment>
                )}
                {isDoc && (
                  <React.Fragment>
                    <div style={previewStyles.fieldKey}>Pages</div>
                    <div style={previewStyles.fieldVal}>
                      {docBody.pageCount} · ~{docBody.wordCount.toLocaleString()} words
                    </div>
                    <div style={previewStyles.fieldKey}>File</div>
                    <div style={previewStyles.fieldVal}>
                      {docBody.fileType}{docBody.fileSize ? ` · ${docBody.fileSize}` : ""}
                    </div>
                  </React.Fragment>
                )}
                {item.tag && (
                  <React.Fragment>
                    <div style={previewStyles.fieldKey}>Topic</div>
                    <div style={previewStyles.fieldVal}>{item.tag}</div>
                  </React.Fragment>
                )}
                <div style={previewStyles.fieldKey}>Source</div>
                <div style={previewStyles.fieldVal}>{window.SEED.ORG.name} Org Library</div>
                <div style={previewStyles.fieldKey}>Added</div>
                <div style={previewStyles.fieldVal}>{item.addedToOrg}</div>
                <div style={previewStyles.fieldKey}>Permissions</div>
                <div style={previewStyles.fieldVal}>Read-only · provided by your org</div>
              </div>
            </div>

            <div style={previewStyles.actionBar}>
              <button
                className="btn-ghost-h"
                style={{
                  background: "transparent",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-md)",
                  padding: "8px 14px",
                  fontSize: 13, fontWeight: 500,
                }}
                onClick={onClose}
              >
                Close
              </button>
              {isAdded ? (
                <button
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "var(--success-bg)",
                    color: "var(--success-text)",
                    border: "1px solid var(--success-border)",
                    borderRadius: "var(--r-md)",
                    padding: "8px 14px",
                    fontSize: 13, fontWeight: 500,
                    cursor: "default",
                  }}
                >
                  <Ic.check size={12} /> Added to your library
                </button>
              ) : (
                <button
                  className="btn-primary-h"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "var(--primary-bg)",
                    color: "var(--primary-text)",
                    border: "1px solid var(--primary-border)",
                    borderRadius: "var(--r-md)",
                    padding: "8px 14px",
                    fontSize: 13, fontWeight: 500,
                    boxShadow: "var(--shadow-sm)",
                  }}
                  onClick={() => onAdd(item.id)}
                >
                  <Ic.plus size={11} /> Add to my library
                </button>
              )}
            </div>
          </React.Fragment>
        )}
      </aside>
    </React.Fragment>
  );
}

window.PreviewPanel = PreviewPanel;
