import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export const Widget = ({type}) => {

  let data;

  //temporary
  const amount = 100;
  const diff = 20;


  switch (type) {
    case "user":
    data = {
      title: "Users",
      isMoney: false,
      link: "See All users",
      icon: <PersonOutlineIcon
       className="icon" 
       style = {{
        color: "crimson",
        backgroundColor: "rgba(250, 0, 0, 0.2)",
      }} />,
    };
    break;
    case "order":
    data = {
      title: "Active Locations",
      isMoney: false,
      link: "View All orders",
      icon: <ShoppingCartOutlinedIcon
      className="icon" 
       style = {{
        color: "blue",
        backgroundColor: "rgba(67, 162, 202, 0.28)",
      }} />,

    };
    break;
    case "earning":
    data = {
      title: "Foodwaste",
      isMoney: false,
      link: "View All earning",
      icon: <MonetizationOnOutlinedIcon
      className="icon" 
       style = {{
        color: "green",
        backgroundColor: "rgba(31, 177, 87, 0.2)",
      }} />,
    };
    break;
    case "balance":
    data = {
      title: "Orders",
      isMoney: false,
      link: "Check All balance",
      icon: <AccountBalanceWalletIcon
      className="icon" 
       style = {{
        color: "purple",
        backgroundColor: "rgba(250, 0, 128, 0.2)",
      }} />,
    };
    break;
    case "availables":
    data = {
      title: "Available Product",
      isMoney: false,
      link: "View available product",
      icon: <ProductionQuantityLimitsIcon
      className="icon" 
       style = {{
        color: "white",
        backgroundColor: "rgba(231, 235, 12, 0.47)",
      }} />,
    };
    break;
    default:
      data = { // Provide default values to prevent the error
        title: "UNKNOWN",
        isMoney: false,
        link: "",
        icon: null,
      };
      break;
  }
  return (
    <div className="widget">
      
      <div className="left">
      <span className="title">{data.title}</span>
      <span className="counter">{data.isMoney && "$"} {amount}</span>
      <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon/>
          {diff}%
        </div>
        {data.icon}

      </div>
    </div>
  )
}

export default Widget

// import "./widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

// export const Widget = ({ type, onClick }) => {
//   let data;

//   const amount = 100;
//   const diff = 20;

//   switch (type) {
//     case "user":
//       data = {
//         title: "Users",
//         isMoney: false,
//         link: "See All users",
//         icon: (
//           <PersonOutlineIcon
//             className="icon"
//             style={{
//               color: "crimson",
//               backgroundColor: "rgba(250, 0, 0, 0.2)",
//             }}
//           />
//         ),
//       };
//       break;
//     case "order":
//       data = {
//         title: "Active Locations",
//         isMoney: false,
//         link: "View All orders",
//         icon: (
//           <ShoppingCartOutlinedIcon
//             className="icon"
//             style={{
//               color: "blue",
//               backgroundColor: "rgba(67, 162, 202, 0.28)",
//             }}
//           />
//         ),
//       };
//       break;
//     case "earning":
//       data = {
//         title: "Foodwaste",
//         isMoney: false,
//         link: "View All earning",
//         icon: (
//           <MonetizationOnOutlinedIcon
//             className="icon"
//             style={{
//               color: "green",
//               backgroundColor: "rgba(31, 177, 87, 0.2)",
//             }}
//           />
//         ),
//       };
//       break;
//     case "balance":
//       data = {
//         title: "Orders",
//         isMoney: false,
//         link: "Check All balance",
//         icon: (
//           <AccountBalanceWalletIcon
//             className="icon"
//             style={{
//               color: "purple",
//               backgroundColor: "rgba(250, 0, 128, 0.2)",
//             }}
//           />
//         ),
//       };
//       break;
//     case "availables":
//       data = {
//         title: "Available Product",
//         isMoney: false,
//         link: "View available product",
//         icon: (
//           <ProductionQuantityLimitsIcon
//             className="icon"
//             style={{
//               color: "white",
//               backgroundColor: "rgba(231, 235, 12, 0.47)",
//             }}
//           />
//         ),
//       };
//       break;
//     default:
//       data = {
//         title: "UNKNOWN",
//         isMoney: false,
//         link: "",
//         icon: null,
//       };
//   }

//   return (
//     <article
//       className="widget"
//       onClick={onClick}
//       style={{ cursor: "pointer" }}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") onClick?.();
//       }}
//     >
//       <div className="left">
//         <span className="title">{data.title}</span>
//         <span className="counter">
//           {data.isMoney && "$"} {amount}
//         </span>
//         <span className="link">{data.link}</span>
//       </div>
//       <div className="right">
//         <div className="percentage positive">
//           <KeyboardArrowUpIcon />
//           {diff}%
//         </div>
//         {data.icon}
//       </div>
//     </article>
//   );
// };

// export default Widget;
