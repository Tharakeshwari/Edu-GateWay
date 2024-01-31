import React, { useState } from 'react';
import { FaUserAlt, FaBook, FaCertificate, FaTrophy, FaSignOutAlt, FaBars } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "../assets/css/SideBar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      path: "/student",
      name: "Profile",
      icon: <FaUserAlt />
    },
    {
      path: "/institutes",
      name: "Institutes",
      icon: <FaBook />
    },
    {
      path: "/login",
      name: "Logout",
      icon: <FaSignOutAlt />
    }
    // {
    //   path: "/points",
    //   name: "Points",
    //   icon: <FaTrophy />
    // },
    // {
    //   path: "/logout",
    //   name: "Logout",
    //   icon: <FaSignOutAlt />
    // }
  ];

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top-section">
          <div style={{ display: isOpen ? "block" : "none" }} className="sidebar-logo">
            {/* Add your logo here if needed */}
          </div>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink to={item.path} key={index} className="sidebar-link" activeClassName="sidebar-active">
            <div className="sidebar-icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link-text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
