import type { GetCountriesResponse } from "@services/Dto/Modules/MasterData/Countries/GetCountries/GetCountriesResponse";
import { GetCountriesRoute } from "@services/Dto/Modules/MasterData/Countries/GetCountries/GetCountriesRoute";
import { getBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";

export async function sendGetCountriesQuery(): Promise<GetCountriesResponse> {
  return getBackEndApiService().sendRequestAsync<GetCountriesResponse>({
    resourceUri: GetCountriesRoute.ResourceUri,
    method: "GET",
  });
}
