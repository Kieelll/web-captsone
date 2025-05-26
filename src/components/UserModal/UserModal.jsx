import React from 'react';
import './UserModal.scss';

const UserModal = ({ isOpen, onClose, onSave, mode, formData, setFormData }) => {
  if (!isOpen) return null;

  const isEdit = mode === 'edit';

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const showLocation = formData.category && formData.category !== 'Basic User';

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <input name="firstName" placeholder="First Name..." value={formData.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name..." value={formData.lastName} onChange={handleChange} />
        <input name="email" placeholder="Email..." value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone..." value={formData.phone} onChange={handleChange} />

        <select name="category" value={formData.category} onChange={handleChange}>
          <option>Basic User</option>
          <option>Owner</option>
          <option>Resident</option>
        </select>

        {showLocation && (
          <>
            <label>Location Data:</label>
            <input name="locationName" placeholder="Location Name..." value={formData.locationName} onChange={handleChange} />
            <input name="area" placeholder="Area..." value={formData.area} onChange={handleChange} />
            <input name="barangay" placeholder="Barangay..." value={formData.barangay} onChange={handleChange} />
            <input name="street" placeholder="Street..." value={formData.street} onChange={handleChange} />
            <input name="longitude" placeholder="Longitude..." value={formData.longitude} onChange={handleChange} />
            <input name="latitude" placeholder="Latitude..." value={formData.latitude} onChange={handleChange} />
          </>
        )}

        <div className="modalButtons">
          <button className="saveBtn" onClick={onSave}>
            {isEdit ? 'EDIT USER' : showLocation ? 'ADD USER & LOCATION' : 'ADD USER'}
          </button>
          <button className="cancelBtn" onClick={onClose}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
