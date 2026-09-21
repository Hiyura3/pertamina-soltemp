import type { GetConfigurationsResponse } from "@services/Dto/Modules/Administration/Configurations/GetConfigurations/GetConfigurationsResponse";
import { GetConfigurationsRoute } from "@services/Dto/Modules/Administration/Configurations/GetConfigurations/GetConfigurationsRoute";
import { getBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";

export async function sendGetConfigurationsQuery(): Promise<GetConfigurationsResponse> {
  return getBackEndApiService().sendRequestAsync<GetConfigurationsResponse>({
    resourceUri: GetConfigurationsRoute.ResourceUri,
    method: "GET",
  });
}
