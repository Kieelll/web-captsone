import {
  AdminPanelSettings as AdminIcon,
  CalendarMonth as CalendarIcon,
  Chat as ChatIcon,
  CreditCard as CreditCardIcon,
  Dashboard as DashboardIcon,
  LocationOn as LocationIcon,
  Map as MapIcon,
  PersonOutlineOutlined as PersonIcon,
  Inventory as StorageIcon
} from '@mui/icons-material';
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/greenconnect-logo.png";
import "./sidebar.scss";

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sections = [
    {
      title: "MAIN",
      className: "main-section",
      links: [
        { to: "/", icon: <DashboardIcon />, label: "Dashboard" },
        { to: "/Map", icon: <MapIcon />, label: "Map" },
        { to: "/Chats", icon: <ChatIcon />, label: "Chat" },
        { to: "/Schedule", icon: <CalendarIcon />, label: "Schedules" },
      ],
    },
    {
      title: "MANAGEMENT",
      className: "management-section",
      links: [
        { to: "/Users", icon: <PersonIcon />, label: "Users" },
        { to: "/Transaction", icon: <CreditCardIcon />, label: "Transaction" },
        { to: "/Location", icon: <LocationIcon />, label: "Location" },
        { to: "/AdminAccount", icon: <AdminIcon />, label: "Admin Account" },
        { to: "/stocks", icon: <StorageIcon />, label: "Stocks" },
        
      ],
    },
  ];

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="GreenConnect Logo" className="logo" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {sections.map((section) => (
            <div key={section.title} className={`section ${section.className}`}>
              <p className="title">{section.title}</p>
              {section.links.map((link) => (
                <Link to={link.to} key={link.label} style={{ textDecoration: "none" }}>
                  <li className={currentPath === link.to ? "active" : ""}>
                    <span className="icon">{link.icon}</span>
                    <span>{link.label}</span>
                  </li>
                </Link>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
