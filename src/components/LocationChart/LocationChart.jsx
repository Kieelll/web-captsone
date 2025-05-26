import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './LocationChart.scss';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const LocationChart = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const years = ["2025", "2024", "2023"];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setDropdownOpen(false);
  };

  const [state] = useState({
    series: [44, 55, 13, 43],
    options: {
      chart: { type: 'pie' },
      labels: ['Residents', 'Outsiders', 'Eateries', 'Restaurants'],
      dataLabels: { style: { fontSize: '13px' } },
      legend: {
        position: 'bottom',
        fontSize: '14px',
        labels: { colors: ['#2e7d32'] },
        itemMargin: { vertical: 4 }
      },
      stroke: { colors: ['#fff'] },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: { width: 300 },
          legend: { position: 'bottom' },
        },
      }],
    },
  });

  return (
    <div className="locationChartCard">
      <div className="locationChartHeader">
        <div className="titleSection">
          <h3>{title || "Location with the Most Food Waste"}</h3>
          <p>Data grouped by entity type</p>
        </div>
        <div className="controls">
          <ArrowBackIosIcon className="arrowIcon" />
          <ArrowForwardIosIcon className="arrowIcon" />
          <div className="yearDropdown">
            <div className="dropdownButton" onClick={toggleDropdown}>
              <span>{selectedYear}</span>
              <ArrowDownwardIcon />
            </div>
            <div className={`dropdownMenu ${dropdownOpen ? 'open' : ''}`}>
              {years.map((year) => (
                <div key={year} className="dropdownItem" onClick={() => handleYearSelect(year)}>
                  {year}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="locationChartBody">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
          width="100%"
          height="320"
        />
      </div>
    </div>
  );
};

export default LocationChart;
