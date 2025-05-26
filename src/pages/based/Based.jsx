import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Table from  '../../components/table/Table'
import "./based.scss"

 const Based = () => {
  return (
    <div className="based">
        <Sidebar />

      <div className="basedContainer">
        <Navbar />
        <Table />
      </div>
    </div>
  )
}
export default Based;