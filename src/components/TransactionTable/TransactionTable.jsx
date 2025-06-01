import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { userColumns, userRows } from '../../TransactionData';
import ExportTransactionsModal from '../ExportTransactionsModal/ExportTransactionsModal';
import './TransactionTable.scss';

const TransactionTable = () => {
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
      width: 180,
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
          <button className="link" onClick={() => setSelectedTransaction({})}>Add New</button>
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

      <div className="tableWrapper">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      {selectedTransaction && (
        <div className="transactionDetails">
          <h2>Transaction Details</h2>
          <div className="detailsContent">
            <div className="detailItem">
              <span className="itemLabel">Transaction ID:</span>
              <span className="itemValue">{selectedTransaction.transactionID || ''}</span>
            </div>
            <div className="detailItem">
              <span className="itemLabel">Customer Name:</span>
              <span className="itemValue">{selectedTransaction.name || ''}</span>
            </div>
            <div className="detailItem">
              <span className="itemLabel">Date:</span>
              <span className="itemValue">{selectedTransaction.date || ''}</span>
            </div>
            <div className="detailItem">
              <span className="itemLabel">Amount:</span>
              <span className="itemValue">{selectedTransaction.amount || ''}</span>
            </div>
            <div className="detailItem">
              <span className="itemLabel">Status:</span>
              <span className="itemValue">{selectedTransaction.status || ''}</span>
            </div>
            <div className="detailItem">
              <span className="itemLabel">Payment Method:</span>
              <span className="itemValue">{selectedTransaction.paymentMethod || ''}</span>
            </div>
          </div>
          <button className="closeButton" onClick={() => setSelectedTransaction(null)}>
            Close
          </button>
        </div>
      )}

      <ExportTransactionsModal
        show={showExportModal}
        onClose={() => setShowExportModal(false)}
        transactions={data}
      />
    </div>
  );
};

export default TransactionTable;
