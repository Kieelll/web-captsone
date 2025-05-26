import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../adminData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./AdminAccounts.scss"


const adminInfo = {
  adminID: "A#12",
  role: "Data Manager",
  userName: "Juan Dela Cruz",
  history: [
    {
      action: "Edited",
      entity: "UserID: U#5",
      table: "users",
      timestamp: "08/05/2025 | 08:27 AM"
    },
    {
      action: "Deleted",
      entity: "UserID: U#8",
      table: "users",
      timestamp: "08/05/2025 | 08:02 AM"
    },
    {
      action: "Edited",
      entity: "TransactionID: T#2",
      table: "transaction",
      timestamp: "08/05/2025 | 08:50 AM"
    },
    {
      action: "Deleted",
      entity: "TransactionID: T#5",
      table: "transaction",
      timestamp: "09/10/2025 | 09:01 AM"
    },
    {
      action: "Deleted",
      entity: "LocationID: L#10",
      table: "Locations",
      timestamp: "09/15/2025 | 11:04 AM"
    },
    {
      action: "Added",
      entity: "LocationID: L#12",
      table: "Locations",
      timestamp: "09/15/2025 | 12:10 AM"
    },
    {
      action: "Deleted",
      entity: "LocationID: L#10",
      table: "Locations",
      timestamp: "09/15/2025 | 11:04 AM"
    },
    {
      action: "Added",
      entity: "LocationID: L#12",
      table: "Locations",
      timestamp: "09/15/2025 | 12:10 AM"
    },
    {
      action: "Deleted",
      entity: "LocationID: L#10",
      table: "Locations",
      timestamp: "09/15/2025 | 11:04 AM"
    },
    {
      action: "Added",
      entity: "LocationID: L#12",
      table: "Locations",
      timestamp: "09/15/2025 | 12:10 AM"
    },
    {
      action: "Deleted",
      entity: "LocationID: L#10",
      table: "Locations",
      timestamp: "09/15/2025 | 11:04 AM"
    },
    {
      action: "Added",
      entity: "LocationID: L#12",
      table: "Locations",
      timestamp: "09/15/2025 | 12:10 AM"
    }
  ]
};

const AdminAccounts = () => {
  const [data, setData] = useState(userRows);

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
            <Link to="/users/new" className="link">
              Add New
            </Link>
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
          <p><strong>AdminID:</strong> {adminInfo.adminID}</p>
          <p><strong>Role:</strong> {adminInfo.role}</p>
          <p><strong>User Name:</strong> {adminInfo.userName}</p>
        </div>

        <div className="historyInfo">
          {adminInfo.history.map((item, index) => (
            <p key={index}>
              {item.action} <strong>{item.entity}</strong> in {item.table} table<br />
              <span className="timestamp">({item.timestamp})</span>
            </p>
          ))}
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default AdminAccounts
