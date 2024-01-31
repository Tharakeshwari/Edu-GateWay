import '../assets/css/Option.css'
import {  useNavigate } from 'react-router-dom';
import React from 'react'
function Option() {
    const navigate = useNavigate();
    return ( 
        <>
        <body className='obody'>
        <div className='owrapper'>
            <center>
        <h2>Select Your Role</h2>
        <div className="obutton-container">
              <button className="obutton" onClick={() => navigate("/login")}>USER</button>
              <button className="obutton" onClick={() => navigate("/adminlogin")}>ADMIN</button>
            </div>
        </center>
        <br></br>
        </div>
        </body>
        </>
     );
}

export default Option;