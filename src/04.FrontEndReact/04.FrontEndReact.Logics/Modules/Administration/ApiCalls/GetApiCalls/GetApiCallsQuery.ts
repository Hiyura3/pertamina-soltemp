import type { GetApiCallsResponse } from "@services/Dto/Modules/Administration/ApiCalls/GetApiCalls/GetApiCallsResponse";
import { GetApiCallsRoute } from "@services/Dto/Modules/Administration/ApiCalls/GetApiCalls/GetApiCallsRoute";
import { getBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";

export async function sendGetApiCallsQuery(): Promise<GetApiCallsResponse> {
  return getBackEndApiService().sendRequestAsync<GetApiCallsResponse>({
    resourceUri: GetApiCallsRoute.ResourceUri,
    method: "GET",
  });
}
