// Profile.js

import React, { useState } from 'react';
import '../assets/css/Student.css';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Sidebar from '../components/SideBar';
import { useLocation, useNavigate } from 'react-router-dom';

const Student = () => {
  const location = useLocation();
  // Sample student data
  const initialData = {
    name: 'John Doe',
    dob: '1999-01-01',
    school: 'XYZ High School',
    higherSecondaryMark: '95%',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    community: 'General',
    applicationStatus: 'Pending',
    paymentDetails: 'Paid',
    fatherName: 'John Doe Sr.',
    motherName: 'Jane Doe',
    gender: 'Male',
    age: 25,
    nationality: 'American',
    address: '123 Main Street, Cityville, USA',
    sslcMarks: '90%',
    profileImage: '', 
  };

  const [userData, setUserData] = useState(initialData);
  const [isEditing, setEditing] = useState(false);
  const userEmail = location.state && location.state.userEmail;

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Save updated data to the server or perform any necessary action
    // For simplicity, we're not implementing server communication in this example
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    // Handle image upload
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserData({
          ...userData,
          profileImage: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <header>
        <Sidebar />
      </header>
      <div className='sbody'>
        <div className="profile-container">
          <h2 style={{color:"#f2772a"}}>Student Profile</h2>
          <div className="profile-image">
          <img src={userData.profileImage || 'https://tse3.mm.bing.net/th?id=OIP.z8-GqzZcw5PZgZkcGisFOAAAAA&pid=Api&P=0&h=180'} alt="Click Here" />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}
          </div>
          <p style={{color:"white",backgroundColor:"grey"}}>{userEmail}</p>
          {isEditing ? (
            <div className="edit-profile">
              <div className="form-row">
                <label>
                  Name:<br></br>
                  <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
                </label>
              </div>
              
              <div className="form-row">
                <label className='llabel'>
                  Age:<br></br>
                  <input type="number" name="age" value={userData.age} onChange={handleInputChange} />
                </label>
                <label>
                  Date of Birth:<br></br>
                  <input type="date" name="dob" value={userData.dob} onChange={handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  School:<br></br>
                  <input type="text" name="school" value={userData.school} onChange={handleInputChange} />
                </label>
               
                <label>
                  Higher Secondary Mark:<br></br>
                  <input
                    type="text"
                    name="higherSecondaryMark"
                    value={userData.higherSecondaryMark}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Email:<br></br>
                  <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
                </label>
                <label>
                  Phone Number:<br></br>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Community:<br></br>
                  <input type="text" name="community" value={userData.community} onChange={handleInputChange} />
                </label>
                <label>
                  Nationality:<br></br>
                  <input type="text" name="nationality" value={userData.nationality} onChange={handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Address:<br></br>
                  <textarea name="address" value={userData.address} onChange={handleInputChange} style={{width:"20vw"}} />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Application Status:<br></br>
                  <input
                    type="text"
                    name="applicationStatus"
                    value={userData.applicationStatus}
                    onChange={handleInputChange}
                    readOnly
                  />
                </label>
                <label>
                  Payment Details:<br></br>
                  <input
                    type="text"
                    name="paymentDetails"
                    value={userData.paymentDetails}
                    onChange={handleInputChange}
                    readOnly
                  />
                </label>
              </div>
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="sedit-profile">
              <div className="form-row">
                <label>
                  Name:<br></br>
                  <input type="text" name="name" value={userData.name} className='sinput' readOnly/>
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Age:<br></br>
                  <input type="number" name="age" value={userData.age} className='sinput' readOnly />
                </label>
                <label>
                  Date of Birth:<br></br>
                  <input type="date" name="dob" value={userData.dob} className='sinput' readOnly/>
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  School:<br></br>
                  <input type="text" name="school" value={userData.school} className='sinput' readOnly/>
                </label>
                <label>
                  Higher Secondary Mark:<br></br>
                  <input
                    type="text"
                    name="higherSecondaryMark"
                    value={userData.higherSecondaryMark}
                    className='sinput'
                    readOnly
                  />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Email:<br></br>
                  <input type="email" name="email" value={userData.email} className='sinput' readOnly />
                </label>
                <label>
                  Phone Number:<br></br>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    className='sinput'
                    readOnly
                  />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Community:<br></br>
                  <input type="text" name="community" value={userData.community} className='sinput' readOnly />
                </label>
                <label>
                  Nationality:<br></br>
                  <input type="text" name="nationality" value={userData.nationality} className='sinput' readOnly/>
                </label>
              </div>
              <div className="form-row">
                <label>
                  Address:<br></br>
                  <textarea name="address" value={userData.address} style={{width:"20vw"}}  readOnly/>
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Application Status:<br></br>
                  <input
                    type="text"
                    name="applicationStatus"
                    value={userData.applicationStatus}
                    className='sinput'
                    readOnly
                  />
                </label>
                <label>
                  Payment Details:<br></br>
                  <input
                    type="text"
                    name="paymentDetails"
                    value={userData.paymentDetails}
                    className='sinput'
                    readOnly
                  />
                </label>
              </div>
              <button onClick={handleEdit} style={{backgroundColor:"#ccc"}}>Edit</button>
            </div>
          )}
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Student;
