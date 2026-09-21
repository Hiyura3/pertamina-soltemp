export type RestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type RestRequest = {
  resourceUri: string;
  method: RestMethod;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
};

export interface IBackEndApiService {
  sendRequest(restRequest: RestRequest, cancellationToken?: AbortSignal): Promise<void>;
  sendRequestAsync<T>(restRequest: RestRequest, cancellationToken?: AbortSignal): Promise<T>;
}
