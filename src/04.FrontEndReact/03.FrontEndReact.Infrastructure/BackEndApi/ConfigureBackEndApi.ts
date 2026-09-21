import { appConfigFrontEndOptions } from "@services/AppConfigFrontEnd/AppConfigFrontEndOptions";
import type { IBackEndApiService } from "@services/BackEndApi/IBackEndApiService";
import { BackEndApiService } from "./BackEndApiService";
import { MockBackEndApiService } from "./MockBackEndApiService";

let backEndApiService: IBackEndApiService | undefined;

export function addBackEndApiService(
  backEndApiBaseUrl = appConfigFrontEndOptions.backEndApiBaseUrl,
  useMockApi = false,
): IBackEndApiService {
  backEndApiService = useMockApi
    ? new MockBackEndApiService()
    : new BackEndApiService(backEndApiBaseUrl);
  return backEndApiService;
}

export function getBackEndApiService(): IBackEndApiService {
  if (!backEndApiService) {
    return addBackEndApiService();
  }
  return backEndApiService;
}
