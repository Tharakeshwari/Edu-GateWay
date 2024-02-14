import React, { useEffect, useState } from 'react';
import '../assets/css/Student.css';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Student = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [isEditing, setEditing] = useState(false);
  const userEmail = location.state && location.state.userEmail;
  const studentId=1;
  useEffect(() => {
    // Fetch student data when the component mounts
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      // Fetch student data by ID
      const response = await axios.get(`http://localhost:8081/students/${studentId}`); // Assuming the endpoint to fetch student data by ID is '/students/:id'
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8081/students/${studentId}`, userData); // Assuming the endpoint to update student data is '/api/v1/student'
      setEditing(false);
      alert('Student data updated successfully');
    } catch (error) {
      console.error('Error updating student data:', error);
      alert('Error updating student data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  return (
    <>
      <header>
        <Sidebar />
      </header>
      <div className='sbody'>
        <div className="profile-container">
          <h2 style={{ color: "#f2772a" }}>Student Profile</h2>
          <p style={{ color: "white", backgroundColor: "grey" }}>{userEmail}</p>
          <br></br>
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
                  <input type="text" name="dob" value={userData.dob} onChange={handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  HSC Marks:<br></br>
                  <input type="number" name="marksHSC" value={userData.marksHSC} onChange={handleInputChange} />
                </label>

                <label>
                  SSLC Marks:<br></br>
                  <input
                    type="number"
                    name="marksSSLC"
                    value={userData.marksSSLC}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Mobile:<br></br>
                  <input type="text" name="mobile" value={userData.mobile} onChange={handleInputChange} />
                </label>
                <label>
                  Eligibility:<br></br>
                  <input
                    type="text"
                    name="eligibility"
                    value={userData.eligibility}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Father's Name:<br></br>
                  <input type="text" name="fatherName" value={userData.fatherName} onChange={handleInputChange} />
                </label>
                <label>
                  Mother's Name:<br></br>
                  <input type="text" name="motherName" value={userData.motherName} onChange={handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label className='llabel'>
                  Gender:<br></br>
                  <input type="text" name="gender" value={userData.gender} onChange={handleInputChange} />
                </label>
                <label>
                  Nationality:<br></br>
                  <input type="text" name="nationality" value={userData.nationality} onChange={handleInputChange} />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Address:<br></br>
                  <textarea name="address" value={userData.address} onChange={handleInputChange} style={{ width: "20vw" }} />
                </label>
              </div>
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
              <div className="sedit-profile">
                <div className="form-row">
                  <label>
                    Name:<br></br>
                    <input type="text" name="name" value={userData.name} className='sinput' readOnly />
                  </label>
                </div>
                <div className="form-row">
                  <label className='llabel'>
                    Age:<br></br>
                    <input type="number" name="age" value={userData.age} className='sinput' readOnly />
                  </label>
                  <label>
                    Date of Birth:<br></br>
                    <input type="text" name="dob" value={userData.dob} className='sinput' readOnly />
                  </label>
                </div>
                <div className="form-row">
                  <label className='llabel'>
                    HSC Marks:<br></br>
                    <input type="number" name="marksHSC" value={userData.marksHSC} className='sinput' readOnly />
                  </label>
                  <label>
                    SSLC Marks:<br></br>
                    <input
                      type="number"
                      name="marksSSLC"
                      value={userData.marksSSLC}
                      className='sinput'
                      readOnly
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label className='llabel'>
                    Mobile:<br></br>
                    <input type="text" name="mobile" value={userData.mobile} className='sinput' readOnly />
                  </label>
                  <label>
                    Eligibility:<br></br>
                    <input
                      type="text"
                      name="eligibility"
                      value={userData.eligibility}
                      className='sinput'
                      readOnly
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label className='llabel'>
                    Father's Name:<br></br>
                    <input type="text" name="fatherName" value={userData.fatherName} className='sinput' readOnly />
                  </label>
                  <label>
                    Mother's Name:<br></br>
                    <input type="text" name="motherName" value={userData.motherName} className='sinput' readOnly />
                  </label>
                </div>
                <div className="form-row">
                  <label className='llabel'>
                    Gender:<br></br>
                    <input type="text" name="gender" value={userData.gender} className='sinput' readOnly />
                  </label>
                  <label>
                    Nationality:<br></br>
                    <input type="text" name="nationality" value={userData.nationality} className='sinput' readOnly />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Address:<br></br>
                    <textarea name="address" value={userData.address} style={{ width: "20vw" }} readOnly />
                  </label>
                </div>
                <button onClick={handleEdit} style={{ backgroundColor: "#ccc" }}>Edit</button>
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
