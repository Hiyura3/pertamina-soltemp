import { PageShell } from "../../../Common/Components/PageShell";
import { Icon } from "../../../Common/Components/Pacer/Icon";

// Daftar ini sama dengan set ikon di pacer-ui-docs/wwwroot/docs/icons.
const outlineNames = [
  "accessible", "arrow-back", "arrow-back-close", "arrow-down", "arrow-forward", "arrow-forward-close",
  "arrow-incoming", "arrow-outgoing", "arrow-up", "attachment", "bell", "bolt",
  "book", "button", "calendar", "chat-bubble", "check", "check-circle",
  "checkmark-14-point-star", "checkmark-shield", "chevron-down", "chevron-left", "chevron-right", "chevron-up",
  "clock", "column-collapse", "column-expand", "component", "copy", "cross",
  "cross-circle", "cursor", "database", "desktop", "direction", "doc-file",
  "document", "document-add", "document-filled", "document-minus", "download", "drop-arrow-down",
  "duplicate", "edit", "email", "excel-file", "expand", "eye-hide",
  "eye-show", "filter", "filter-ascending", "filter-descending", "flag", "folder",
  "folder-minus", "folder-plus", "forms", "forms-field", "gallery", "globe",
  "gov", "gov-my", "grid", "hamburger-menu", "heart", "home",
  "image-slider", "info", "link", "list", "lock", "lock-2",
  "logout", "map", "megaphone", "minus", "minus-circle", "mobile",
  "money", "moon", "options", "options-vertical", "org-chart", "pause",
  "pdf-file", "phone", "pin", "placeholder", "play", "plus",
  "plus-circle", "printer", "qr-code", "question-circle", "redo", "reload",
  "search", "section", "setting", "share", "star", "sun",
  "swap", "table", "tablet", "text", "thumbs-down", "thumbs-up",
  "trash", "trophy", "undo", "upload", "user", "user-group",
  "video", "warning", "warning-circle", "warning-diamond", "zoom-in", "zoom-out",
];

const genericNames = [
  "bell", "building", "chart-bar", "clipboard", "folder-kanban", "layout-dashboard",
  "layout-grid", "panel-left", "pencil", "settings", "user-round",
];

function IconGrid({ names, set }: { names: string[]; set: "outline" | "generic" }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {names.map((name) => (
        <div
          key={`${set}-${name}`}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-primary shadow-sm"
        >
          <Icon name={name} set={set} size={22} />
          <span className="text-[12px] leading-4 text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  );
}

export function Icons() {
  return (
    <PageShell title="Icons" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Icons" }]}>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {outlineNames.length} ikon outline dan {genericNames.length} ikon generic, disalin apa adanya dari Pacer. Ikon
          mewarisi warna teks lewat mask, kecuali pdf/doc/excel yang tetap berwarna merek.
        </p>
        <IconGrid names={outlineNames} set="outline" />
        <IconGrid names={genericNames} set="generic" />
      </div>
    </PageShell>
  );
}
