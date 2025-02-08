import React, { createContext, useContext } from "react";
import { AppProviderProps, ContextProps } from "@app/types/types";

const AppContext = createContext<ContextProps | undefined>({} as ContextProps);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const title = "Flights"
  const contextValue: ContextProps = {
    title
  };

  return React.createElement(
    AppContext.Provider,
    { value: contextValue },
    children
  );
};

export const useAppContext = (): ContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
