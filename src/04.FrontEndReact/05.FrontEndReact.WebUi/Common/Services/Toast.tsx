import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

type Severity = "success" | "info" | "warning" | "error";

type ToastItem = {
  id: number;
  severity: Severity;
  message: string;
};

type ToastApi = {
  add: (message: string, severity?: Severity) => void;
  success: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const add = useCallback((message: string, severity: Severity = "info") => {
    const id = nextId++;
    setItems((current) => [...current, { id, severity, message }]);
    window.setTimeout(() => {
      setItems((current) => current.filter((item) => item.id !== id));
    }, 4200);
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      add,
      success: (message) => add(message, "success"),
      info: (message) => add(message, "info"),
      warning: (message) => add(message, "warning"),
      error: (message) => add(message, "error"),
    }),
    [add],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[70] flex w-80 flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto rounded-md border px-3 py-2 text-sm shadow-lg",
              item.severity === "success" && "border-emerald-200 bg-emerald-50 text-emerald-800",
              item.severity === "info" && "border-sky-200 bg-sky-50 text-sky-800",
              item.severity === "warning" && "border-amber-200 bg-amber-50 text-amber-800",
              item.severity === "error" && "border-red-200 bg-red-50 text-red-800",
            )}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return value;
}
