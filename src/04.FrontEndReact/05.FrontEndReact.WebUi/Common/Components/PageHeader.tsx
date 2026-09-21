export function PageHeader({ title, entityType }: { title: string; entityType?: string }) {
  return (
    <div className="space-y-0.5">
      {entityType ? <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{entityType}</p> : null}
      <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
    </div>
  );
}
