import React, { useState } from "react";
import "./StockModal.scss";

const StockModal = ({ isOpen, onClose, onSave, mode, formData, setFormData }) => {
  const isEdit = mode === "edit";
  const [errors, setErrors] = useState({}); // Moved above any conditional return

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "stock" ? value.replace(/\D/g, "") : value
    }));
    setErrors(prev => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "Title is required.";
    }

    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock must be a valid number ≥ 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  if (!isOpen) return null; // now safe to return conditionally AFTER hooks

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <input
          type="text"
          name="title"
          placeholder="Stock Title..."
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <div className="errorText">{errors.title}</div>}

        <input
          type="number"
          name="stock"
          placeholder="Current Stock..."
          value={formData.stock}
          onChange={handleChange}
        />
        {errors.stock && <div className="errorText">{errors.stock}</div>}

        <div className="modalButtons">
          <button className="saveBtn" onClick={handleSave}>
            {isEdit ? "EDIT STOCK" : "ADD STOCK"}
          </button>
          <button className="cancelBtn" onClick={onClose}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default StockModal;
