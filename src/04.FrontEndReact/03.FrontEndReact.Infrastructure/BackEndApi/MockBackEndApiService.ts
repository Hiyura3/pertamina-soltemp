import type { IBackEndApiService, RestRequest } from "@services/BackEndApi/IBackEndApiService";
import { beginRequest } from "./RequestActivity";

type Country = {
  id: string;
  name: string;
  code: string;
  created: string;
  createdBy: string;
  modified: string | null;
  modifiedBy: string | null;
};

const now = () => new Date().toISOString();

const countries: Country[] = [
  { id: "c-id", name: "Indonesia", code: "ID", created: now(), createdBy: "seed", modified: null, modifiedBy: null },
  { id: "c-sg", name: "Singapore", code: "SG", created: now(), createdBy: "seed", modified: null, modifiedBy: null },
  { id: "c-my", name: "Malaysia", code: "MY", created: now(), createdBy: "seed", modified: null, modifiedBy: null },
  { id: "c-jp", name: "Japan", code: "JP", created: now(), createdBy: "seed", modified: null, modifiedBy: null },
];

const configurations = [
  { id: "cfg-1", key: "App.Timezone", value: "Asia/Jakarta" },
  { id: "cfg-2", key: "App.PageSize", value: "20" },
];

const audits = [
  { id: "a-1", tableName: "Countries", action: "Create", created: now(), createdBy: "Administrator" },
  { id: "a-2", tableName: "Configurations", action: "Update", created: now(), createdBy: "Administrator" },
];

const apiCalls = [
  { id: "api-1", method: "GET", path: "/MasterData/Countries", statusCode: 200, created: now() },
  { id: "api-2", method: "POST", path: "/MasterData/Countries", statusCode: 201, created: now() },
];

function delay() {
  return new Promise((resolve) => window.setTimeout(resolve, 180));
}

export class MockBackEndApiService implements IBackEndApiService {
  async sendRequest(restRequest: RestRequest): Promise<void> {
    await this.sendRequestAsync(restRequest);
  }

  async sendRequestAsync<T>(restRequest: RestRequest): Promise<T> {
    const finish = beginRequest();
    try {
      await delay();
      const uri = restRequest.resourceUri.replace(/\/+$/, "");
      const method = restRequest.method;
      const body = (restRequest.body ?? {}) as Record<string, string>;
      const id = String(restRequest.query?.id ?? "");

      if (uri.endsWith("/MasterData/Countries") && method === "GET") {
        return { items: countries.map(({ id: cid, name, code }) => ({ id: cid, name, code })) } as T;
      }
      if (uri.endsWith("/MasterData/Countries/Get") && method === "GET") {
        const item = countries.find((country) => country.id === id);
        if (!item) throw new Error("Country not found");
        return {
          item: {
            ...item,
            audits: [{ action: "Create", created: item.created, createdBy: item.createdBy }],
          },
        } as T;
      }
      if (uri.endsWith("/MasterData/Countries") && method === "POST") {
        countries.unshift({
          id: `c-${crypto.randomUUID().slice(0, 8)}`,
          name: body.name,
          code: body.code,
          created: now(),
          createdBy: "Administrator",
          modified: null,
          modifiedBy: null,
        });
        return {} as T;
      }
      if (uri.endsWith("/MasterData/Countries") && method === "PATCH") {
        const item = countries.find((country) => country.id === body.id);
        if (item) {
          item.name = body.name;
          item.code = body.code;
          item.modified = now();
          item.modifiedBy = "Administrator";
        }
        return {} as T;
      }
      if (uri.endsWith("/MasterData/Countries") && method === "DELETE") {
        const index = countries.findIndex((country) => country.id === id);
        if (index >= 0) countries.splice(index, 1);
        return {} as T;
      }
      if (uri.endsWith("/Administration/Configurations") && method === "GET") {
        return { items: configurations } as T;
      }
      if (uri.endsWith("/Administration/Audits") && method === "GET") {
        return { items: audits } as T;
      }
      if (uri.endsWith("/Administration/ApiCalls") && method === "GET") {
        return { items: apiCalls } as T;
      }

      throw new Error(`Mock API has no handler for ${method} ${uri}`);
    } finally {
      finish();
    }
  }
}
