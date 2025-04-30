import React, { useState } from "react";
import "./weeklySchedule.scss";

const WeeklySchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [collections, setCollections] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({ time: "", type: "", zone: "" });

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const days = Array.from({ length: 21 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 21); // Move back 21 days
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 21); // Move forward 21 days
    setCurrentDate(newDate);
  };

  const handleCellClick = (date) => {
    setSelectedDate(date);
    setFormData({ time: "", type: "", zone: "" });
  };

  const handleSubmit = () => {
    const key = formatDate(selectedDate);
    const newEntry = { ...formData };
    setCollections((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newEntry],
    }));
    setSelectedDate(null);
  };

  return (
    <div className="weeklySchedule">
      <div className="scheduleHeader">
        <div className="navigation">
          <span className="arrow" onClick={handlePrev}>
            &lt;
          </span>
          <span className="arrow" onClick={handleNext}>
            &gt;
          </span>
        </div>
        <div className="dateRange">
          {days[0].toDateString()} - {days[20].toDateString()} {/* Display the full 3-week range */}
        </div>
      </div>

      <div className="collectorBlock">
        <div className="calendarGrid">
          {days.map((day) => {
            const key = formatDate(day);
            return (
              <div
                key={key}
                className="calendarCell"
                onClick={() => handleCellClick(day)}
              >
                <div className="dayLabel">
                  {day.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                {collections[key]?.map((c, idx) => (
                  <div className="collection" key={idx}>
                    <span className="time">{c.time}</span>
                    <span className="type">{c.type}</span> - Zone {c.zone}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="modal">
          <div className="modalContent">
            <h3>Add Collection for {selectedDate.toDateString()}</h3>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Type (e.g., Food Waste)"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Zone"
              value={formData.zone}
              onChange={(e) =>
                setFormData({ ...formData, zone: e.target.value })
              }
            />
            <button onClick={handleSubmit}>Add</button>
            <button onClick={() => setSelectedDate(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;
