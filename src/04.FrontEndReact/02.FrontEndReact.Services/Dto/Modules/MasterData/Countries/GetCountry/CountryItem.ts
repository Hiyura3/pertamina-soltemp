export type AuditItem = { action: string; created: string; createdBy: string };
export type CountryItem = {
  id: string;
  created: string;
  createdBy: string;
  modified: string | null;
  modifiedBy: string | null;
  name: string;
  code: string;
  audits: AuditItem[];
};
