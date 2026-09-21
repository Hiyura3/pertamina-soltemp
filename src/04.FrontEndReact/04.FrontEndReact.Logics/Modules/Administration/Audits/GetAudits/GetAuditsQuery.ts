import type { GetAuditsResponse } from "@services/Dto/Modules/Administration/Audits/GetAudits/GetAuditsResponse";
import { GetAuditsRoute } from "@services/Dto/Modules/Administration/Audits/GetAudits/GetAuditsRoute";
import { getBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";

export async function sendGetAuditsQuery(): Promise<GetAuditsResponse> {
  return getBackEndApiService().sendRequestAsync<GetAuditsResponse>({
    resourceUri: GetAuditsRoute.ResourceUri,
    method: "GET",
  });
}
