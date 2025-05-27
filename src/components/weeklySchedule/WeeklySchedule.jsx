import React, { useState } from "react";
import "./weeklySchedule.scss";
import ExportPDFModal from "../ExportPDFModal/ExportPDFModal";

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
  const [showExportModal, setShowExportModal] = useState(false);
  const [allSchedulesSearchTerm, setAllSchedulesSearchTerm] = useState('');

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

  // Filter collections for All Schedules Modal
  const filteredAllSchedules = Object.entries(collections).reduce((acc, [date, entries]) => {
    const filteredEntries = entries.filter(entry => 
      entry.time.toLowerCase().includes(allSchedulesSearchTerm.toLowerCase()) ||
      entry.type.toLowerCase().includes(allSchedulesSearchTerm.toLowerCase()) ||
      entry.zone.toLowerCase().includes(allSchedulesSearchTerm.toLowerCase())
    );
    if (filteredEntries.length > 0) {
      acc[date] = filteredEntries;
    }
    return acc;
  }, {});

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
                      <span className="type">{c.type}</span>
                      <span className="zone">Zone {c.zone}</span>
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
          <div className="modalOverlay">
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
              {errors.time && <div className="errorText">{errors.time}</div>}

              <input
                type="text"
                placeholder="Description"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              {errors.type && <div className="errorText">{errors.type}</div>}

              <input
                type="text"
                placeholder="Zone"
                value={formData.zone}
                onChange={(e) =>
                  setFormData({ ...formData, zone: e.target.value })
                }
              />
              {errors.zone && <div className="errorText">{errors.zone}</div>}

              <div className="modalButtons">
                <button onClick={handleSubmit} className="saveBtn">
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modalOverlay">
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
          <div className="modalOverlay" onClick={() => setShowAllModal(false)}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3>All Scheduled Events</h3>
                <button
                  className="exportIconBtn"
                  onClick={() => setShowExportModal(true)}
                  aria-label="Export to PDF"
                >
                  <span role="img" aria-label="pdf">📄</span>
                  <span className="exportTooltip">Export to PDF</span>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="allSchedulesSearchInput"
                value={allSchedulesSearchTerm}
                onChange={(e) => setAllSchedulesSearchTerm(e.target.value)}
              />
              <div className="allSchedulesList">
                {Object.keys(filteredAllSchedules).length === 0 ? (
                  <p>No schedules found.</p>
                ) : (
                  Object.entries(filteredAllSchedules).map(([key, entries]) => (
                    <div key={key} className="scheduleGroup">
                      <h4>{key}</h4>
                      {entries.map((entry, index) => (
                        <div key={index} className="collection">
                          <span className="time">{entry.time}</span>
                          <div className="details">
                            <span className="type">{entry.type}</span>
                            <span className="zone">Zone {entry.zone}</span>
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
              <div className="modalButtons">
                <button onClick={() => setShowAllModal(false)} className="cancelBtn">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ExportPDFModal
        show={showExportModal}
        onClose={() => setShowExportModal(false)}
        collections={collections}
      />
    </div>
  );
};

export default WeeklySchedule;
