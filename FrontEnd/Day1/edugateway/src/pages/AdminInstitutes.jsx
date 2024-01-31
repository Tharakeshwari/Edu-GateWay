// Institutes.js
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../assets/css/Institutes.css';
import {Link, useNavigate} from 'react-router-dom';
import AdminNav from '../components/AdminNav';

const AdminInstitutes = () => {
  const navigate = useNavigate();
  const [collegesData,setCollegesData] = useState([
    {
      id: 1,
      name: 'College AB',
      address: '123 Main Street, City A',
      contactNumber: '123-456-7890',
      email: 'abc@gmail.com',
      coursesOffered: 12,
      fees: 'Rs.100,000 - Rs.150,000',
      minimumMarks: 70,
    },
    {
      id: 2,
      name: 'College ABC',
      address: '456 Oak Avenue, City B',
      contactNumber: '987-654-3210',
      email: 'xyz@gmail.com',
      coursesOffered: 12,
      fees: 'Rs.100,000 - Rs.150,000',
      minimumMarks: 75,
    },
    {
      id: 3,
      name: 'College C',
      address: '789 Pine Lane, City C',
      contactNumber: '456-789-0123',
      email: 'ijk@gmail.com',
      coursesOffered: 12,
      fees: 'Rs.100,000 - Rs.150,000',
      minimumMarks: 80,
    },
    {
      id: 4,
      name: 'College CA',
      address: '789 Pine Lane, City C',
      contactNumber: '456-789-0123',
      email: 'ijk@gmail.com',
      coursesOffered: 12,
      fees: 'Rs.100,000 - Rs.150,000',
      minimumMarks: 80,
    },
    // Add more colleges as needed with additional details
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [editedCollege, setEditedCollege] = useState(null);
  const handleAdminEnrollInstitute = () => {
    navigate('/admincourse');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleEditClick = (college) => {
    setSelectedCollege(college);
    setEditedCollege({ ...college }); // Copy the course data for editing
    setEditFormVisible(true);
  };
  const handleAddClick = () => {
    setAddFormVisible(true);
  };

  const handleEditFormClose = () => {
    setEditFormVisible(false);
    setEditedCollege(null);
    setAddFormVisible(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCollege((prevCollege) => ({
      ...prevCollege,
      [name]: value,
    }));
  };
  const handleSaveClick = () => {
    // Handle saving the edited content (to backend or state) here
    // For now, let's just print the edited content
    console.log('Edited College:', editedCollege);

    // Update the course in the coursesData array
    const updatedColleges = collegesData.map((college) =>
      college.id === selectedCollege.id ? editedCollege : college
    );

    // Update the state with the modified course data
    setCollegesData(updatedColleges);

    setEditFormVisible(false);
    setSelectedCollege(null);
    setEditedCollege(null); // Clear edited course data
  };
  const handleDeleteClick = (college) => {
    const updatedColleges = collegesData.filter((c) => c.id !== college.id);
    setCollegesData(updatedColleges);
  };
  const filteredColleges = collegesData.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
      <AdminNav/>
      </header>
      <body className='ibody'>
        <div style={{display:"flex"}}>
        <input
          style={{ width: '300px', marginLeft: '100px', marginRight: '60px' }}
          type='text'
          placeholder='Search Colleges'
          value={searchTerm}
          onChange={handleSearchChange}
        /><button   style={{backgroundColor:"#f86f3e",height:"7vh",marginTop:"3px"}} onClick={handleAddClick}>Add College</button></div>
        <ul className='iul'>
          {filteredColleges.map((college) => (
            <li key={college.id}>
              <div className={`college-card ${editFormVisible || addFormVisible ? 'ddark-overlay' : ''}`}>
                <h3>{college.name}</h3>
                  <button className='ienroll-button'  onClick={handleAdminEnrollInstitute}>Courses</button>
                <p className='address'>{college.address}</p>
                <div className='separator'></div>
                <div className='row'>
                  <div className='topic'>Courses Offered:</div>
                  <div className='content inline'>{college.coursesOffered} courses</div>
                </div>
                <div className='row'>
                  <div className='topic'>Fees:</div>
                  <div className='content inline'>{college.fees}</div>
                </div>
                <div className='row'>
                  <div className='topic'>Minimum Marks:</div>
                  <div className='content inline'>{college.minimumMarks}%</div>
                </div>
                <div className='separator'></div>
                <div className='row'>
                  <div className='topic'>Contact Number:</div>
                  <div className='content inline'>{college.contactNumber}</div>
                </div>
                <div className='row'>
                  <div className='topic'>Email Id:</div>
                  <div className='content inline'>{college.email}</div>
                </div>
                <div className='row'>
                  <div className='topic'>College ID:</div>
                  <div className='content inline'>{college.id}</div>
                </div>
                <br></br><br></br>
                <center>
                <button  style={{backgroundColor:"#f86f3e",marginRight:"45px",width:"80px"}} onClick={() => handleEditClick(college)}>Edit</button>
                <button style={{ backgroundColor: "#f86f3e" }} onClick={() => handleDeleteClick(college)}>Delete</button>
                </center>
              </div>
            </li>
          ))}
          </ul>
          {editFormVisible && selectedCollege && (
  <div className='college-form' style={{ width: '70vw' }}>
    <h2>Edit College Information</h2>
    <label>Name:</label>
    <input
      type='text'
      name='name'
      value={editedCollege.name}
      onChange={handleInputChange}
    />
    <div className='lediv' style={{ width: '40%', float: 'left' }}>
      <label>Contact Number:</label>
      <input
        type='text'
        name='contactNumber'  // Corrected input name
        value={editedCollege.contactNumber}
        onChange={handleInputChange}
      />
      <label>Fees:</label>
      <input
        type='text'
        name='fees'
        value={editedCollege.fees}
        onChange={handleInputChange}
      />
      <label>Courses Offered:</label>
      <input
        type='number'  // Corrected input type
        name='coursesOffered'  // Corrected input name
        value={editedCollege.coursesOffered}
        onChange={handleInputChange}
      />
      <label>Address:</label>
    </div>
    <div className='rediv' style={{ width: '40%', float: 'right', marginRight: '2vw' }}>
      <label>Email:</label>
      <input
        type='text'
        name='email'
        value={editedCollege.email}
        onChange={handleInputChange}
      />
      <label>Minimum Marks:</label>
      <input
        type='text'
        name='minimumMarks'  // Corrected input name
        value={editedCollege.minimumMarks}
        onChange={handleInputChange}
      />
    </div>
    {/* Move the label above the address input field */}

    <input
      type='text'
      name='address'
      value={editedCollege.address}
      onChange={handleInputChange}
    />

    <br></br><br></br>
    <div style={{ display: 'flex', marginTop: '0vh' }}>
              <button style={{ marginRight: '5vw' }} onClick={handleSaveClick}>
                Save
              </button>
              <div style={{ width: '2vw' }}></div>
              <button onClick={handleEditFormClose} style={{ backgroundColor: 'grey' }}>
                Close
              </button>
            </div>
          </div>
        )}
          {addFormVisible &&  (
  <div className='college-form' style={{ width: '70vw' }}>
    <h2>Add College Information</h2>
    <label>Name:</label>
    <input
      type='text'
      name='name'
    />
    <div className='lediv' style={{ width: '40%', float: 'left' }}>
      <label>Contact Number:</label>
      <input
        type='text'
        name='duration'
      />
      <label>Fees:</label>
      <input
        type='text'
        name='fees'
      />
      <label>Courses Offered:</label>
      <input
        type='text'
        name='availableSeats'
      />
      <label>Address:</label>
    </div>
    <div className='rediv' style={{ width: '40%', float: 'right', marginRight: "2vw" }}>
      <label>Email:</label>
      <input
        type='text'
        name='email'
      />
      <label>Minimum Marks:</label>
      <input
        type='text'
        name='minMarks'
      />
    </div>
    {/* Move the label above the address input field */}

    <input
      type='text'
      name='address'
    />

    <br></br><br></br>
    <div style={{ display: "flex", marginTop: "0vh" }}>
      <button stle={{ marginRight: "5vw" }} onClick={handleEditFormClose}>Save</button><div style={{ width: '2vw' }}></div>
      <button onClick={handleEditFormClose} style={{ backgroundColor: "grey" }}>Close</button>
    </div>
  </div>
)}

      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AdminInstitutes;