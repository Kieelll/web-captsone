import React, { useState, useEffect } from "react";
import "./ExportPDFModal.scss";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportPDFModal = ({ show, onClose, collections }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selected, setSelected] = useState({});
  const [exportSearchTerm, setExportSearchTerm] = useState('');

  useEffect(() => {
    // Reset selected and search term when modal is closed
    if (!show) {
      setSelected({});
      setExportSearchTerm('');
    }
  }, [show]);

  if (!show) return null;

  // Get all dates in range
  const getFilteredEntries = () => {
    const keys = Object.keys(collections).filter(date => {
      if (!startDate && !endDate) return true;
      if (startDate && date < startDate) return false;
      if (endDate && date > endDate) return false;
      return true;
    });
    // Filter by search term after date range
    return keys.map(date => ({ date, entries: collections[date].filter(entry => 
      entry.time.toLowerCase().includes(exportSearchTerm.toLowerCase()) ||
      entry.type.toLowerCase().includes(exportSearchTerm.toLowerCase()) ||
      entry.zone.toLowerCase().includes(exportSearchTerm.toLowerCase())
    ) }));
  };

  const filtered = getFilteredEntries();

  const handleSelect = (date, idx) => {
    setSelected(prev => ({ ...prev, [`${date}_${idx}`]: !prev[`${date}_${idx}`] }));
  };

  const handleSelectAll = () => {
    const all = {};
    filtered.forEach(({ date, entries }) => {
      entries.forEach((_, idx) => {
        all[`${date}_${idx}`] = true;
      });
    });
    setSelected(all);
  };

  const handleExport = () => {
    // Prepare table data
    const tableColumns = ["Date", "Time", "Description", "Zone"];
    const tableRows = [];
    filtered.forEach(({ date, entries }) => {
      entries.forEach((entry, idx) => {
        if (selected[`${date}_${idx}`]) {
          tableRows.push([
            date,
            entry.time,
            entry.type,
            entry.zone
          ]);
        }
      });
    });

    if (tableRows.length === 0) {
      alert("Please select at least one event to export.");
      return; // Stop the function here
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("History of Scheduled Events", 14, 20);
    doc.setFontSize(12);

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 12 },
      headStyles: { fillColor: [67, 160, 71] },
      margin: { left: 14, right: 14 },
    });

    doc.save("schedule-events.pdf");
    onClose();
  };

  return (
    <div className="exportModalOverlay">
      <div className="exportModalContent">
        <h2>Export to PDF</h2>
        <div className="exportSection">
          <label>Date Range:</label>
          <div className="datePickers">
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <span style={{ margin: '0 8px' }}>to</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
        </div>
        <div className="exportSection">
          <label>Events to Export:</label>
          <input
            type="text"
            placeholder="Search events..."
            className="exportSearchInput"
            value={exportSearchTerm}
            onChange={(e) => setExportSearchTerm(e.target.value)}
          />
          <button className="selectAllBtn" onClick={handleSelectAll}>Select All</button>
          <div className="exportEventsList">
            {filtered.length === 0 ? <div className="noEvents">No events in range.</div> :
              filtered.map(({ date, entries }) => (
                <div key={date} className="exportGroup">
                  <div className="exportDate">{date}</div>
                  {entries.map((entry, idx) => (
                    <label key={idx} className="exportEvent">
                      <input
                        type="checkbox"
                        checked={!!selected[`${date}_${idx}`]}
                        onChange={() => handleSelect(date, idx)}
                      />
                      <span className="exportTime">{entry.time}</span>
                      <span className="exportType">{entry.type}</span>
                      <span className="exportZone">Zone {entry.zone}</span>
                    </label>
                  ))}
                </div>
              ))}
          </div>
        </div>
        <div className="exportModalButtons">
          <button className="exportBtn" onClick={handleExport}>Export</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExportPDFModal; 