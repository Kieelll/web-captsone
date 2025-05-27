import React, { useState } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTour } from "@reactour/tour";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setIsOpen, setCurrentStep } = useTour();
  const navigate = useNavigate();

  const handleTutorial = () => {
    setCurrentStep(0);
    setIsOpen(true);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <NotificationsActiveOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div
            className="item profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src="https://i.imgur.com/yzFLzGa.png"
              alt="admin"
              className="avatar"
            />
            <ArrowDropDownIcon />
            {dropdownOpen && (
              <div className="dropdown custom-dropdown">
                <button className="dropdown-btn" onClick={handleTutorial}>
                  <div className="icon-box">
                    <MenuBookIcon className="icon" />
                  </div>
                  <span>INSTRUCTIONS</span>
                </button>
                <button className="dropdown-btn" onClick={handleLogout}>
                  <div className="icon-box">
                    <LogoutIcon className="icon" />
                  </div>
                  <span>LOGOUT</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
