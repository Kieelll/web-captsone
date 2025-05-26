import React from "react";
import "./LocationModal.scss";

const LocationModal = ({ isOpen, onClose, onSave, mode, formData, setFormData }) => {
  if (!isOpen) return null;

  const isEdit = mode === "edit";

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <input type="text" name="name" placeholder="Location Name..." value={formData.name} onChange={handleChange} />
        <input type="text" name="area" placeholder="Area..." value={formData.area} onChange={handleChange} />
        <input type="text" name="barangay" placeholder="Barangay..." value={formData.barangay} onChange={handleChange} />
        <input type="text" name="street" placeholder="Street..." value={formData.street} onChange={handleChange} />
        <input type="text" name="longitude" placeholder="Longitude..." value={formData.longitude} onChange={handleChange} />
        <input type="text" name="latitude" placeholder="Latitude..." value={formData.latitude} onChange={handleChange} />

        <div className="modalButtons">
          <button className="saveBtn" onClick={onSave}>
            {isEdit ? "EDIT LOCATION" : "ADD LOCATION"}
          </button>
          <button className="cancelBtn" onClick={onClose}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
