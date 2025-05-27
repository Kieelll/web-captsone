import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userRows, userColumns } from '../../TransactionData';
import './TransactionTable.scss';
import { Link } from 'react-router-dom';
import ExportTransactionsModal from '../ExportTransactionsModal/ExportTransactionsModal';

export const TransactionTable = () => {
  const [data, setData] = useState(userRows);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    if (selectedTransaction?.id === id) setSelectedTransaction(null);
  };

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <div className="cellAction">
          <button className="viewButton" onClick={() => handleView(params.row)}>
            View
          </button>
          <button className="deleteButton" onClick={() => handleDelete(params.row.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="transactionTable">
      <div className="datatableTitle">
        Transaction Table
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/users/new" className="link">Add New</Link>
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

      <div className="transactionContents">
        <div className="transactionGrid">
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={6}
            rowsPerPageOptions={[]}
            checkboxSelection
          />
        </div>

        <div className="transactionDescription scrollableDetails">
          {selectedTransaction ? (
            <div className="transactionDetailsCard">
              <h3>Delivery Details</h3>
              <p><strong>Name:</strong> {selectedTransaction.name}</p>
              <p><strong>Phone:</strong> {selectedTransaction.phone}</p>
              <p><strong>Location:</strong> {selectedTransaction.location}</p>
              <p><strong>Order Status:</strong> {selectedTransaction.orderStatus}</p>
              <p><strong>Order Date:</strong> {selectedTransaction.orderDate}</p>
              <p><strong>Mode of Payment:</strong> {selectedTransaction.paymentMethod}</p>
              <p><strong>Delivery Date:</strong> {selectedTransaction.deliveryDate}</p>

              <h3>Product Details</h3>
              {selectedTransaction.products?.map((product, index) => (
                <div key={index} className="productItem">
                  {/* Optional: Display image based on product name */}
                  {/* <img src={`/images/${product.name.toLowerCase().replace(/\s/g, '')}.png`} alt={product.name} className="productImage" /> */}
                  <div className="productInfo">
                    <p><strong>{product.name}</strong></p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {product.price}</p>
                  </div>
                </div>
              ))}

              <div className="productTotals">
                <p><strong>Total Quantity:</strong> {selectedTransaction.quantity}</p>
                <p><strong>Total Amount:</strong> {selectedTransaction.totalPrice}</p>
              </div>
            </div>
          ) : (
            <div className="noSelection">Select a transaction to view details.</div>
          )}
        </div>
      </div>

      <ExportTransactionsModal
        show={showExportModal}
        onClose={() => setShowExportModal(false)}
        transactions={data}
      />
    </div>
  );
};

export default TransactionTable;
