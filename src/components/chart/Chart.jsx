// Chart.jsx
import "./chart.scss";
import {
  BarChart, Bar, Rectangle, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

const allData = [
  { name: 'January', stocks: 4000, sold: 2400, amt: 2400 },
  { name: 'February', stocks: 3000, sold: 1398, amt: 2210 },
  { name: 'March', stocks: 2000, sold: 9800, amt: 2290 },
  { name: 'April', stocks: 2780, sold: 3908, amt: 2000 },
  { name: 'May', stocks: 1890, sold: 4800, amt: 2181 },
  { name: 'June', stocks: 1890, sold: 4800, amt: 2181 },
  { name: 'July', stocks: 2200, sold: 3900, amt: 2100 },
  { name: 'August', stocks: 2400, sold: 4300, amt: 2200 },
  { name: 'September', stocks: 2600, sold: 4100, amt: 2300 },
  { name: 'October', stocks: 2800, sold: 4400, amt: 2400 },
  { name: 'November', stocks: 3000, sold: 4600, amt: 2500 },
  { name: 'December', stocks: 3200, sold: 4800, amt: 2600 },
];

const Chart = ({ aspect, title, selectedYear, onYearChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const years = ["2025", "2024", "2023"];
  const monthsPerView = 6;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleYearSelect = (year) => {
    onYearChange(year);
    setDropdownOpen(false);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + monthsPerView < allData.length)
      setStartIndex(startIndex + 1);
  };

  const data = allData.slice(startIndex, startIndex + monthsPerView);

  return (
    <div className="chart">
      <div className="chartHeader">
        <div className="title">{title}</div>
        <div className="controls">
          <ArrowBackIosIcon className="arrowIcon" onClick={handlePrev} />
          <ArrowForwardIosIcon className="arrowIcon" onClick={handleNext} />
          <div className="yearDropdown">
            <div className="dropdownButton" onClick={toggleDropdown}>
              <span>{selectedYear}</span>
              <ArrowDownwardIcon />
            </div>
            <div className={`dropdownMenu ${dropdownOpen ? "open" : ""}`}>
              {years.map((year) => (
                <div key={year} className="dropdownItem" onClick={() => handleYearSelect(year)}>
                  {year}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="chartContainer">
        <ResponsiveContainer width="100%" aspect={aspect}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sold" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="stocks" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;