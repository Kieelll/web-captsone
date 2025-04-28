import "./table.scss"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import images from '../../images/delivery.png'

const List = () => {
  const rows = [
    {
      id: 235123,
      quantity: 2,
      date: "23 April",
      amount: 50,
      method: "COD",
      status: "delivered",
      driver: "Mang Kepweng",
      proof: "delivery.png"
    },
    {
      id: 235123,
      quantity: 2,
      date: "23 April",
      amount: 50,
      method: "COD",
      status: "delivered",
      driver: "Mang Kepweng",
      proof: "delivery.png"
    },
    {
      id: 235123,
      quantity: 2,
      date: "23 April",
      amount: 50,
      method: "COD",
      status: "pending",
      driver: "Mang Kepweng",
      proof: "delivery.png"
    },
    {
      id: 235123,
      quantity: 2,
      date: "23 April",
      amount: 50,
      method: "COD",
      status: "delivered",
      driver: "Mang Kepweng",
      proof: "delivery.png"
    },
    {
      id: 235123,
      quantity: 2,
      date: "23 April",
      amount: 50,
      method: "COD",
      status: "pending",
      driver: "Mang Kepweng",
      proof: "delivery.png"
    },
    {
      id: 235123,
      quantity: 2,
      date: "23 April",
      amount: 50,
      method: "COD",
      status: "delivered",
      driver: "Mang Kepweng",
      proof: "delivery.png"
    },
  ]

  
  return (
    <div className="table">
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Proof of Delivery</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}>
               <TableCell className="tableCell"> {row.id} </TableCell>
               <TableCell className="tableCell">{row.quantity}</TableCell>
               <TableCell className="tableCell">{row.date}</TableCell>
               <TableCell className="tableCell">{row.amount}</TableCell>
               <TableCell className="tableCell">{row.method}</TableCell>
               <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
               <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={images}
                  alt=""
                  className="driver" />
                  {row.driver}
                </div>
               </TableCell>

               {/* <TableCell className="tableCell">
               <img
                    src={images}
                    alt={`Proof for order ${row.id}`}
                  />
                </TableCell>  */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
export default List