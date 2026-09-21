import type { AddCountryRequest } from "@services/Dto/Modules/MasterData/Countries/AddCountry/AddCountryRequest";
import { AddCountryRoute } from "@services/Dto/Modules/MasterData/Countries/AddCountry/AddCountryRoute";
import { getBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";

export async function sendAddCountryCommand(request: AddCountryRequest): Promise<void> {
  await getBackEndApiService().sendRequest({
    resourceUri: AddCountryRoute.ResourceUri,
    method: "POST",
    body: request,
  });
}
