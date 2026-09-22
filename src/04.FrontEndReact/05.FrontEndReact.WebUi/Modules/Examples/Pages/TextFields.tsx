import { useState } from "react";
import { PageShell } from "../../../Common/Components/PageShell";
import { CheckField, FieldDefault, SelectDefault, TextFieldAutoGrow } from "../../../Common/Components/FieldDefault";
import { PacerSelect } from "../../../Common/Components/Pacer/Select";

export function TextFields() {
  const [name, setName] = useState("Solution Template 2");
  const [code, setCode] = useState("ST2");
  const [notes, setNotes] = useState("");
  const [type, setType] = useState("web");
  const [agree, setAgree] = useState(true);
  return (
    <PageShell title="Text fields" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Text fields" }]}>
      <div className="max-w-md space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
        <FieldDefault label="Name" value={name} onChange={setName} required />
        <FieldDefault label="Code" value={code} onChange={setCode} required />
        <FieldDefault label="Small" value={code} onChange={setCode} size="small" />
        <FieldDefault label="Read only" value="Tidak bisa diubah" onChange={() => undefined} readOnly />
        <FieldDefault label="Disabled" value="Tidak bisa diubah" onChange={() => undefined} disabled />
        <SelectDefault
          label="Type"
          value={type}
          onChange={setType}
          options={[
            { id: "web", name: "Web" },
            { id: "mobile", name: "Mobile" },
          ]}
        />
        <SelectDefault
          label="Disabled select"
          value={type}
          onChange={setType}
          options={[{ id: "web", name: "Web" }]}
          disabled
        />
        <TextFieldAutoGrow label="Notes" value={notes} onChange={setNotes} />
        <div className="space-y-1">
          <span className="block text-[14px] leading-5 text-muted-foreground">Pacer dropdown</span>
          <PacerSelect
            value={type}
            onChange={setType}
            options={[
              { id: "web", name: "Web" },
              { id: "mobile", name: "Mobile" },
            ]}
          />
        </div>
        <div className="space-y-1">
          <span className="block text-[14px] leading-5 text-muted-foreground">Disabled dropdown</span>
          <PacerSelect
            value={type}
            onChange={setType}
            options={[{ id: "web", name: "Web" }]}
            disabled
          />
        </div>
        <CheckField label="Aktif" checked={agree} onChange={setAgree} />
        <CheckField label="Disabled" checked={agree} onChange={setAgree} disabled />
      </div>
    </PageShell>
  );
}
