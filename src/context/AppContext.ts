import React, { createContext, useContext, useReducer } from "react";
import {
  AppProviderProps,
  ContextProps,
  SearchActionType,
  SearchActionTypes,
  SearchState,
} from "@app/types/types";
import { SelectChangeEvent } from "@mui/material/Select";

const AppContext = createContext<ContextProps | undefined>({} as ContextProps);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const title = "Flights";
  // Flight Search Fields Iniitial State
  const initialSearchState: SearchState = {
    ticketType: "round-trip",
    passengersCount: "1",
    seatingClass: "economy",
  };

  function searchReducer(searchState: SearchState, action: SearchActionType) {
    switch (action.type) {
      case "setTicketType":
        console.log("HELLO", action.payload);
        return { ...searchState, ticketType: action.payload };
      case "setNumberOfPassengers":
        return { ...searchState, passengersCount: action.payload };
      case "setSeatingClass":
        return { ...searchState, seatingClass: action.payload };
      default:
        return searchState;
    }
  }
  const [searchState, dispatch] = useReducer(searchReducer, initialSearchState);

  const handleChange = (event: SelectChangeEvent, type: SearchActionTypes) => {
    dispatch({ type, payload: event.target.value });
  };

  const contextValue: ContextProps = {
    title,
    searchState,
    handleChange,
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
