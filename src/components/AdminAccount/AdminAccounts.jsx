import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../adminData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./AdminAccounts.scss"
import ExportAdminAccountsModal from "../ExportAdminAccountsModal/ExportAdminAccountsModal";


const adminInfo = {
  adminID: "A#12",
  role: "Data Manager",
  userName: "Juan Dela Cruz",
  history: [
    {
      action: "Edited",
      entity: "UserID: U#5",
      table: "users",
      timestamp: "08/05/2025 | 08:27 AM",
      adminName: "Maria Santos",
      adminRole: "Head"
    },
    {
      action: "Deleted",
      entity: "UserID: U#8",
      table: "users",
      timestamp: "08/05/2025 | 08:02 AM",
      adminName: "John Reyes",
      adminRole: "Staff"
    },
    {
      action: "Edited",
      entity: "TransactionID: T#2",
      table: "transaction",
      timestamp: "08/05/2025 | 08:50 AM",
      adminName: "Sarah Garcia",
      adminRole: "Secretary"
    },
    {
      action: "Deleted",
      entity: "TransactionID: T#5",
      table: "transaction",
      timestamp: "09/10/2025 | 09:01 AM",
      adminName: "Maria Santos",
      adminRole: "Head"
    },
    {
      action: "Deleted",
      entity: "LocationID: L#10",
      table: "Locations",
      timestamp: "09/15/2025 | 11:04 AM",
      adminName: "John Reyes",
      adminRole: "Staff"
    },
    {
      action: "Added",
      entity: "LocationID: L#12",
      table: "Locations",
      timestamp: "09/15/2025 | 12:10 AM",
      adminName: "Sarah Garcia",
      adminRole: "Secretary"
    },
    {
      action: "Deleted",
      entity: "LocationID: L#10",
      table: "Locations",
      timestamp: "09/15/2025 | 11:04 AM",
      adminName: "Maria Santos",
      adminRole: "Head"
    },
    {
      action: "Added",
      entity: "LocationID: L#12",
      table: "Locations",
      timestamp: "09/15/2025 | 12:10 AM",
      adminName: "John Reyes",
      adminRole: "Staff"
    },
    {
      action: "Deleted",
      entity: "LocationID: L#10",
      table: "Locations",
      timestamp: "09/15/2025 | 11:04 AM",
      adminName: "Sarah Garcia",
      adminRole: "Secretary"
    },
    {
      action: "Added",
      entity: "LocationID: L#12",
      table: "Locations",
      timestamp: "09/15/2025 | 12:10 AM",
      adminName: "Maria Santos",
      adminRole: "Head"
    },
    {
      action: "Deleted",
      entity: "LocationID: L#10",
      table: "Locations",
      timestamp: "09/15/2025 | 11:04 AM",
      adminName: "John Reyes",
      adminRole: "Staff"
    },
    {
      action: "Added",
      entity: "LocationID: L#12",
      table: "Locations",
      timestamp: "09/15/2025 | 12:10 AM",
      adminName: "Sarah Garcia",
      adminRole: "Secretary"
    }
  ]
};

const AdminAccounts = () => {
  const [data, setData] = useState(userRows);
  const [showExportModal, setShowExportModal] = useState(false);
  const [historySearchTerm, setHistorySearchTerm] = useState('');

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to={`/edit/${params.row.id}`} className="viewButton">
              Edit
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div> */}
             <button className="viewButton" >
            View
          </button>
          <button className="deleteButton" onClick={() => handleDelete(params.row.id)}>
            Delete
          </button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="adminAccount">
      <div className="datatableTitle">
            Admin Table
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link to="/users/new" className="link">
                Add New
              </Link>
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

      <div className="adminContents">
         <div className="adminAccountTable">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={[4]}
          rowsPerPageOptions={[4]}
          checkboxSelection
          
        />
      </div>

      <div className="adminHistory">
        <div className="historyHeader">
          <p className="title">History</p>
          <input 
            type="text" 
            placeholder="Search history..." 
            value={historySearchTerm}
            onChange={(e) => setHistorySearchTerm(e.target.value)}
            className="historySearchInput"
          />
          <p><strong>AdminID:</strong> {adminInfo.adminID}</p>
          <p><strong>Role:</strong> {adminInfo.role}</p>
          <p><strong>User Name:</strong> {adminInfo.userName}</p>
        </div>

        <div className="historyInfo">
          {adminInfo.history
            .filter(item => 
              item.action.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
              item.entity.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
              item.table.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
              item.timestamp.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
              item.adminName.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
              item.adminRole.toLowerCase().includes(historySearchTerm.toLowerCase())
            )
            .map((item, index) => (
            <p key={index}>
              {item.action} <strong>{item.entity}</strong> in {item.table} table<br />
              <span className="adminInfo">Edited by: {item.adminName} ({item.adminRole})</span><br />
              <span className="timestamp">({item.timestamp})</span>
            </p>
          ))}
        </div>
      </div>
      </div>

      <ExportAdminAccountsModal 
        show={showExportModal}
        onClose={() => setShowExportModal(false)}
        adminAccounts={data}
      />
    </div>
  );
};

export default AdminAccounts
