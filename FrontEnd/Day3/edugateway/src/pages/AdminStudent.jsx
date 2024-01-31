// Course.js
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import '../assets/css/Course.css';
import Footer from '../components/Footer';
import AdminNav from '../components/AdminNav';

function AdminStudent() {
  const [studentsData, setStudentsData] = useState([
    // Your existing student data...
    {
      id: 1,
      name: 'John Doe',
      college: 'ABC University',
      course: 'Computer Science Engineering',
      duration: '4 years',
      fees: '$10,000',
      minimumMarks: 'Computer Science Engineering',
      marks: 50,
      availableSeats: 100,
      status: "Submitted",
    },

    {
      id: 2,
      name: 'Ria',
      college: 'SRM University',
      course: 'Information Technology',
      duration: '4 years',
      fees: '$15,000',
      minimumMarks: '96',
      marks: 90,
      availableSeats: 100,
      status: "Submitted",
    },
    {
      id: 3,
      name: 'Nicky',
      college: 'VIT University',
      course: 'Computer Science Engineering',
      duration: '4 years',
      fees: '$10,000',
      minimumMarks: '95',
      marks: 80,
      availableSeats: 100,
      status: "Submitted",
    },
    // Add more student data as needed...
  ]);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [declineStatus, setDeclineStatus] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editedStudent, setEditedStudent] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApproveClick = () => {
    // Handle approval logic here
    const updatedStudents = [...studentsData];
    updatedStudents[selectedRow].status = 'Approved';

    setStudentsData(updatedStudents);
    setApproveStatus(true);
    setDeclineStatus(false); // Reset decline status
    setEditFormVisible(false);
  };

  const handleDeclineClick = () => {
    // Handle decline logic here
    const updatedStudents = [...studentsData];
    updatedStudents[selectedRow].status = 'Declined';

    setStudentsData(updatedStudents);
    setDeclineStatus(true);
    setApproveStatus(false); // Reset approve status
    setEditFormVisible(false);
  };

  const handleEditStatus = (student, index) => {
    setSelectedStudent(student);
    setEditedStudent({ ...student }); // Copy the student data for editing
    setEditFormVisible(true);
    setSelectedRow(index); // Set the selected row index
  };

  const handleSaveClick = () => {
    // Handle saving the edited content (to backend or state) here
    // For now, let's just print the edited content
    console.log('Edited Student:', editedStudent);

    // Update the status only if the approval or decline button was clicked
    if (approveStatus || declineStatus) {
      const updatedStudents = [...studentsData];
      updatedStudents[selectedRow].status = approveStatus ? 'Approved' : 'Declined';
      setStudentsData(updatedStudents);
    }

    setEditFormVisible(false);
    setSelectedStudent(null);
    setEditedStudent(null); // Clear edited student data
    setApproveStatus(false);
    setDeclineStatus(false);
  };

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <header>
        <AdminNav />
      </header>
      <body className='cbody'>
        <div className={`course-container ${editFormVisible ? 'dark-overlay' : ''}`}>
          <h1>Student Information</h1>
          <input
            type="text"
            placeholder="Search Students"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <table >
            <thead>
              <tr>
                <th>Name</th>
                <th>College</th>
                <th>Course</th>
                <th>Duration</th>
                <th>Fees</th>
                <th>Available Seats</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredStudents.map((student, index) => (
            <tr key={student.id}>
             <td>{student.name}</td>
                  <td>{student.college}</td>
                  <td>{student.course}</td>
                  <td>{student.duration}</td>
                  <td>{student.fees}</td>
                  <td>{student.availableSeats}</td>
                  <td>{student.status}</td>
    <td>
      {approveStatus || declineStatus ? (
        <button
          className={`enroll-button ${approveStatus ? 'approve-button' : 'decline-button'}`}
          style={{ width: '100px' }}
          onClick={() => handleSaveClick(index)}
        >
          {student.status === 'Submitted' ? "Edit Status" : student.status}
        </button>
      ) : (
        <button
          className='enroll-button'
          style={{ width: '100px' }}
          onClick={() => handleEditStatus(student, index)}
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

        {editFormVisible && selectedStudent && (
          <div className='profile-container' style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <center>
      <h2>Choose the status</h2>
      <br></br>
      <div className="obutton-container">
            <button  onClick={handleApproveClick} style={{backgroundColor:"green",marginRight:"20px"}}>APPROVE</button>
            <button  onClick={handleDeclineClick} style={{backgroundColor:"red"}} >DECLINE</button>
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
