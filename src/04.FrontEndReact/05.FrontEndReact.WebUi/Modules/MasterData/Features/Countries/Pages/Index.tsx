import { useEffect, useMemo, useState } from "react";
import { PageShell } from "../../../../../Common/Components/PageShell";
import { ButtonAdd } from "../../../../../Common/Components/ButtonAdd";
import { ButtonDetails } from "../../../../../Common/Components/ButtonDetails";
import { ButtonEdit } from "../../../../../Common/Components/ButtonEdit";
import { ButtonDelete } from "../../../../../Common/Components/ButtonDelete";
import { TextFieldSearch } from "../../../../../Common/Components/TextFieldSearch";
import { EntityTable } from "../../../../../Common/Components/EntityTable";
import { CommonDisplayTextFor } from "../../../../../Common/Statics/DisplayTextFor";
import { Dialog } from "../../../../../Common/Components/Dialog";
import { FieldDefault } from "../../../../../Common/Components/FieldDefault";
import { ConfirmDialog } from "../../../../../Common/Components/ConfirmDialog";
import { sendGetCountriesQuery } from "@logics/Modules/MasterData/Countries/GetCountries/GetCountriesQuery";
import { sendGetCountryQuery } from "@logics/Modules/MasterData/Countries/GetCountry/GetCountryQuery";
import { sendAddCountryCommand } from "@logics/Modules/MasterData/Countries/AddCountry/AddCountryCommand";
import { sendUpdateCountryCommand } from "@logics/Modules/MasterData/Countries/UpdateCountry/UpdateCountryCommand";
import { sendDeleteCountryCommand } from "@logics/Modules/MasterData/Countries/DeleteCountry/DeleteCountryCommand";
import type { CountryItem } from "@services/Dto/Modules/MasterData/Countries/GetCountries/CountryItem";
import type { CountryItem as CountryDetails } from "@services/Dto/Modules/MasterData/Countries/GetCountry/CountryItem";
import { DisplayTextFor as CountriesDisplayTextFor } from "@services/Statics/Countries/DisplayTextFor";
import { hasPermission } from "../../../../../Common/Services/Session";
import { Permissions } from "../../../../../Common/Services/Permissions";

export function Index() {
  const canWrite = hasPermission(Permissions.countriesWrite);
  const [items, setItems] = useState<CountryItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exception, setException] = useState<Error | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "details" | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftCode, setDraftCode] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [details, setDetails] = useState<CountryDetails | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function loadItems() {
    try {
      setIsLoading(true);
      setException(null);
      const response = await sendGetCountriesQuery();
      setItems(response.items);
    } catch (caught) {
      setException(caught instanceof Error ? caught : new Error("Load failed"));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  const filtered = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) => `${item.name} ${item.code}`.toLowerCase().includes(keyword));
  }, [items, searchKeyword]);

  async function openDetails(id: string) {
    const response = await sendGetCountryQuery({ countryId: id });
    setDetails(response.item);
    setMode("details");
  }

  async function save() {
    if (mode === "add") {
      await sendAddCountryCommand({ name: draftName, code: draftCode });
    } else if (mode === "edit" && editingId) {
      await sendUpdateCountryCommand({ id: editingId, name: draftName, code: draftCode });
    }
    setMode(null);
    await loadItems();
  }

  return (
    <PageShell
      title={CountriesDisplayTextFor.Countries}
      breadcrumbs={[{ label: CommonDisplayTextFor.Home, href: "/" }, { label: CountriesDisplayTextFor.Countries }]}
      exception={exception}
      loading={isLoading}
      actions={
        <>
          <TextFieldSearch value={searchKeyword} onChange={setSearchKeyword} />
          {canWrite ? (
            <ButtonAdd
              entityType={CountriesDisplayTextFor.Country}
              onClick={() => {
                setDraftName("");
                setDraftCode("");
                setMode("add");
              }}
            />
          ) : null}
        </>
      }
    >
      <EntityTable headers={["Code", "Name", "Action"]} loading={isLoading} empty={filtered.length === 0} colSpan={3}>
        {filtered.map((item) => (
          <tr key={item.id} className="border-t border-border">
            <td className="px-3 py-2 font-medium">{item.code}</td>
            <td className="px-3 py-2">{item.name}</td>
            <td className="px-3 py-2 text-center">
              <div className="flex justify-center gap-1">
                <ButtonDetails onClick={() => void openDetails(item.id)} />
                {canWrite ? (
                  <>
                    <ButtonEdit
                      onClick={() => {
                        setEditingId(item.id);
                        setDraftName(item.name);
                        setDraftCode(item.code);
                        setMode("edit");
                      }}
                    />
                    <ButtonDelete onClick={() => setDeleteId(item.id)} />
                  </>
                ) : null}
              </div>
            </td>
          </tr>
        ))}
      </EntityTable>

      <Dialog
        open={mode === "add" || mode === "edit"}
        title={`${mode === "add" ? CommonDisplayTextFor.Add : CommonDisplayTextFor.Edit} ${CountriesDisplayTextFor.Country}`}
        onClose={() => setMode(null)}
        footer={
          <>
            <button type="button" className="rounded-md border px-3 py-2 text-sm" onClick={() => setMode(null)}>
              {CommonDisplayTextFor.Cancel}
            </button>
            <button type="button" className="rounded-md bg-primary px-3 py-2 text-sm text-white" onClick={() => void save()}>
              {CommonDisplayTextFor.Save}
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <FieldDefault label={CommonDisplayTextFor.Code} value={draftCode} onChange={setDraftCode} required />
          <FieldDefault label={CommonDisplayTextFor.Name} value={draftName} onChange={setDraftName} required />
        </div>
      </Dialog>

      <Dialog open={mode === "details"} title={`${CountriesDisplayTextFor.Country} details`} onClose={() => setMode(null)}>
        {details ? (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <dt className="text-muted-foreground">Code</dt><dd>{details.code}</dd>
            <dt className="text-muted-foreground">Name</dt><dd>{details.name}</dd>
            <dt className="text-muted-foreground">Created</dt><dd>{details.created}</dd>
            <dt className="text-muted-foreground">Created by</dt><dd>{details.createdBy}</dd>
          </dl>
        ) : null}
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleteId)}
        title={`Delete ${CountriesDisplayTextFor.Country}`}
        message="Hapus country ini dari sampling data?"
        danger
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (deleteId) await sendDeleteCountryCommand({ id: deleteId });
          setDeleteId(null);
          await loadItems();
        }}
      />
    </PageShell>
  );
}
