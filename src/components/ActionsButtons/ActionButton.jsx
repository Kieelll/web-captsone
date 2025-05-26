import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import "./ActionButton.scss";

const ActionButtons = ({ onTutorial, onLogout }) => {
  return (
    <div className="action-buttons">
      <button className="action-btn" onClick={onTutorial}>
        <div className="icon-container">
          <MenuBookIcon className="icon" />
        </div>
        <span>INSTRUCTIONS</span>
      </button>
      <button className="action-btn" onClick={onLogout}>
        <div className="icon-container">
          <LogoutIcon className="icon" />
        </div>
        <span>LOGOUT</span>
      </button>
    </div>
  );
};

export default ActionButtons;
