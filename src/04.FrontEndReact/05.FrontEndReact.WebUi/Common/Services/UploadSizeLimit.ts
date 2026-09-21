import { sendGetConfigurationsQuery } from "@logics/Modules/Administration/Configurations/GetConfigurations/GetConfigurationsQuery";

const uploadSizeLimitKey = "UploadSizeLimit";
const defaultUploadSizeLimitMb = 30;

let cachedLimit: Promise<number> | null = null;

export function getUploadSizeLimitMb(): Promise<number> {
  cachedLimit ??= sendGetConfigurationsQuery()
    .then((response) => {
      const configuredValue = response.items.find(
        (item) => item.key.toLowerCase() === uploadSizeLimitKey.toLowerCase(),
      )?.value;
      const parsedValue = Number(configuredValue);
      return Number.isFinite(parsedValue) && parsedValue > 0
        ? parsedValue
        : defaultUploadSizeLimitMb;
    })
    .catch(() => defaultUploadSizeLimitMb);

  return cachedLimit;
}

export async function assertFileWithinUploadSizeLimit(file: File): Promise<void> {
  const limitMb = await getUploadSizeLimitMb();
  const limitBytes = limitMb * 1024 * 1024;
  if (file.size > limitBytes) {
    throw new Error(`File size must not exceed ${limitMb} MB.`);
  }
}
