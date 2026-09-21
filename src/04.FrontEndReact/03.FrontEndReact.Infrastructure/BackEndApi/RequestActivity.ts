let activeRequestCount = 0;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function beginRequest(): () => void {
  activeRequestCount += 1;
  notify();

  let finished = false;
  return () => {
    if (finished) return;
    finished = true;
    activeRequestCount = Math.max(0, activeRequestCount - 1);
    notify();
  };
}

export function subscribeToRequestActivity(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getRequestActivitySnapshot(): boolean {
  return activeRequestCount > 0;
}
