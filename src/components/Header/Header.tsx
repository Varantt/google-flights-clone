import React from "react";
import { HeaderProps } from "@app/types/types";
import "./Header.scss";

export const Header: React.FC<HeaderProps> = ({
  title = "Flights",
  darkImage,
}) => {
  return (
    <div className="header-wrapper max-width">
      <div id="site-header">
        <div className="image">
          <div
            className="themed-image"
            role="presentation"
            style={{
              backgroundImage: `url(${darkImage})`,
            height: "298.58px",
            }}
            data-dark-image={darkImage}
          />
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};
