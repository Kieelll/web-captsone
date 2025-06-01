import { TourProvider } from "@reactour/tour";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import LocationChart from "../../components/LocationChart/LocationChart";
import { Navbar } from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const steps = [
  {
    selector: ".widgetsContainer",
    content: "This section shows your key metrics and overview data.",
  },
  {
    selector: ".widgets",
    content: "Each widget represents different aspects of your system.",
  },
  {
    selector: ".charts",
    content: "These charts show your data trends and analytics.",
  },
];

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

const Home = () => {
  return (
    <TourProvider
      steps={steps}
      styles={{
        popover: (base) => ({
          ...base,
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
        }),
      }}
      showNavigation
      showBadge
      showCloseButton
    >
      <HomeContent />
    </TourProvider>
  );
};

export default Home;
