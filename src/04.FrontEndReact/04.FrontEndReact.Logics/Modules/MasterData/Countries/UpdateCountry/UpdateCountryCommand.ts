import type { UpdateCountryRequest } from "@services/Dto/Modules/MasterData/Countries/UpdateCountry/UpdateCountryRequest";
import { UpdateCountryRoute } from "@services/Dto/Modules/MasterData/Countries/UpdateCountry/UpdateCountryRoute";
import { getBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";

export type UpdateCountryCommand = UpdateCountryRequest;

export async function sendUpdateCountryCommand(request: UpdateCountryRequest): Promise<void> {
  await getBackEndApiService().sendRequest({
    resourceUri: UpdateCountryRoute.ResourceUri,
    method: "PATCH",
    body: request,
  });
}
