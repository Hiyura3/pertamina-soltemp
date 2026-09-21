import type { IBackEndApiService, RestRequest } from "@services/BackEndApi/IBackEndApiService";
import { clearAccessToken, getAccessToken } from "../Authentication/TokenStore";
import { beginRequest } from "./RequestActivity";

export class BackEndApiService implements IBackEndApiService {
  constructor(private readonly baseUrl: string) {}

  async sendRequest(restRequest: RestRequest, cancellationToken?: AbortSignal): Promise<void> {
    await this.execute(restRequest, cancellationToken);
  }

  async sendRequestAsync<T>(restRequest: RestRequest, cancellationToken?: AbortSignal): Promise<T> {
    const response = await this.execute(restRequest, cancellationToken);

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      throw new Error(
        `API ${restRequest.method} ${restRequest.resourceUri} returned ${contentType || "an unknown content type"} instead of JSON`,
      );
    }

    return (await response.json()) as T;
  }

  private async execute(restRequest: RestRequest, cancellationToken?: AbortSignal): Promise<Response> {
    const baseUrl = this.baseUrl.endsWith("/") ? this.baseUrl : `${this.baseUrl}/`;
    const resourceUri = restRequest.resourceUri.replace(/^\/+/, "");
    const url = new URL(resourceUri, baseUrl);
    if (restRequest.query) {
      for (const [key, value] of Object.entries(restRequest.query)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const finishRequest = beginRequest();
    try {
      const accessToken = getAccessToken();
      const response = await fetch(url, {
        method: restRequest.method,
        cache: restRequest.method === "GET" ? "no-store" : undefined,
        credentials: "include",
        headers: {
          Accept: "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...(restRequest.body ? { "Content-Type": "application/json" } : {}),
        },
        body: restRequest.body ? JSON.stringify(restRequest.body) : undefined,
        signal: cancellationToken,
      });

      if (response.status === 401) {
        clearAccessToken();
        window.dispatchEvent(new Event("soltemp-unauthorized"));
        throw new Error(`API ${restRequest.method} ${restRequest.resourceUri} requires authentication`);
      }

      if (!response.ok) {
        const detail = await this.readErrorDetail(response);
        throw new Error(
          `API ${restRequest.method} ${restRequest.resourceUri} failed (${response.status})${detail ? `: ${detail}` : ""}`,
        );
      }

      return response;
    } finally {
      finishRequest();
    }
  }

  private async readErrorDetail(response: Response): Promise<string> {
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.includes("application/json") && !contentType.includes("problem+json")) return "";

    try {
      const body = (await response.clone().json()) as Record<string, unknown>;
      const item = typeof body.item === "object" && body.item !== null
        ? body.item as Record<string, unknown>
        : undefined;
      const value = item?.errorMessage ?? body.detail ?? body.title ?? body.message;
      return typeof value === "string" ? value : "";
    } catch {
      return "";
    }
  }
}
