import { createContext, useContext, type ReactNode } from "react";

export type PageHeaderOutletValue = {
  breadcrumbs: HTMLElement | null;
  actions: HTMLElement | null;
};

const PageHeaderOutletContext = createContext<PageHeaderOutletValue>({
  breadcrumbs: null,
  actions: null,
});

export function PageHeaderOutletProvider({
  value,
  children,
}: {
  value: PageHeaderOutletValue;
  children: ReactNode;
}) {
  return <PageHeaderOutletContext.Provider value={value}>{children}</PageHeaderOutletContext.Provider>;
}

export function usePageHeaderOutlet() {
  return useContext(PageHeaderOutletContext);
}
