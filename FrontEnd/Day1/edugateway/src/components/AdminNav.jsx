import React,{useState} from 'react'
import '../assets/css/NavBar.css'
import { Link,NavLink } from 'react-router-dom';
import { PiStudentFill } from "react-icons/pi";
function AdminNav() {
    const[menuOpen,setMenuOpen]=useState(false);
    return (  
        <>
        <div id="navbar">
        <nav>
            <div className="title">
            <PiStudentFill className='nicon'/><span id="nspan">Edu-GateWay</span></div>
            <div className='menu' onClick={()=>{setMenuOpen(!menuOpen)}}> 
            <span></span>
            <span></span>
            <span></span>
            </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li><NavLink to='/admin'>Home</NavLink></li>
                    <li><NavLink to='/adminaboutus'>AboutUs</NavLink></li>
                    <li><NavLink to='/adminstudent'>Student</NavLink></li>
                    <li><NavLink to='/admininstitutes'>Institutes</NavLink></li>
                </ul>
          
        </nav>
        </div>
        </>
    );
}

export default AdminNav;