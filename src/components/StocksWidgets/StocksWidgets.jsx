import React, { useState } from 'react';
import './stocksWidgets.scss';
import StockModal from '../StockModal/StockModal';
import ExportStocksModal from '../ExportStocksModal/ExportStocksModal';

export const StocksWidgets = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Soil Conditioner',
      categories: [
        { label: '1kg', value: 30, input: 30 },
        { label: '5kg', value: 40, input: 40 },
        { label: '15kg', value: 20, input: 20 },
        { label: '25kg', value: 10, input: 10 },
      ],
    },
    {
      id: 2,
      title: 'Number of Hogs Will',
      categories: [{ label: 'Default', value: 100, input: 100 }],
    },
    {
      id: 3,
      title: 'Number of Food Waste being Processed',
      categories: [{ label: 'Default', value: 100, input: 100 }],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', stock: '' });

  const handleChange = (cardId, categoryLabel, newInput) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? {
              ...card,
              categories: card.categories.map(cat =>
                cat.label === categoryLabel
                  ? { ...cat, input: parseInt(newInput) || 0 }
                  : cat
              ),
            }
          : card
      )
    );
  };

  const handleUpdate = (cardId, categoryLabel) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId
          ? {
              ...card,
              categories: card.categories.map(cat =>
                cat.label === categoryLabel
                  ? { ...cat, value: cat.input }
                  : cat
              ),
            }
          : card
      )
    );
  };

  const handleTitleChange = (id, newTitle) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, title: newTitle } : card
    ));
  };

  const handleAddCardClick = () => {
    setFormData({ title: '', stock: '' });
    setShowModal(true);
  };

  const handleConfirmAdd = () => {
    const newId = cards.length ? cards[cards.length - 1].id + 1 : 1;
    const parsedStock = parseInt(formData.stock) || 0;
    const newCard = {
      id: newId,
      title: formData.title.trim() || `New Stock ${newId}`,
      categories: [{ label: 'Default', value: parsedStock, input: parsedStock }],
    };
    setCards([...cards, newCard]);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="stocksContainer">
      <div className="headerSection">
        Stock Information
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="addStockButton" onClick={handleAddCardClick}>
            + Add Stock Card
          </button>
          <div className="exportButtonContainer">
            <button
              className="exportIconBtn"
              onClick={() => setShowExportModal(true)}
              aria-label="Export to PDF"
            >
              <span role="img" aria-label="pdf">📄</span>
            </button>
            <span className="exportTooltip">Export to PDF</span>
          </div>
        </div>
      </div>

      <div className="cardsWrapper">
        {cards.map(card => (
          <div className="stockCard" key={card.id}>
            <input
              className="titleInput"
              value={card.title}
              onChange={(e) => handleTitleChange(card.id, e.target.value)}
            />

            {card.categories.map((cat, index) => (
              <div className="stockRow" key={cat.label + index}>
                <span>
                  {cat.label !== 'Default' ? `${cat.label}: ` : ''}
                  Current: <span className="value">{cat.value}</span>
                </span>
                <div className="changeInput">
                  <label>Change to:</label>
                  <input
                    type="number"
                    value={cat.input}
                    onChange={(e) => handleChange(card.id, cat.label, e.target.value)}
                  />
                </div>
                <button
                  className="updateButton"
                  onClick={() => handleUpdate(card.id, cat.label)}
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <StockModal
        isOpen={showModal}
        onClose={handleCancel}
        onSave={handleConfirmAdd}
        formData={formData}
        setFormData={setFormData}
      />

      <ExportStocksModal
        show={showExportModal}
        onClose={() => setShowExportModal(false)}
        stocks={cards}
      />
    </div>
  );
};

export default StocksWidgets;
