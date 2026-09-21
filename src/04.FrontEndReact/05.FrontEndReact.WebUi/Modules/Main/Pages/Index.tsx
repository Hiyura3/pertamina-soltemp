import { Link } from "react-router-dom";
import { PageShell } from "../../../Common/Components/PageShell";
import { Icon } from "../../../Common/Components/Pacer/Icon";
import { MasterDataCountriesRouteFor } from "../../MasterData/Features/Countries/Statics/RouteFor";
import { AdministrationRouteFor } from "../../Administration/Statics/RouteFor";
import { ExamplesRouteFor } from "../../Examples/Statics/RouteFor";
import { getSession } from "../../../Common/Services/Session";
import { appConfigFrontEndOptions } from "@services/AppConfigFrontEnd/AppConfigFrontEndOptions";

export function Index() {
  const session = getSession();
  return (
    <PageShell title="Home">
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-7 text-white shadow-card md:px-8 md:py-9">
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85">
              <span className="h-2 w-2 rounded-full bg-pertamina-green" /> Pacer template
            </div>
            <h1 className="font-heading text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
              {appConfigFrontEndOptions.appFullName}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
              Halo {session?.name}. Skin React sudah memakai Pacer. Ganti UI ke Blazor lewat <code className="text-white">frontend.settings.json</code>.
            </p>
          </div>
        </section>
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <DashCard to={MasterDataCountriesRouteFor.Index} icon="globe" title="Countries" description="CRUD master data sampling" />
          <DashCard to={AdministrationRouteFor.Configurations} icon="setting" title="Administration" description="Config, audit, API calls" />
          <DashCard to={ExamplesRouteFor.Buttons} icon="component" title="Pacer examples" description="Button, type, colour, table" />
          <DashCard to="/About" icon="info" title="About" description="Tentang solution template" />
        </section>
      </div>
    </PageShell>
  );
}

function DashCard({ to, icon, title, description }: { to: string; icon: string; title: string; description: string }) {
  return (
    <Link to={to} className="rounded-xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon name={icon} size={18} />
      </div>
      <h2 className="font-heading text-sm font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
