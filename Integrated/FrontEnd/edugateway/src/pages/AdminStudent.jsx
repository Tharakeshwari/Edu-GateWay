import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../assets/css/Course.css';
import Footer from '../components/Footer';
import AdminNav from '../components/AdminNav';

function AdminStudent() {
  const [admissionsData, setAdmissionsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [declineStatus, setDeclineStatus] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [editedAdmission, setEditedAdmission] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchAdmissionsData();
  }, []);

  const fetchAdmissionsData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/admissions');
      setAdmissionsData(response.data);
    } catch (error) {
      console.error('Error fetching admissions data:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApproveClick = async () => {
    try {
      const updatedAdmissions = [...admissionsData];
      updatedAdmissions[selectedRow].status = 'Approved';
      
      // Decrement available seats by 1 if the status is approved
      updatedAdmissions[selectedRow].courses.noOfSeats -= 1;
      
      setAdmissionsData(updatedAdmissions);

      await axios.put(`http://localhost:8081/admissions/${selectedAdmission.admissionId}`, {
        ...selectedAdmission,
        status: 'Approved',
      });
      await axios.put(`http://localhost:8081/courses/${selectedAdmission.courses.courseId}`, {
        courseName:selectedAdmission.courses.courseName,
        courseDuration:selectedAdmission.courses.courseDuration,
        fees:selectedAdmission.courses.fees,
        courseDescription:selectedAdmission.courses.courseDescription,
        noOfSeats:updatedAdmissions[selectedRow].courses.noOfSeats
      });

      setApproveStatus(true);
      setDeclineStatus(false);
      setEditFormVisible(false);
    } catch (error) {
      console.error('Error approving admission:', error);
    }
  };

  const handleDeclineClick = async () => {
    try {
      const updatedAdmissions = [...admissionsData];
      updatedAdmissions[selectedRow].status = 'Declined';
      setAdmissionsData(updatedAdmissions);

      await axios.put(`http://localhost:8081/admissions/${selectedAdmission.admissionId}`, {
        ...selectedAdmission,
        status: 'Declined'
      });

      setDeclineStatus(true);
      setApproveStatus(false);
      setEditFormVisible(false);
    } catch (error) {
      console.error('Error declining admission:', error);
    }
  };

  const handleEditStatus = (admission, index) => {
    setSelectedAdmission(admission);
    setEditedAdmission({ ...admission });
    setEditFormVisible(true);
    setSelectedRow(index);
  };

  const handleSaveClick = () => {
    if (approveStatus || declineStatus) {
      const updatedAdmissions = [...admissionsData];
      updatedAdmissions[selectedRow].status = approveStatus ? 'Approved' : 'Declined';
      setAdmissionsData(updatedAdmissions);
    }

    setEditFormVisible(false);
    setSelectedAdmission(null);
    setEditedAdmission(null);
    setApproveStatus(false);
    setDeclineStatus(false);
  };

  const filteredAdmissions = admissionsData.filter((admission) =>
    admission.student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <body className='cbody'>
        <div className={`course-container ${editFormVisible ? 'dark-overlay' : ''}`}>
          <h1>Admission Information</h1>
          <input
            type="text"
            placeholder="Search Students"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Admission</th>
                <th>Course</th>
                <th>Duration</th>
                <th>Fees</th>
                <th>Available Seats</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmissions.map((admission, index) => (
                <tr key={admission.admissionId}>
                  <td>{admission.student.name}</td>
                  <td>{admission.admissionId}</td>
                  <td>{admission.courses.courseName}</td>
                  <td>{admission.courses.courseDuration}</td>
                  <td>{admission.courses.fees}</td>
                  <td>{admission.courses.noOfSeats}</td>
                  <td>{admission.status}</td>
                  <td>
                    {approveStatus || declineStatus ? (
                      <button
                        className={`enroll-button ${approveStatus ? 'approve-button' : 'decline-button'}`}
                        style={{ width: '100px' }}
                        onClick={handleSaveClick}
                      >
                        {admission.status === 'Submitted' ? "Edit Status" : admission.status}
                      </button>
                    ) : (
                      <button
                        className='enroll-button'
                        style={{ width: '100px' }}
                        onClick={() => handleEditStatus(admission, index)}
                      >
                        Edit Status
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editFormVisible && selectedAdmission && (
          <div className='profile-container' style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
            <center>
              <h2>Choose the status</h2>
              <br></br>
              <div className="obutton-container">
                <button onClick={handleApproveClick} style={{ backgroundColor: "green", marginRight: "20px" }}>APPROVE</button>
                <button onClick={handleDeclineClick} style={{ backgroundColor: "red" }} >DECLINE</button>
              </div>
            </center>
            <br></br>
          </div>
        )}

      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default AdminStudent;
