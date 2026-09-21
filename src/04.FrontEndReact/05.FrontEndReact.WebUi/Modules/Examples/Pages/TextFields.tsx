import { useState } from "react";
import { PageShell } from "../../../Common/Components/PageShell";
import { FieldDefault } from "../../../Common/Components/FieldDefault";

export function TextFields() {
  const [name, setName] = useState("Solution Template 2");
  const [code, setCode] = useState("ST2");
  return (
    <PageShell title="Text fields" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Text fields" }]}>
      <div className="max-w-md space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
        <FieldDefault label="Name" value={name} onChange={setName} required />
        <FieldDefault label="Code" value={code} onChange={setCode} required />
        <FieldDefault label="Read only" value="Tidak bisa diubah" onChange={() => undefined} readOnly />
      </div>
    </PageShell>
  );
}
