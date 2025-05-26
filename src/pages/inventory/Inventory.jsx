import "./inventory.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"

export const Inventory = () => {
  return (
    <div className="inventory">
      <Sidebar />
      <div className="inventoryContainer">
      This is inventory
      </div>
    </div>
  )
}

export default Inventory

