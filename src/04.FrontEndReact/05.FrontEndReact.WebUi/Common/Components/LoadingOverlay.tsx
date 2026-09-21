import { useSyncExternalStore } from "react";
import {
  getRequestActivitySnapshot,
  subscribeToRequestActivity,
} from "@infrastructure/BackEndApi/RequestActivity";

export function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-card/70">
      <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm shadow">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
        Loading…
      </div>
    </div>
  );
}

export function GlobalLoadingOverlay() {
  const isVisible = useSyncExternalStore(
    subscribeToRequestActivity,
    getRequestActivitySnapshot,
    getRequestActivitySnapshot,
  );

  return <LoadingOverlay isVisible={isVisible} />;
}
