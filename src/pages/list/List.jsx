import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { TourProvider, useTour } from "@reactour/tour";
import { useCallback } from "react";

const steps = [
  {
    selector: ".datatable",
    content: "Welcome to the Users List page. This section displays the main user data.",
  },
  {
    selector: ".datatableTitle",
    content: "This is the header of the User Table section.",
  },
  {
    selector: ".link",
    content: "Click here to add a new user into the system.",
  },
  {
    selector: ".datagrid",
    content: "This area shows all user records in a structured table format.",
  },
  {
    selector: ".cellAction",
    content: "Each row includes options to edit or delete a user.",
  },
];

const ListContent = () => {
  const { setIsOpen, setCurrentStep } = useTour();

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsOpen(true);
  }, [setCurrentStep, setIsOpen]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar onHelpClick={startTour} />
        <div className="usersContent">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

const List = () => {
  return (
    <TourProvider
      steps={steps}
      styles={() => ({
        maskWrapper: { zIndex: 9999 },
        popover: (base) => ({
          ...base,
          backgroundColor: "#e8f5e9",
          color: "#1b5e20",
          borderRadius: "10px",
          padding: "20px",
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: "#66bb6a",
        }),
        close: (base) => ({
          ...base,
          color: "#1b5e20",
        }),
      })}
      showNavigation
      showBadge
      showCloseButton
    >
      <ListContent />
    </TourProvider>
  );
};

export default List;
