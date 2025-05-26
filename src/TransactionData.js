// src/TransactionData.js

export const userColumns = [
  {
    field: "transactionID",
    headerName: "Transaction ID",
    flex: 1
  },
  {
    field: "userID",
    headerName: "User ID",
    flex: 1
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1
  },
{
  field: 'orderStatus',
  headerName: 'Status',
  flex: 1,
  renderCell: (params) => (
    <div className="statusWrapper">
      <div className={`statusCell ${params.value.toLowerCase()}`}>
        {params.value}
      </div>
    </div>
  )

},


    
];

export const userRows = [
  {
    id: 1,
    transactionID: "TXN-001",
    userID: "U-001",
    date: "20/02/2025",
    status: "Pending",
    name: "Sebastian Garcia",
    phone: "099230233232",
    location: "Barangay Concepcion Uno, Marikina City",
    orderStatus: "Pending",
    paymentMethod: "GCASH",
    deliveryDate: "27/02/2025",
    orderDate: "25/02/2026",
    totalPrice: "₱2000.00",
    quantity: "6",
    products: [
      { name: "Hogswill 1kg", quantity: 2, price: "₱100" },
      { name: "Soil Conditioner 10kg", quantity: 3, price: "₱300" },
      { name: "Hogswill 15kg", quantity: 1, price: "₱150" },
    ]
  },
  {
    id: 2,
    transactionID: "TXN-002",
    userID: "U-002",
    date: "21/02/2025",
    status: "Delivered",
    name: "Juan DelaCruz",
    phone: "09171234567",
    location: "Barangay Sto. Niño, Marikina City",
    orderStatus: "Delivered",
    paymentMethod: "Cash",
    deliveryDate: "22/02/2025",
    orderDate: "21/02/2026",
    totalPrice: "₱1500.00",
    quantity: "3",
    products: [
      { name: "Hogswill 5kg", quantity: 1, price: "₱300" },
      { name: "Soil Conditioner 10kg", quantity: 2, price: "₱600" },
    ]
  },
];
