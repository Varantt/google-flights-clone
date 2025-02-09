import React from "react";
import "./FlightSearch.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useAppContext } from "@/context/AppContext";

export const FlightSearch: React.FC = () => {
  const { initialSearchState, handleTicketTypeChange } = useAppContext();
  return (
    <div id="flight-search">
      <div className="flight-search-header">
        <div className="fields-container">
          <div className="round-trip field">
            <SwapHorizIcon />
            <Select
              value={initialSearchState.ticketType}
              onChange={handleTicketTypeChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em> Round Trip</em>
              </MenuItem>
              <MenuItem value={10}>Round Trip</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>

          <div className="number-of-passengers field">
            <PersonOutlineIcon />
          </div>

          <div className="seating-class field">
            <Select
              value={initialSearchState.ticketType}
              onChange={handleTicketTypeChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em> Economy</em>
              </MenuItem>
              <MenuItem value={10}>Round Trip</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
