import React, { createContext, useContext, useReducer, useState } from "react";
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

  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const handleChange = (event: SelectChangeEvent, type: SearchActionTypes) => {
    dispatch({ type, payload: event.target.value });
  };

  const getUserLocation = () => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          if (error.code === 1) {
            // PERMISSION_DENIED
            fallbackToIPLocation();
          } 
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  };

  // Fallback function using IP-based geolocation
  const fallbackToIPLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      setLatitude(data.latitude);
      setLongitude(data.longitude);
    } catch (err) {
      console.log(err);
    }
  };

  const contextValue: ContextProps = {
    title,
    searchState,
    handleChange,
    longitude,
    latitude,
    getUserLocation,
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
