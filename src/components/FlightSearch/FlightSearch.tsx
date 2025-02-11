import React, { useEffect, useState } from "react";
import "./FlightSearch.scss";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CheckIcon from "@mui/icons-material/Check";
import { useAppContext } from "@/context/AppContext";
import {
  ticketTypes,
  passengersCount as passengerOptions,
  seatingClass as seatingClasses,
} from "@/config/flightSearchData";
import { AirportOption, SeatingClassField } from "@/types/types";
import { useFetch } from "@/hooks/useFetch";
import { Autocomplete, TextField } from "@mui/material";

const BorderlessSelect = styled(Select<string>)({
  "& .MuiSelect-root": {
    height: "36px",
    boxSizing: "border-box",
  },
  "& .MuiSelect-select": {
    padding: "0",
    paddingRight: "40px !important",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSvgIcon-root": {
    fill: "#70757a",
  },
  ".MuiList-root": {
    backgroundColor: "#202124 !important",
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
});

const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "#202124",
      "& .MuiMenuItem-root": {
        color: "white",
        height: "48px",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
        "&.Mui-selected": {
          backgroundColor: "#394457 !important",
          gap: "12px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.24)",
          },
        },
      },
    },
  },
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "SyncAltIcon":
      return <SyncAltIcon />;
    case "SwapHorizIcon":
      return <SwapHorizIcon />;
    case "ArrowRightAltIcon":
      return <ArrowRightAltIcon />;
    default:
      return null;
  }
};
export const FlightSearch: React.FC = () => {
  const { searchState, handleChange, latitude, longitude, getUserLocation } =
    useAppContext();
  const { ticketType, passengersCount, seatingClass } = searchState;
  const { fetchData } = useFetch();

  const [currentAirport, setCurrentAirport] = useState<string>("");
  const [nearbyAirports, setNearbyAirports] = useState<AirportOption[]>([]);
  console.log(longitude, latitude);
  useEffect(() => {
    const fetchNearbyAirports = async () => {
      try {
        // Check if we have latitude and longitude
        if (!latitude || !longitude) return;

        const response = await fetchData(
          `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${latitude}&lng=${longitude}`,
          {
            headers: {
              "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
              "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
            },
          }
        );
        const currentAirport: string =
          response.data.current.presentation.suggestionTitle;
        console.log(currentAirport);
        setCurrentAirport(currentAirport);
        setNearbyAirports(response.data.nearby);
        console.log(response);
      } catch (err) {
        console.error("Error fetching airports:", err);
      }
    };

    // Get location first
    getUserLocation();

    // Only fetch airports if we have coordinates
    if (latitude && longitude) {
      fetchNearbyAirports();
    }
  }, [latitude, longitude]); // Add these as dependencies

  return (
    <div className="flight-search-wrapper flight-search-max-width">
      <div id="flight-search">
        <div className="flight-search-container">
          <div className="flight-search-header">
            <div className="fields-container">
              {/* Ticket Type Selection */}
              <div className="field">
                {getIconComponent(
                  ticketTypes.find(
                    (type) => type.id === (ticketType || "round-trip")
                  )?.icon || "SyncAltIcon"
                )}
                <BorderlessSelect
                  value={ticketType || "round-trip"}
                  onChange={(event: SelectChangeEvent<string>) =>
                    handleChange(event, "setTicketType")
                  }
                  MenuProps={menuProps}
                  renderValue={(value) => {
                    const selectedType = ticketTypes.find(
                      (type) => type.id === value
                    );
                    return selectedType?.label || "Round Trip";
                  }}
                >
                  {ticketTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.id === ticketType && <CheckIcon />}
                      {type.label}
                    </MenuItem>
                  ))}
                </BorderlessSelect>
              </div>

              {/* Number of Passengers */}
              <div className="field">
                <PersonOutlineIcon />
                <BorderlessSelect
                  MenuProps={menuProps}
                  value={passengersCount || "1"}
                  displayEmpty
                  renderValue={(value) => value}
                  onChange={(event: SelectChangeEvent<string>) =>
                    handleChange(event, "setNumberOfPassengers")
                  }
                >
                  {passengerOptions.map((count: string) => (
                    <MenuItem key={count} value={count}>
                      {count === passengersCount && <CheckIcon />}
                      {count}
                    </MenuItem>
                  ))}
                </BorderlessSelect>
              </div>

              {/* Seating Class */}
              <div className="field" style={{ paddingLeft: "14px" }}>
                <BorderlessSelect
                  MenuProps={menuProps}
                  value={seatingClass || "economy"}
                  displayEmpty
                  onChange={(event: SelectChangeEvent<string>) =>
                    handleChange(event, "setSeatingClass")
                  }
                  renderValue={(value) => {
                    const selectedClass = seatingClasses.find(
                      (seat) => seat.id === value
                    );
                    return selectedClass?.label || "Economy";
                  }}
                >
                  {seatingClasses.map((seat: SeatingClassField) => (
                    <MenuItem key={seat.id} value={seat.id}>
                      {seat.id === seatingClass && <CheckIcon />}
                      {seat.label}
                    </MenuItem>
                  ))}
                </BorderlessSelect>
              </div>
            </div>
          </div>

          <div className="flight-search-data-container">
            <div className="AutoComplete">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={nearbyAirports}
                sx={{ width: 300 }}
                getOptionLabel={(option: AirportOption) =>
                  option.presentation.suggestionTitle
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Airports"
                    value={currentAirport}
                    placeholder="Enter city or airport"
                  />
                )}
              />
            </div>
            <div className="AutoComplete">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={nearbyAirports}
                sx={{ width: 300 }}
                getOptionLabel={(option: AirportOption) =>
                  option.presentation.suggestionTitle
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Airports"
                    value={currentAirport}
                    placeholder="Enter city or airport"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
