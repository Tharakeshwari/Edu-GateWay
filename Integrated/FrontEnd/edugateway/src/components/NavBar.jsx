import React, { useState } from 'react';
import '../assets/css/NavBar.css';
import { Link, NavLink } from 'react-router-dom';
import { PiStudentFill } from 'react-icons/pi'; // Make sure to import PiStudentFill

function NavBar({ isLoggedIn, userEmail }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div id="navbar">
        <nav>
          <div className="title">
            <PiStudentFill className="nicon" />
            <span id="nspan">Edu-GateWay</span>
          </div>
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={menuOpen ? 'open' : ''}>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/aboutus'>AboutUs</NavLink>
            </li>
            <li>
              <NavLink to='/student'>Menu</NavLink>
            </li>
            {isLoggedIn ? (
              <>
                  <span style={{marginRight:"30px",marginTop:"20px"}}>{userEmail}</span>
                <li className='nb1'>
                  <NavLink to='/logout'>Logout</NavLink>
                </li>
              </>
            ) : (
              <li className='nb1'>
                <NavLink to='/login'>Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
