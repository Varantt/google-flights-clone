import React from "react";
import "./FlightSearch.scss";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppContext } from "@/context/AppContext";
import {
  ticketTypes,
  passengersCount,
  seatingClass,
} from "@/config/flightSearchData";

const BorderlessSelect = styled(Select<string>)({
  "& .MuiSelect-root": {
    height: "36px",
    boxSizing: "border-box",
  },
  "& .MuiSelect-select": {
    padding: "0",
    paddingRight: "44px !important",
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
  "& .MuiSelect-icon": {
    right: "5px",
  },
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
          backgroundColor: "rgba(255, 255, 255, 0.16)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.24)",
          },
        },
      },
    },
  },
};

// Helper function to get the correct icon component
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
  const { initialSearchState, handleTicketTypeChange } = useAppContext();

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
                    (type) =>
                      type.id ===
                      (initialSearchState.ticketType || "round-trip")
                  )?.icon || "SyncAltIcon"
                )}
                <BorderlessSelect
                  value={initialSearchState.ticketType || "round-trip"}
                  onChange={(event: SelectChangeEvent<string>) =>
                    handleTicketTypeChange(event)
                  }
                  MenuProps={menuProps}
                >
                  {ticketTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
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
                  value={initialSearchState.passengersCount || "1"}
                  displayEmpty
                >
                  {passengersCount.map((count) => (
                    <MenuItem key={count} value={count}>
                      {count}
                    </MenuItem>
                  ))}
                </BorderlessSelect>
              </div>

              {/* Seating Class */}
              <div className="field" style = {{paddingLeft: "14px"}}>
                <BorderlessSelect
                  MenuProps={menuProps}
                  value={initialSearchState.seatingClass || "economy"}
                  displayEmpty
                >
                  {seatingClass.map((seat) => (
                    <MenuItem key={seat.id} value={seat.id}>
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
