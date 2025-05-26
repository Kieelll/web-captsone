import React, { useState } from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import LocationChart from "../../components/LocationChart/LocationChart";
import { useNavigate } from "react-router-dom";
import { TourProvider } from "@reactour/tour";

const HomeContent = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const navigate = useNavigate();

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgetsContainer">
          <div className="text">
            <span>Overview Metrics</span>
          </div>
          <div className="widgets">
            <Widget type="user" onClick={() => navigate("/users")} />
            <Widget type="order" onClick={() => navigate("/Location")} />
            <Widget type="earning" onClick={() => navigate("/earnings")} />
            <Widget type="balance" onClick={() => navigate("/balance")} />
            <Widget type="availables" onClick={() => navigate("/availables")} />
          </div>
        </div>

        <div className="charts">
          <div className="graphs">
            <Chart
              aspect={2 / 1}
              title="Number of Orders"
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
            <Chart
              aspect={2 / 1}
              title="Number Food Waste"
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </div>
          <div className="pieChart">
            <LocationChart
              aspect={2 / 1}
              title="Number Food Waste"
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const steps = [
  {
    selector: ".logo",
    content: "Welcome to GreenConnect! Click here to return to the dashboard anytime.",
  },
  {
    selector: ".main-section",
    content: "This section contains your main navigation links like Dashboard, Map, and Chat.",
  },
  {
    selector: ".management-section",
    content: "Here you'll find management tools for users, locations, transactions, and more.",
  },
  {
    selector: ".widgetsContainer",
    content: "Here are your overview metrics showing various system statistics.",
  },
  {
    selector: ".widgets",
    content: "These widgets link to key parts of your system such as Users and Locations.",
  },
  {
    selector: ".charts",
    content: "Check these charts to analyze data trends over time.",
  },
  {
    selector: ".pieChart",
    content: "Here’s a pie chart that visualizes food waste by location.",
  },
];

const Home = () => {
  return (
    <TourProvider
      steps={steps}
      styles={() => ({
        maskWrapper: { zIndex: 9999 },
        popover: (base) => ({
          ...base,
          backgroundColor: "#e8f5e9",
          color: "#1b5e20",
          borderRadius: "10px",
          padding: "20px",
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: "#66bb6a",
        }),
        close: (base) => ({
          ...base,
          color: "#1b5e20",
        }),
      })}
      showNavigation
      showBadge
      showCloseButton
    >
      <HomeContent />
    </TourProvider>
  );
};

export default Home;
