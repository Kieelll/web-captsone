// CategoryModal.jsx
import React, { useState } from "react";
import "./StockModal.scss"; // reuse the same styles

const CategoryModal = ({ isOpen, onClose, onSave }) => {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!label.trim()) newErrors.label = "Label is required.";
    if (!value || isNaN(value) || Number(value) < 0) newErrors.value = "Value must be a number ≥ 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({ label, value: parseInt(value), input: parseInt(value) });
      setLabel("");
      setValue("");
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <input
          type="text"
          placeholder="Category Label (e.g., 1kg)"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            setErrors(prev => ({ ...prev, label: "" }));
          }}
        />
        {errors.label && <div className="errorText">{errors.label}</div>}

        <input
          type="number"
          placeholder="Stock Value"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setErrors(prev => ({ ...prev, value: "" }));
          }}
        />
        {errors.value && <div className="errorText">{errors.value}</div>}

        <div className="modalButtons">
          <button className="saveBtn" onClick={handleSave}>Add Category</button>
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
