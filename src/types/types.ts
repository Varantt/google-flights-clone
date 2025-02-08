import { ReactNode } from "react";

interface ContextProps {
  title: string;
}

interface AppProviderProps {
  children: ReactNode;
}

interface HeaderProps {
  title: string;
  lightImage: string;
  darkImage: string;
}
export type { ContextProps, AppProviderProps, HeaderProps };
