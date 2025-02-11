import { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

// Context Props
interface ContextProps {
  title: string;
  longitude: number | null;
  latitude: number | null;
  handleChange: (
    event: SelectChangeEvent<string>,
    type: SearchActionTypes
  ) => void;
  searchState: SearchState;
  getUserLocation: () => void;
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
  passengersCount: string;
  seatingClass: string;
}

type SearchActionTypes =
  | "setTicketType"
  | "setNumberOfPassengers"
  | "setSeatingClass";

type SearchActionType =
  | { type: "setTicketType"; payload: string }
  | { type: "setNumberOfPassengers"; payload: string }
  | { type: "setSeatingClass"; payload: string };

type TicketType = "round-trip" | "one-way" | "multi-city";
type SeatingClass = "economy" | "premium-economy" | "business" | "first";

interface TicketField {
  id: TicketType;
  name: TicketType;
  icon: string;
  label: string;
}
interface SeatingClassField {
  id: SeatingClass;
  name: SeatingClass;
  label: string;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFetchOptions {
  immediate?: boolean;
  headers?: HeadersInit;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

// Airports



interface AirportOption {
  presentation: AirportPresentationLabels;
  navigation: AirportNavigationLabels;
}

interface AirportPresentationLabels {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}
interface AirportNavigationLabels {
  entitiyId: string;
  entityType: "AIRPORT" | "CITY";
  localizedName: string
}
export type {
  ContextProps,
  AppProviderProps,
  HeaderProps,
  SearchState,
  SearchActionType,
  SearchActionTypes,
  TicketType,
  TicketField,
  SeatingClassField,
  FetchState,
  UseFetchOptions,
  AirportOption
};
