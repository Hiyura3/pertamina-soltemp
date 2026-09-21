export type LocalFileItem = { fileName: string; contentType: string; fileContent: string };

export function downloadLocalFile(file: LocalFileItem): void {
  const anchor = document.createElement("a");
  anchor.href = `data:${file.contentType || "application/octet-stream"};base64,${file.fileContent}`;
  anchor.download = file.fileName;
  anchor.click();
}
