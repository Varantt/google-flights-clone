import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

// Context Props
interface ContextProps {
  title: string;
  handleTicketTypeChange: (event: SelectChangeEvent) => void;
  initialSearchState: SearchState
}

interface AppProviderProps {
  children: ReactNode;
}

// Header Component Props
interface HeaderProps {
  title: string;
  lightImage: string;
  darkImage: string;
}

// Flight Search Component Props
interface SearchState {
  ticketType: string;
  numberOfPassengers: number;
  seatingClass: string;
}

type SearchActionType =
  | { type: "setTicketType"; payload: string }
  | { type: "setNumberOfPassengers"; payload: number }
  | { type: "setSeatingClass"; payload: string };

export type {
  ContextProps,
  AppProviderProps,
  HeaderProps,
  SearchState,
  SearchActionType,
};
