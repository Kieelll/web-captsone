import React, { useState, useEffect } from "react";
import "./ExportStocksModal.scss";
import jsPDF from "jspdf";

const ExportStocksModal = ({ show, onClose, stocks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});

  useEffect(() => {
    // Reset selected and search term when modal is shown/hidden
    if (!show) {
      setSelected({});
      setSearchTerm('');
      setSelectedCategories({});
    }
  }, [show]);

  if (!show) return null;

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(stock => 
    stock.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (stockId) => {
    setSelected(prev => ({ ...prev, [stockId]: !prev[stockId] }));
  };

  const handleSelectAll = () => {
    const all = {};
    filteredStocks.forEach(stock => {
      all[stock.id] = true;
    });
    setSelected(all);
  };

  const handleCategorySelect = (stockId, categoryLabel) => {
    setSelectedCategories(prev => ({
      ...prev,
      [stockId]: {
        ...prev[stockId],
        [categoryLabel]: !prev[stockId]?.[categoryLabel]
      }
    }));
  };

  const handleExport = () => {
    const selectedStocks = filteredStocks.filter(stock => selected[stock.id]);

    if (selectedStocks.length === 0) {
      alert("Please select at least one stock to export.");
      return;
    }

    const doc = new jsPDF();
    
    selectedStocks.forEach((stock, index) => {
      // Add a new page for each stock except the first one
      if (index > 0) {
        doc.addPage();
      }

      // Set initial position
      let yPos = 20;

      // Header
      doc.setFontSize(20);
      doc.setTextColor(46, 125, 50); // Green color
      doc.text("Greenconnect Stock Report", 105, yPos, { align: "center" });
      yPos += 10;

      // Company Info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black color
      doc.text("Barangay Concepcion Uno, Marikina", 105, yPos, { align: "center" });
      yPos += 6;
      doc.text("Tel: (02) 1234-5678", 105, yPos, { align: "center" });
      yPos += 15;

      // Stock Details
      doc.setFontSize(14);
      doc.text(`Stock Item: ${stock.title}`, 14, yPos);
      yPos += 10;

      // Draw table header
      doc.setDrawColor(46, 125, 50); // Green color
      doc.setLineWidth(0.5);
      doc.line(14, yPos, 196, yPos);
      yPos += 7;

      // Table headers
      doc.setFont(undefined, 'bold');
      doc.text("Category", 14, yPos);
      doc.text("Current Stock", 120, yPos);
      yPos += 7;
      doc.line(14, yPos, 196, yPos);
      yPos += 7;

      // Reset font
      doc.setFont(undefined, 'normal');

      // Categories
      if (stock.categories && stock.categories.length > 0) {
        stock.categories.forEach(category => {
          // Only show selected categories if any are selected for this stock
          if (!selectedCategories[stock.id] || selectedCategories[stock.id][category.label]) {
            doc.text(category.label, 14, yPos);
            doc.text(`${category.value}`, 120, yPos);
            yPos += 7;
          }
        });
      } else {
        doc.text("No categories available", 14, yPos);
        yPos += 7;
      }

      // Draw bottom line of table
      doc.line(14, yPos, 196, yPos);
      yPos += 15;

      // Footer
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128); // Gray color
      doc.text("Generated on: " + new Date().toLocaleDateString(), 14, yPos);
      yPos += 5;
      doc.text("This is a computer-generated report. No signature required.", 105, yPos, { align: "center" });
    });

    // Save all stocks in a single PDF
    doc.save("greenconnect-stocks-report.pdf");
    onClose();
  };

  return (
    <div className="exportStocksModalOverlay">
      <div className="exportStocksModalContent">
        <h2>Export Stock Report</h2>
        <div className="exportSection">
          <label>Search Stocks:</label>
          <input
            type="text"
            placeholder="Search stocks..."
            className="exportSearchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="exportSection">
          <label>Stocks to Export:</label>
          <button className="selectAllBtn" onClick={handleSelectAll}>Select All</button>
          <div className="exportStocksList">
            {filteredStocks.length === 0 ? <div className="noStocks">No stocks found.</div> :
              filteredStocks.map((stock) => (
                <div key={stock.id} className="exportStockItem">
                  <label className="stockHeader">
                    <input
                      type="checkbox"
                      checked={!!selected[stock.id]}
                      onChange={() => handleSelect(stock.id)}
                    />
                    <span className="stockTitle">{stock.title}</span>
                  </label>
                  {selected[stock.id] && stock.categories && (
                    <div className="categoriesList">
                      {stock.categories.map((category, index) => (
                        <label key={category.label + index} className="categoryItem">
                          <input
                            type="checkbox"
                            checked={!!selectedCategories[stock.id]?.[category.label]}
                            onChange={() => handleCategorySelect(stock.id, category.label)}
                          />
                          <span>{category.label}: {category.value}</span>
                        </label>
                      ))}
                    </div>
                  )}
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

export default ExportStocksModal; 