import { DeleteCountryRoute } from "@services/Dto/Modules/MasterData/Countries/DeleteCountry/DeleteCountryRoute";
import { getBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";

export async function sendDeleteCountryCommand(request: { id: string }): Promise<void> {
  await getBackEndApiService().sendRequest({
    resourceUri: DeleteCountryRoute.ResourceUri,
    method: "DELETE",
    query: { id: request.id },
  });
}
