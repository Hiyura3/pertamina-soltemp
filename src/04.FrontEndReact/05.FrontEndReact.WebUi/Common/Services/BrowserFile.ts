export type ApiFile = {
  fileName: string;
  contentType: string;
  fileContent: string;
};

export async function browserFileToApiFile(file: File): Promise<ApiFile> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return {
    fileName: file.name,
    contentType: file.type || "application/octet-stream",
    fileContent: btoa(binary),
  };
}

export function downloadBrowserFile(file: File): void {
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = file.name;
  anchor.click();
  URL.revokeObjectURL(url);
}
