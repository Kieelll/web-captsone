import React, { useState, useEffect } from "react";
import "./ExportAdminAccountsModal.scss";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const ExportAdminAccountsModal = ({ show, onClose, adminAccounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!show) {
      setSelected({});
      setSearchTerm('');
    }
  }, [show]);

  if (!show) return null;

  const filteredAdminAccounts = adminAccounts.filter(account => 
    account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (accountId) => {
    setSelected(prev => ({ ...prev, [accountId]: !prev[accountId] }));
  };

  const handleSelectAll = () => {
    const all = {};
    filteredAdminAccounts.forEach(account => {
      all[account.id] = true;
    });
    setSelected(all);
  };

  const handleExport = () => {
    const selectedAccounts = filteredAdminAccounts.filter(account => selected[account.id]);

    if (selectedAccounts.length === 0) {
      alert("Please select at least one admin account to export.");
      return;
    }

    const doc = new jsPDF();
    const tableColumn = ["Admin ID", "Role", "User Name"];
    const tableRows = [];

    selectedAccounts.forEach(account => {
      const accountData = [
        account.id,
        account.role,
        account.username,
      ];
      tableRows.push(accountData);
    });

    autoTable(doc, {
      startY: 20,
      headStyles: { fillColor: [46, 125, 50] }, // Green header
      alternateRowStyles: { fillColor: [239, 247, 239] }, // Light green alternate rows
      styles: { fontSize: 10, cellPadding: 3 },
      margin: { top: 10, left: 10, right: 10, bottom: 10 },
      columns: tableColumn,
      body: tableRows,
    });

    // Add title
    doc.setFontSize(18);
    doc.setTextColor(46, 125, 50);
    doc.text("Admin Account Report", 105, 15, { align: "center" });

    doc.save("admin-accounts-report.pdf");
    onClose();
  };

  return (
    <div className="exportAdminAccountsModalOverlay">
      <div className="exportAdminAccountsModalContent">
        <h2>Export Admin Accounts</h2>
        <div className="exportSection">
          <label>Search Admin Accounts:</label>
          <input
            type="text"
            placeholder="Search by name or role..."
            className="exportSearchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="exportSection">
          <label>Accounts to Export:</label>
          <button className="selectAllBtn" onClick={handleSelectAll}>Select All</button>
          <div className="exportAccountsList">
            {filteredAdminAccounts.length === 0 ? <div className="noAccounts">No admin accounts found.</div> : 
              filteredAdminAccounts.map((account) => (
                <div key={account.id} className="exportAccountItem">
                  <label>
                    <input
                      type="checkbox"
                      checked={!!selected[account.id]}
                      onChange={() => handleSelect(account.id)}
                    />
                    <span>{account.username} ({account.role})</span>
                  </label>
                </div>
              ))
            }
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

export default ExportAdminAccountsModal; 