import React from "react";
import "./FlightSearch.scss";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppContext } from "@/context/AppContext";

const BorderlessSelect = styled(Select<string>)({
  "& .MuiSelect-select": {
    padding: "4px 8px", // Compact padding
    fontSize: "14px", // Match Google Flights text size
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
    right: "5px", // Align dropdown icon
  },
});

const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "#202124",
      "& .MuiMenuItem-root": {
        color: "white",
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
                <SyncAltIcon />
                <BorderlessSelect
                  value={initialSearchState.ticketType || "round-trip"}
                  onChange={(event: SelectChangeEvent<string>) =>
                    handleTicketTypeChange(event)
                  }
                  MenuProps={menuProps}
                >
                  <MenuItem value="round-trip">Round Trip</MenuItem>
                  <MenuItem value="one-way">One Way</MenuItem>
                  <MenuItem value="multi-city">Multi-city</MenuItem>
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
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5+</MenuItem>
                </BorderlessSelect>
              </div>

              <div className="field">
                <BorderlessSelect
                  MenuProps={menuProps}
                  value={initialSearchState.seatingClass || "economy"}
                  displayEmpty
                >
                  <MenuItem value="economy">Economy</MenuItem>
                  <MenuItem value="premium-economy">Premium Economy</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="first">First</MenuItem>
                </BorderlessSelect>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
