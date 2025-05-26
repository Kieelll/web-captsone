import "./Location.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import LocationTable from "../../components/LocationTable/LocationTable";
import { TourProvider, useTour } from "@reactour/tour";
import { useCallback } from "react";

// Tour Steps
const steps = [
  {
    selector: ".locationTable",
    content: "Welcome! This is your Location Management dashboard.",
  },
  {
    selector: ".dataLocationTable",
    content: "This is the header. You can click here to add a new location.",
  },
  {
    selector: ".link",
    content: "Click this button to add a new location.",
  },
  {
    selector: ".datagrid",
    content: "This table displays all your saved location records.",
  },
  {
    selector: ".cellAction",
    content: "You can edit or delete each row using these buttons.",
  },
];

// Component that uses the tour
const LocationContent = () => {
  const { setIsOpen, setCurrentStep } = useTour();

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsOpen(true);
  }, [setIsOpen, setCurrentStep]);

  return (
    <div className="location">
      <Sidebar />
      <div className="locationContainer">
        <Navbar onHelpClick={startTour} /> {/* Add onHelpClick for tutorial */}
        <div className="locationContent">
          <LocationTable />
        </div>
      </div>
    </div>
  );
};

// Final Component with TourProvider
const Location = () => {
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
      <LocationContent />
    </TourProvider>
  );
};

export default Location;
