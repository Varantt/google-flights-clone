import React, { useEffect } from "react";
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
import { SeatingClassField } from "@/types/types";
import { useFetch } from "@/hooks/useFetch";

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
  const { searchState, handleChange, latitude, longitude, getUserLocation } = useAppContext();
  const { ticketType, passengersCount, seatingClass } = searchState;
  const { data, loading, error, fetchData } = useFetch();
  console.log(longitude, latitude)
  useEffect(() => {
    try {
      getUserLocation();
      const response = fetchData(
        "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=19.242218017578125&lng=72.85846156046128",
        {
          headers: {
            "x-rapidapi-key":
              "f13b77b877mshe628a33ceeb6755p12e6c3jsnbb8c0c2e5bc1",
            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );
    } catch (err) {
      console.error("Error fetching airports:", err);
    }
  }, []);

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
        </div>
      </div>
    </div>
  );
};
