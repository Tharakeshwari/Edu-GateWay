// Profile.js

import React, { useState } from 'react';
import '../assets/css/Student.css';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    const handleCreateClick=()=>{
        navigate('/student');
    }
  return (
    <>
      <header>
        <Sidebar />
      </header>
      <div className='sbody'>
        <div className="profile-container">
          <h2 style={{color:"#f2772a"}}>Student Profile</h2>
          <div className="profile-image">
          <img
              src={profileImage || 'https://tse3.mm.bing.net/th?id=OIP.z8-GqzZcw5PZgZkcGisFOAAAAA&pid=Api&P=0&h=180'}
              alt="Click Here"
              className="round-image"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
            <div className="sedit-profile">
              <div className="form-row">
                <label>
                  Name:<br></br>
                  <input type="text" name="name" className='sinput'/>
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Age:<br></br>
                  <input type="number" name="age" className='sinput' />
                </label>
                <label>
                  Date of Birth:<br></br>
                  <input type="date" name="dob"className='sinput'/>
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  School:<br></br>
                  <input type="text" name="school" className='sinput' />
                </label>
                <label>
                  Higher Secondary Mark:<br></br>
                  <input
                    type="text"
                    name="higherSecondaryMark"
                    className='sinput'
                  />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Email:<br></br>
                  <input type="email" name="email" className='sinput'  />
                </label>
                <label>
                  Phone Number:<br></br>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className='sinput'
                  />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Community:<br></br>
                  <input type="text" name="community" className='sinput'  />
                </label>
                <label>
                  Nationality:<br></br>
                  <input type="text" name="nationality"  className='sinput'/>
                </label>
              </div>
              <div className="form-row">
                <label>
                  Address:<br></br>
                  <textarea name="address" style={{width:"20vw"}} />
                </label>
              </div>
              <button  style={{backgroundColor:"#ccc"}} onClick={handleCreateClick}>Create</button>
            </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default CreateProfile;
