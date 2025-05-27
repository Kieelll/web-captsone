import React, { useState, useEffect } from "react";
import "./ExportUsersModal.scss";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ExportUsersModal = ({ show, onClose, users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState({});

  useEffect(() => {
    // Reset selected when modal is shown/hidden
    if (!show) {
      setSelected({});
      setSearchTerm('');
    }
  }, [show]);

  if (!show) return null;

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    Object.values(user).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelect = (userId) => {
    setSelected(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleSelectAll = () => {
    const all = {};
    filteredUsers.forEach(user => {
      all[user.id] = true;
    });
    setSelected(all);
  };

  const handleExport = () => {
    const selectedUsers = filteredUsers.filter(user => selected[user.id]);

    if (selectedUsers.length === 0) {
      alert("Please select at least one user to export.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("User List", 14, 20);

    // Define table columns based on likely user data structure
    const tableColumns = ["ID", "Category", "First Name", "Last Name", "Facility Name", "Email", "Phone", "Location ID"];
    
    // Map selected user data to table rows
    const tableRows = selectedUsers.map(user => [
      user.id,
      user.category || '',
      user.firstName || '',
      user.lastName || '',
      user.facilityName || '',
      user.email || '',
      user.phone || '',
      user.locationID || '',
    ]);

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 10 }, // Slightly smaller font for more columns
      headStyles: { fillColor: [67, 160, 71] },
      margin: { left: 14, right: 14 },
    });

    doc.save("users-list.pdf");
    onClose();
  };

  return (
    <div className="exportUsersModalOverlay">
      <div className="exportUsersModalContent">
        <h2>Export User List</h2>
        <div className="exportSection">
          <label>Search Users:</label>
          <input
            type="text"
            placeholder="Search users..."
            className="exportSearchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="exportSection">
          <label>Users to Export:</label>
          <button className="selectAllBtn" onClick={handleSelectAll}>Select All</button>
          <div className="exportUsersList">
            {filteredUsers.length === 0 ? <div className="noUsers">No users found.</div> :
              filteredUsers.map((user) => (
                <label key={user.id} className="exportUserItem">
                  <input
                    type="checkbox"
                    checked={!!selected[user.id]}
                    onChange={() => handleSelect(user.id)}
                  />
                  <span className="userName">{`${user.firstName || ''} ${user.lastName || ''}`}</span>
                  <span className="userEmail">{user.email || ''}</span>
                  {/* Add more user info spans as needed */}
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

export default ExportUsersModal; 