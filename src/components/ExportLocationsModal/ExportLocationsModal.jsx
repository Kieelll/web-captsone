import React, { useState, useEffect } from "react";
import "./ExportLocationsModal.scss";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportLocationsModal = ({ show, onClose, locations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState({});

  useEffect(() => {
    // Reset selected and search term when modal is shown/hidden
    if (!show) {
      setSelected({});
      setSearchTerm('');
    }
  }, [show]);

  if (!show) return null;

  // Filter locations based on search term
  const filteredLocations = locations.filter(location => 
    Object.values(location).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelect = (locationId) => {
    setSelected(prev => ({ ...prev, [locationId]: !prev[locationId] }));
  };

  const handleSelectAll = () => {
    const all = {};
    filteredLocations.forEach(location => {
      all[location.id] = true; // Assuming location.id is unique
    });
    setSelected(all);
  };

  const handleExport = () => {
    const selectedLocations = filteredLocations.filter(location => selected[location.id]);

    if (selectedLocations.length === 0) {
      alert("Please select at least one location to export.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Location List", 14, 20);

    // Define table columns for locations
    const tableColumns = ["Location ID", "Location Name", "Barangay", "Street", "Latitude", "Longitude"];
    
    // Map selected location data to table rows
    const tableRows = selectedLocations.map(location => [
      location.locationID || '',
      location.locationName || '',
      location.barangay || '',
      location.street || '',
      location.latitude || '',
      location.longitude || '',
    ]);

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 10 }, 
      headStyles: { fillColor: [67, 160, 71] },
      margin: { left: 14, right: 14 },
    });

    doc.save("locations-list.pdf");
    onClose();
  };

  return (
    <div className="exportLocationsModalOverlay">
      <div className="exportLocationsModalContent">
        <h2>Export Location List</h2>
        <div className="exportSection">
          <label>Search Locations:</label>
          <input
            type="text"
            placeholder="Search locations..."
            className="exportSearchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="exportSection">
          <label>Locations to Export:</label>
          <button className="selectAllBtn" onClick={handleSelectAll}>Select All</button>
          <div className="exportLocationsList">
            {filteredLocations.length === 0 ? <div className="noLocations">No locations found.</div> :
              filteredLocations.map((location) => (
                <label key={location.id} className="exportLocationItem">
                  <input
                    type="checkbox"
                    checked={!!selected[location.id]}
                    onChange={() => handleSelect(location.id)}
                  />
                  <span className="locationId">{location.locationID || ''}</span>
                  <span className="locationName">{location.locationName || ''}</span>
                  {/* Add more location info spans as needed for display in modal */}
                </label>
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

export default ExportLocationsModal; 