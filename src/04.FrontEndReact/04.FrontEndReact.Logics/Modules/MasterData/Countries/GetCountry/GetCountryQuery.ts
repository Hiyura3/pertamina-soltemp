import type { GetCountryResponse } from "@services/Dto/Modules/MasterData/Countries/GetCountry/GetCountryResponse";
import { GetCountryRoute } from "@services/Dto/Modules/MasterData/Countries/GetCountry/GetCountryRoute";
import { getBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";

export async function sendGetCountryQuery(query: { countryId: string }): Promise<GetCountryResponse> {
  return getBackEndApiService().sendRequestAsync<GetCountryResponse>({
    resourceUri: GetCountryRoute.ResourceUri,
    method: "GET",
    query: { id: query.countryId },
  });
}
