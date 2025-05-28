import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./inventory.scss";

const Inventory = () => {
  return (
    <div className="inventory">
      <Sidebar />
      <div className="inventoryContainer">
        <Navbar />
        <div className="content">
          <h1>Inventory Management</h1>
          <div className="inventoryContent">
            {/* Add your inventory content here */}
            <p>This is the inventory management section</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory

