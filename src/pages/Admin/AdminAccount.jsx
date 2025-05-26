import React from 'react';
import './AdminAccount.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import AdminAccounts from '../../components/AdminAccount/AdminAccounts';
import { TourProvider, useTour } from '@reactour/tour';

const AdminAccountContent = () => {
  const { setIsOpen, setCurrentStep } = useTour();

  return (
    <div className="admin">
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        <div className="adminContent">
          <AdminAccounts />
        </div>
      </div>
    </div>
  );
};

// Steps for the tour
const steps = [
  // {
  //   selector: ".adminContent",
  //   content: "This is the main container for admin accounts.",
  // },
  {
    selector: ".datatableTitle",
    content: "This section shows the header of the admin table.",
  },
  {
    selector: ".link",
    content: "Click here to add a new admin user.",
  },
  {
    selector: ".datagrid",
    content: "This is the admin table showing user records.",
  },
  {
    selector: ".cellAction",
    content: "You can view or delete admin accounts here.",
  },
  {
    selector: ".adminHistory",
    content: "This panel displays the admin's recent activity history.",
  },
];

const AdminAccount = () => {
  return (
    <TourProvider
      steps={steps}
      styles={() => ({
        maskWrapper: {
          zIndex: 9999,
        },
        popover: (base) => ({
          ...base,
          backgroundColor: '#fff3e0',
          color: '#e65100',
          borderRadius: '10px',
          padding: '20px',
        }),
        badge: (base) => ({
          ...base,
          backgroundColor: '#ff9800',
        }),
        close: (base) => ({
          ...base,
          color: '#e65100',
        }),
      })}
      scrollSmooth={false}
      scrollIntoViewOptions={false}
      showNavigation={true}
      showBadge={true}
      showCloseButton={true}
    >
      <AdminAccountContent />
    </TourProvider>
  );
};

export default AdminAccount;
