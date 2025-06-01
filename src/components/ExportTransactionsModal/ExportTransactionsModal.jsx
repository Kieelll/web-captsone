import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect, useState } from "react";
import "./ExportTransactionsModal.scss";

const ExportTransactionsModal = ({ show, onClose, transactions }) => {
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

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction => 
    Object.values(transaction).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelect = (transactionId) => {
    setSelected(prev => ({ ...prev, [transactionId]: !prev[transactionId] }));
  };

  const handleSelectAll = () => {
    const all = {};
    filteredTransactions.forEach(transaction => {
      all[transaction.id] = true; // Assuming transaction.id is unique
    });
    setSelected(all);
  };

  const handleExport = () => {
    const selectedTransactions = filteredTransactions.filter(transaction => selected[transaction.id]);

    if (selectedTransactions.length === 0) {
      alert("Please select at least one transaction to export.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Transaction List", 14, 20);

    const tableColumns = [
      "Transaction ID",
      "Name",
      "Date",
      "Amount",
      "Status",
      "Payment Method"
    ];
    
    const tableRows = selectedTransactions.map(transaction => [
      transaction.transactionID || '',
      transaction.name || '',
      transaction.date || '',
      transaction.amount || '',
      transaction.status || '',
      transaction.paymentMethod || ''
    ]);

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 12 },
      headStyles: { fillColor: [67, 160, 71] },
      margin: { left: 14, right: 14 },
    });

    doc.save("transactions.pdf");
    onClose();
  };

  return (
    <div className="exportTransactionsModalOverlay">
      <div className="exportTransactionsModalContent">
        <h2>Export Transaction List</h2>
        <div className="exportSection">
          <label>Search Transactions:</label>
          <input
            type="text"
            placeholder="Search transactions..."
            className="exportSearchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="exportSection">
          <label>Transactions to Export:</label>
          <button className="selectAllBtn" onClick={handleSelectAll}>Select All</button>
          <div className="exportTransactionsList">
            {filteredTransactions.length === 0 ? <div className="noTransactions">No transactions found.</div> :
              filteredTransactions.map((transaction) => (
                <label key={transaction.id} className="exportTransactionItem">
                  <input
                    type="checkbox"
                    checked={!!selected[transaction.id]}
                    onChange={() => handleSelect(transaction.id)}
                  />
                  <span className="transactionId">{transaction.transactionID || ''}</span>
                  <span className="userName">{transaction.name || ''}</span>
                  <span className="transactionDate">{transaction.date || ''}</span>
                  <span className="transactionAmount">{transaction.amount || ''}</span>
                  <span className="transactionStatus">{transaction.status || ''}</span>
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

export default ExportTransactionsModal; 