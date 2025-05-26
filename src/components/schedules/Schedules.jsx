import "./schedules.scss";
import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Schedules = () => {
  const [dropdownValues, setDropdownValues] = useState({
    staffMember: "All Staff",
    position: "All Positions",
    dateRange: "This Month",
    status: "All Statuses",
  });

  const [isOpen, setIsOpen] = useState({
    staffMember: false,
    position: false,
    dateRange: false,
    status: false,
  });

  const handleDropdownChange = (key, value) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const toggleDropdown = (key) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="schedules">
      <div className="text">
        <span>Filter Schedules</span>
      </div>
      <div className="scheduleContainer">
        <div className="dropdowns">
          <div className="dropdown">
            <span>Staff Member</span>
            <div className="dropdownButton" onClick={() => toggleDropdown("staffMember")}>
              <span>{dropdownValues.staffMember}</span>
              <ArrowDownwardIcon />
            </div>
            <div className={`dropdownMenu ${isOpen.staffMember ? "open" : ""}`}>
              {["All Staff", "John Doe", "Jane Smith", "Jomar Pandanan"].map((item) => (
                <div
                  key={item}
                  className="dropdownItem"
                  onClick={() => handleDropdownChange("staffMember", item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <span>Position</span>
            <div className="dropdownButton" onClick={() => toggleDropdown("position")}>
              <span>{dropdownValues.position}</span>
              <ArrowDownwardIcon />
            </div>
            <div className={`dropdownMenu ${isOpen.position ? "open" : ""}`}>
              {["All Positions", "Collectors ", "Food Waste Processors", ].map((item) => (
                <div
                  key={item}
                  className="dropdownItem"
                  onClick={() => handleDropdownChange("position", item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <span>Date Range</span>
            <div className="dropdownButton" onClick={() => toggleDropdown("dateRange")}>
              <span>{dropdownValues.dateRange}</span>
              <ArrowDownwardIcon />
            </div>
            <div className={`dropdownMenu ${isOpen.dateRange ? "open" : ""}`}>
              {["This Week", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((item) => (
                <div
                  key={item}
                  className="dropdownItem"
                  onClick={() => handleDropdownChange("dateRange", item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <span>Status</span>
            <div className="dropdownButton" onClick={() => toggleDropdown("status")}>
              <span>{dropdownValues.status}</span>
              <ArrowDownwardIcon />
            </div>
            <div className={`dropdownMenu ${isOpen.status ? "open" : ""}`}>
              {["All Statuses", "Scheduled", "Completed", "Cancelled"].map((item) => (
                <div
                  key={item}
                  className="dropdownItem"
                  onClick={() => handleDropdownChange("status", item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="filterActions">
          <button className="resetBtn">Reset</button>
          <button className="applyBtn">Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
