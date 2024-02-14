import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../assets/css/Institutes.css';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import axios from 'axios';

const AdminInstitutes = () => {
  const navigate = useNavigate();
  const [collegesData, setCollegesData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [editedCollege, setEditedCollege] = useState(null);
  
  useEffect(() => {
    fetchCollegesData();
  }, []);

  const fetchCollegesData = () => {
    axios.get('http://localhost:8081/institutes')
      .then(response => {
        setCollegesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching colleges data:', error);
      });
  };

  const handleAdminEnrollInstitute = (instituteId) => {
    navigate('/admincourse', { state: { instituteId } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (college) => {
    setSelectedCollege({ ...college });
    setEditedCollege({ ...college });
    setEditFormVisible(true);
  };

  const handleAddClick = () => {
    setAddFormVisible(true);
  };

  const handleEditFormClose = () => {
    setEditFormVisible(false);
    setSelectedCollege(null);
    setEditedCollege(null);
    setAddFormVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCollege({
      ...editedCollege,
      [name]: value,
    });
  };
  const handleSaveClick = () => {
    const updatedCollege = {
      instituteName: editedCollege.instituteName,
      instituteAddress: editedCollege.instituteAddress,
      instituteDescription: editedCollege.instituteDescription,
      instituteEmail: editedCollege.instituteEmail,
      instituteNoOfCoursesAvailable: editedCollege.instituteNoOfCoursesAvailable,
      instituteMobile: editedCollege.instituteMobile,
    };
    console.log(editedCollege);
    axios.put(`http://localhost:8081/institutes/${selectedCollege.instituteId}`, editedCollege)
      .then(response => {
        // Create a new array with the updated college at the correct index
        const updatedColleges = [...collegesData];
        const index = updatedColleges.findIndex(college => college.instituteId === selectedCollege.instituteId);
        updatedColleges[index] = response.data;
  
        // Update the state with the new array
        setCollegesData(updatedColleges);
  
        // Reset state variables
        setEditFormVisible(false);
        setSelectedCollege(null);
        setEditedCollege(null);
      })
      .catch(error => {
        console.error('Error updating college:', error);
      });
  };
  const handleAddSaveClick = () => {
    const newCollege = {
      instituteId: Date.now(), // You can use any unique identifier
      instituteName: editedCollege.instituteName,
      instituteAddress: editedCollege.instituteAddress,
      instituteDescription: editedCollege.instituteDescription,
      instituteEmail: editedCollege.instituteEmail,
      instituteNoOfCoursesAvailable: editedCollege.instituteNoOfCoursesAvailable,
      instituteMobile: editedCollege.instituteMobile,
    };
  
    axios.post('http://localhost:8081/institutes', newCollege)
      .then(response => {
        setCollegesData(prevColleges => [...prevColleges, response.data]);
        setAddFormVisible(false);
      })
      .catch(error => {
        console.error('Error adding college:', error);
      });
  };

  const handleDeleteClick = (college) => {
    axios.delete(`http://localhost:8081/institutes/${college.instituteId}`)
      .then(response => {
        const updatedColleges = collegesData.filter(c => c.instituteId !== college.instituteId);
        setCollegesData(updatedColleges);
      })
      .catch(error => {
        console.error('Error deleting college:', error);
      });
  };

  const filteredColleges = collegesData.filter((college) =>
    college.instituteName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <body className='ibody'>
        <div style={{ display: "flex" }}>
          <input
            style={{ width: '300px', marginLeft: '100px', marginRight: '60px' }}
            type='text'
            placeholder='Search Colleges'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button style={{ backgroundColor: "#f86f3e", height: "7vh", marginTop: "3px" }} onClick={handleAddClick}>Add College</button>
        </div>
        <ul className='iul'>
          {filteredColleges.map((college) => (
            <li key={college.id}>
              <div className={`college-card ${editFormVisible || addFormVisible ? 'ddark-overlay' : ''}`}>
                <h3>{college.instituteName}</h3>
                <button className='ienroll-button' onClick={() => handleAdminEnrollInstitute(college.instituteId)}>Courses</button>
                <p className='address'>{college.instituteAddress}</p>
                <div className='separator'></div>
                <div className='row'>
                  <div className='topic'>Courses Offered:</div>
                  <div className='content inline'>{college.instituteNoOfCoursesAvailable} courses</div>
                </div>
                <div className='row'>
                  <div className='topic'>Description:</div>
                  <div className='content inline'>{college.instituteDescription}</div>
                </div>
                <div className='separator'></div>
                <div className='row'>
                  <div className='topic'>Contact Number:</div>
                  <div className='content inline'>{college.instituteMobile}</div>
                </div>
                <div className='row'>
                  <div className='topic'>Email Id:</div>
                  <div className='content inline'>{college.instituteEmail}</div>
                </div>
                <div className='row'>
                  <div className='topic'>College ID:</div>
                  <div className='content inline'>{college.instituteId}</div>
                </div>
                <br /><br />
                <center>
                  <button style={{ backgroundColor: "#f86f3e", marginRight: "45px", width: "80px" }} onClick={() => handleEditClick(college)}>Edit</button>
                  <button style={{ backgroundColor: "#f86f3e" }} onClick={() => handleDeleteClick(college)}>Delete</button>
                </center>
              </div>
            </li>
          ))}
        </ul>
        {editFormVisible && selectedCollege && (
          <div>
          <div className='college-form' style={{ width: '70vw' }}>
            <h2>Edit College Information</h2>
            <label>Name:</label>
            <input
              type='text'
              name='instituteName'
              value={editedCollege.instituteName}
              onChange={handleInputChange}
            />
            <div className='lediv' style={{ width: '40%', float: 'left' }}>
              <label>Contact Number:</label>
              <input
                type='text'
                name='instituteMobile'
                value={editedCollege.instituteMobile}
                onChange={handleInputChange}
              />
              <label>Description:</label>
              <input
                type='text'
                name='instituteDescription'
                value={editedCollege.instituteDescription}
                onChange={handleInputChange}
              />
              
              <label>Address:</label>
              <input
                type='text'
                name='instituteAddress'
                value={editedCollege.instituteAddress}
                onChange={handleInputChange}
              />
            </div>
            <div className='rediv' style={{ width: '40%', float: 'right', marginRight: '2vw' }}>
            <label>Email:</label>
            <input
            type='text'
            name='instituteEmail'
            value={editedCollege.instituteEmail}
            onChange={handleInputChange}
            />
              <label>Courses Offered:</label>
              <input
                type='number'
                name='instituteNoOfCoursesAvailable'
                value={editedCollege.instituteNoOfCoursesAvailable}
                onChange={handleInputChange}
              />
            </div>

            <br /><br />
              <button style={{ marginRight: '5vw' }} onClick={handleSaveClick}>Save</button>
              <div style={{ height: '2vw' }}></div>
              <button onClick={handleEditFormClose} style={{ backgroundColor: 'grey' }}>Close</button>
          </div>
            </div>
        )}
        {addFormVisible && (
          <div className='college-form' style={{ width: '70vw' }}>
            <h2>Add College Information</h2>
            <label>Name:</label>
            <input
              type='text'
              name='instituteName'
              value={editedCollege?.instituteName || ''}
              onChange={handleInputChange}
            />
            <div className='lediv' style={{ width: '40%', float: 'left' }}>
              <label>Contact Number:</label>
              <input
                type='text'
                name='instituteMobile'
                value={editedCollege?.instituteMobile || ''}
                onChange={handleInputChange}
              />
              <label>Description:</label>
              <input
                type='text'
                name='instituteDescription'
                value={editedCollege?.instituteDescription || ''}
                onChange={handleInputChange}
              />
              <label>Courses Offered:</label>
              <input
                type='number'
                name='instituteNoOfCoursesAvailable'
                value={editedCollege?.instituteNoOfCoursesAvailable || ''}
                onChange={handleInputChange}
              />
              <label>Address:</label>
              <input
                type='text'
                name='instituteAddress'
                value={editedCollege?.instituteAddress || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className='rediv' style={{ width: '40%', float: 'right', marginRight: "2vw" }}>
              <label>Email:</label>
              <input
                type='text'
                name='instituteEmail'
                value={editedCollege?.instituteEmail || ''}
                onChange={handleInputChange}
              />
            </div>

            <br /><br />
              <button style={{ marginRight: "5vw" }} onClick={handleAddSaveClick}>Save</button>
              <div style={{ height: '2vw' }}></div>
              <button onClick={handleEditFormClose} style={{ backgroundColor: "grey" }}>Close</button>
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
