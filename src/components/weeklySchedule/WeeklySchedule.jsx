import React, { useState } from "react";
import "./weeklySchedule.scss";

const WeeklySchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [collections, setCollections] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({ time: "", type: "", zone: "" });
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ key: null, index: null });

  const [editMode, setEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState({ key: null, index: null });

  const [showAllModal, setShowAllModal] = useState(false);

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
    newDate.setDate(newDate.getDate() - 21);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 21);
    setCurrentDate(newDate);
  };

  const handleCellClick = (date) => {
    setSelectedDate(date);
    setFormData({ time: "", type: "", zone: "" });
    setEditMode(false);
    setErrors({});
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.time) newErrors.time = "Time is required.";
    if (!formData.type.trim()) newErrors.type = "Type is required.";
    if (!formData.zone.trim()) newErrors.zone = "Zone is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const key = formatDate(selectedDate);
    const newEntry = { ...formData };

    if (editMode) {
      setCollections((prev) => {
        const updated = [...prev[editTarget.key]];
        updated[editTarget.index] = newEntry;
        return { ...prev, [editTarget.key]: updated };
      });
    } else {
      setCollections((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), newEntry],
      }));
    }

    setSelectedDate(null);
    setEditMode(false);
    setErrors({});
  };

  const handleDeleteEntry = (dateKey, index) => {
    setCollections((prev) => {
      const updatedEntries = [...prev[dateKey]];
      updatedEntries.splice(index, 1);
      return {
        ...prev,
        [dateKey]: updatedEntries,
      };
    });
  };

  const handleEditEntry = (key, index) => {
    const entry = collections[key][index];
    const [year, month, day] = key.split("-").map(Number);
    const selected = new Date(year, month - 1, day);

    setFormData(entry);
    setSelectedDate(selected);
    setEditMode(true);
    setEditTarget({ key, index });
    setErrors({});
  };

  return (
    <div className="weeklySchedule">
      <div className="dataLocationTable">
        Calendar Table
        <button className="link" onClick={() => setShowAllModal(true)}>
          See All Schedules
        </button>
      </div>

      <div className="scheduleContainer">
        <div className="scheduleHeader">
          <div className="dateRange">
            {days[0].toDateString()} - {days[20].toDateString()}
          </div>
          <div className="navigation">
            <span className="arrow" onClick={handlePrev}>&lt;</span>
            <span className="arrow" onClick={handleNext}>&gt;</span>
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
                    <div
                      className="collection"
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditEntry(key, idx);
                      }}
                    >
                      <span className="time">{c.time}</span>
                      <span className="type">{c.type}</span> - Zone {c.zone}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget({ key, index: idx });
                          setShowDeleteConfirm(true);
                        }}
                        className="deleteBtn"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add/Edit Modal */}
        {selectedDate && (
          <div className="modal">
            <div className="modalContent">
              <h3>
                {editMode ? "Edit" : "Add"} Collection for{" "}
                {selectedDate.toDateString()}
              </h3>

              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
              {errors.time && <div style={{ color: "red" }}>{errors.time}</div>}

              <input
                type="text"
                placeholder="Description" //"Type (e.g., Food Waste)" 
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              {errors.type && (
                <div style={{ color: "red" }}>{errors.type}</div>
              )}

              <input
                type="text"
                placeholder="Zone"
                value={formData.zone}
                onChange={(e) =>
                  setFormData({ ...formData, zone: e.target.value })
                }
              />
              {errors.zone && (
                <div style={{ color: "red" }}>{errors.zone}</div>
              )}

              <div className="modalButtons">
                <button onClick={handleSubmit} className="addBtn">
                  {editMode ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => {
                    setSelectedDate(null);
                    setEditMode(false);
                  }}
                  className="cancelBtn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="modal">
            <div className="modalContent">
              <h3>Are you sure you want to delete this entry?</h3>
              <div className="modalButtons">
                <button
                  onClick={() => {
                    handleDeleteEntry(deleteTarget.key, deleteTarget.index);
                    setShowDeleteConfirm(false);
                  }}
                  className="deleteBtn"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="cancelBtn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Schedules Modal */}
        {showAllModal && (
          <div
            className="modal"
            onClick={(e) => {
              if (e.target.className === "modal") setShowAllModal(false);
            }}
          >
            <div
              className="modalContent"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>All Scheduled Events</h3>
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {Object.keys(collections).length === 0 ? (
                  <p>No schedules available.</p>
                ) : (
                  Object.entries(collections).map(([key, entries]) => (
                    <div key={key}>
                      <h4>{key}</h4>
                      {entries.map((entry, index) => (
                        <div key={index} className="collection">
                          <span className="time">{entry.time}</span>{" "}
                          <div className="details">
                            <span className="type">{entry.type}</span> - Zone{" "}
                          {entry.zone}
                          </div>
                          
                          <div className="modify">
                            <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditEntry(key, index);
                              setShowAllModal(false);
                            }}
                            className="editBtn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget({ key, index });
                              setShowDeleteConfirm(true);
                              setShowAllModal(false);
                            }}
                            className="deleteBtn"
                          >
                            ✕
                          </button>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
              <button onClick={() => setShowAllModal(false)} className="cancelBtn">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklySchedule;
