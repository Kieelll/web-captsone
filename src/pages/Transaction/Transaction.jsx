import React from "react";
import "./Transaction.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import { TourProvider, useTour } from "@reactour/tour";

const TransactionContent = () => {
  const { setIsOpen, setCurrentStep } = useTour();

  return (
    <div className="transaction">
      <Sidebar />
      <div className="transactionContainer">
        <Navbar />
        <div className="transactionContent">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

const steps = [
  {
    selector: ".datatableTitle .link",
    content: "Click here to add a new transaction entry.",
  },
  {
    selector: ".transactionGrid",
    content: "This table shows all your current transactions. Use the View button to see more details.",
  },
  {
    selector: ".transactionDescription",
    content: "This panel shows the delivery and product details of the selected transaction.",
  },
];

const Transaction = () => {
  return (
    <TourProvider
      steps={steps}
      styles={() => ({
        maskWrapper: {
          zIndex: 9999,
        },
        popover: (base) => ({
          ...base,
          backgroundColor: "#e3f2fd",
          color: "#0d47a1",
          borderRadius: "10px",
          padding: "20px",
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: "#1976d2",
        }),
        close: (base) => ({
          ...base,
          color: "#0d47a1",
        }),
      })}
      showNavigation={true}
      showBadge={true}
      showCloseButton={true}
    >
      <TransactionContent />
    </TourProvider>
  );
};

export default Transaction;
