import React, { useState, useEffect } from "react";
import "./ExportTransactionsModal.scss";
import jsPDF from "jspdf";

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
    
    selectedTransactions.forEach((transaction, index) => {
      // Add a new page for each transaction except the first one
      if (index > 0) {
        doc.addPage();
      }

      // Set initial position
      let yPos = 20;

      // Header
      doc.setFontSize(20);
      doc.setTextColor(46, 125, 50); // Green color
      doc.text("Greenconnect Official Receipt", 105, yPos, { align: "center" });
      yPos += 10;

      // Company Info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black color
      doc.text("Barangay Concepcion Uno, Marikina", 105, yPos, { align: "center" });
      yPos += 6;
      doc.text("Tel: (02) 1234-5678", 105, yPos, { align: "center" });
      yPos += 15;

      // Transaction Details
      doc.setFontSize(10);
      doc.text("Transaction Details:", 14, yPos);
      yPos += 7;
      doc.text(`Receipt No: ${transaction.transactionID || ''}`, 14, yPos);
      yPos += 7;
      doc.text(`Date: ${transaction.date || ''}`, 14, yPos);
      yPos += 7;
      doc.text(`Status: ${transaction.orderStatus || ''}`, 14, yPos);
      yPos += 15;

      // Customer Details
      doc.setFontSize(10);
      doc.text("Customer Information:", 14, yPos);
      yPos += 7;
      doc.text(`Name: ${transaction.name || ''}`, 14, yPos);
      yPos += 7;
      doc.text(`Phone: ${transaction.phone || ''}`, 14, yPos);
      yPos += 7;
      doc.text(`Address: ${transaction.location || ''}`, 14, yPos);
      yPos += 15;

      // Order Details
      doc.setFontSize(10);
      doc.text("Order Information:", 14, yPos);
      yPos += 7;
      doc.text(`Order Date: ${transaction.orderDate || ''}`, 14, yPos);
      yPos += 7;
      doc.text(`Delivery Date: ${transaction.deliveryDate || ''}`, 14, yPos);
      yPos += 7;
      doc.text(`Payment Method: ${transaction.paymentMethod || ''}`, 14, yPos);
      yPos += 15;

      // Products Table Header
      doc.setFontSize(10);
      doc.text("Items Purchased:", 14, yPos);
      yPos += 7;

      // Draw table header
      doc.setDrawColor(46, 125, 50); // Green color
      doc.setLineWidth(0.5);
      doc.line(14, yPos, 196, yPos);
      yPos += 7;

      // Table headers
      doc.setFont(undefined, 'bold');
      doc.text("Item", 14, yPos);
      doc.text("Quantity", 120, yPos);
      doc.text("Price", 160, yPos);
      yPos += 7;
      doc.line(14, yPos, 196, yPos);
      yPos += 7;

      // Reset font
      doc.setFont(undefined, 'normal');

      // Products
      if (transaction.products && transaction.products.length > 0) {
        transaction.products.forEach(product => {
          doc.text(product.name || '', 14, yPos);
          doc.text(`${product.quantity || ''}`, 120, yPos);
          doc.text(`₱${product.price || ''}`, 160, yPos);
          yPos += 7;
        });
      } else {
        doc.text("No items purchased", 14, yPos);
        yPos += 7;
      }

      // Draw bottom line of table
      doc.line(14, yPos, 196, yPos);
      yPos += 15;

      // Totals
      doc.setFont(undefined, 'bold');
      doc.text("Total Quantity:", 120, yPos);
      doc.text(`${transaction.quantity || ''}`, 160, yPos);
      yPos += 7;
      doc.text("Total Amount:", 120, yPos);
      doc.text(`₱${transaction.totalPrice || ''}`, 160, yPos);
      yPos += 15;

      // Footer
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128); // Gray color
      doc.text("Thank you for your business!", 105, yPos, { align: "center" });
      yPos += 5;
      doc.text("This is a computer-generated receipt. No signature required.", 105, yPos, { align: "center" });
    });

    // Save all transactions in a single PDF
    doc.save("greenconnect-receipts.pdf");
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
                  {/* Add more transaction info spans as needed for display in modal */}
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