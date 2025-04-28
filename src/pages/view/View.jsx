import "./view.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Table from "../../components/table/Table"


const View = () => {
  return(
    <div className="view">
      <Sidebar />
      <div className="viewContainer">
        <Navbar />
        <div className="transacContainer">
          <div className="transacTitle">
            Latest Transactions
          </div>
          <Table />
        </div>
      </div>

    </div>
  )
}
export default View