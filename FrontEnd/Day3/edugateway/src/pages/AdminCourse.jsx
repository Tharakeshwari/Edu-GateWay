
// Course.js
import React, { useState } from 'react';
import '../assets/css/Course.css';
import Footer from '../components/Footer';
import AdminNav from '../components/AdminNav';

function AdminCourse() {
  const [coursesData, setCoursesData] = useState([
    {
      id: 1,
      name: 'Electrical Engineering',
      duration: '4 years',
      fees: '$12,000',
      description: 'Electrical Engineering Program',
      availableSeats: 40,
      institution: 'XYZ University',
    },
    {
      id: 2,
      name: 'Mechanical Engineering',
      duration: '4 years',
      fees: '$11,000',
      description: 'Mechanical Engineering Program',
      availableSeats: 45,
      institution: 'XYZ University',
    },
    {
      id: 3,
      name: 'Data Science',
      duration: '3 years',
      fees: '$15,000',
      description: 'Data Science Program',
      availableSeats: 30,
      institution: 'PQR University',
    },
    {
      id: 4,
      name: 'Civil Engineering',
      duration: '4 years',
      fees: '$11,500',
      description: 'Civil Engineering Program',
      availableSeats: 35,
      institution: 'PQR University',
    },
    {
      id: 5,
      name: 'Biotechnology',
      duration: '3 years',
      fees: '$14,000',
      description: 'Biotechnology Program',
      availableSeats: 25,
      institution: 'MNO University',
    },
  ]);
  
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editedCourse, setEditedCourse] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setEditedCourse({ ...course }); // Copy the course data for editing
    setEditFormVisible(true);
  };

  const handleAddClick = () => {
    setAddFormVisible(true);
  };

  const handleEditFormClose = () => {
    setEditFormVisible(false);
    setSelectedCourse(null);
    setEditedCourse(null);
    setAddFormVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleAddSaveClick = () => {
    // Handle saving the new course content (to backend or state) here
    // For now, let's just print the added content
    const newCourse = {
      id: coursesData.length + 1, // Generate a unique ID for the new course
      name: document.getElementsByName('name')[0].value,
      duration: document.getElementsByName('duration')[0].value,
      fees: document.getElementsByName('fees')[0].value,
      description: document.getElementsByName('description')[0].value,
      availableSeats: document.getElementsByName('availableSeats')[0].value,
      institution: document.getElementsByName('institution')[0].value,
    };

    // Update the state with the new course data
    setCoursesData((prevCourses) => [...prevCourses, newCourse]);

    setAddFormVisible(false);
  };

  const handleAddFormClose = () => {
    setAddFormVisible(false);
  };

  const handleSaveClick = () => {
    // Handle saving the edited content (to backend or state) here
    // For now, let's just print the edited content
    console.log('Edited Course:', editedCourse);

    // Update the course in the coursesData array
    const updatedCourses = coursesData.map((course) =>
      course.id === selectedCourse.id ? editedCourse : course
    );

    // Update the state with the modified course data
    setCoursesData(updatedCourses);

    setEditFormVisible(false);
    setSelectedCourse(null);
    setEditedCourse(null); // Clear edited course data
  };

  const handleDeleteClick = (courseId) => {
    // Handle course deletion logic here
    const updatedCourses = coursesData.filter((course) => course.id !== courseId);
    setCoursesData(updatedCourses);
  };

  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <body className='cbody'>
        <div className={`course-container ${editFormVisible || addFormVisible ? 'dark-overlay' : ''}`}>
          <h1>Available Courses</h1>
          <input
            type="text"
            placeholder="Search Courses"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button onClick={handleAddClick} style={{ backgroundColor: "#f86f3e", color: "white", marginLeft: '10px' }}>Add Course</button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Duration</th>
                <th>Fees</th>
                <th>Description</th>
                <th>Available Seats</th>
                <th>Institution</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.duration}</td>
                  <td>{course.fees}</td>
                  <td>{course.description}</td>
                  <td>{course.availableSeats}</td>
                  <td>{course.institution}</td>
                  <td>
                    <button
                      className='enroll-button'
                      style={{ width: '100px' }}
                      onClick={() => handleEditClick(course)}
                    >
                      Edit
                    </button>
                    <br />
                    <br />
                    <button
                      className='enroll-button'
                      style={{ width: '100px'}}
                      onClick={() => handleDeleteClick(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editFormVisible && selectedCourse && (
          <div className='enrollment-form' style={{ width: '70vw' }}>
            <h2>Edit Course Information</h2>
            <label>Name:</label>
            <input
              type='text'
              name='name'
              value={editedCourse.name}
              onChange={handleInputChange}
            />
            <div className='lediv' style={{ width: '40%', float: 'left' }}>
              <label>Duration:</label>
              <input
                type='text'
                name='duration'
                value={editedCourse.duration}
                onChange={handleInputChange}
              />
              <label>Description:</label>
              <input
                type='text'
                name='description'
                value={editedCourse.description}
                onChange={handleInputChange}
              />
              <label>Institution:</label>
              <input
                type='text'
                name='institution'
                value={editedCourse.institution}
                onChange={handleInputChange}
              />
            </div>
            <div className='rediv' style={{ width: '40%', float: 'right', marginRight: "2vw" }}>
              <label>Fees:</label>
              <input
                type='text'
                name='fees'
                value={editedCourse.fees}
                onChange={handleInputChange}
              />
              <label>Available Seats:</label>
              <input
                type='text'
                name='availableSeats'
                value={editedCourse.availableSeats}
                onChange={handleInputChange}
              />
            </div>
            <br /><br />
            <div style={{ display: "flex", marginTop: "30vh" }}>
              <button onClick={handleSaveClick} style={{ marginRight: "2vw" }} >Save</button>
              <button onClick={handleEditFormClose} style={{ backgroundColor: "grey" }}>Close</button></div>
          </div>
        )}
        {addFormVisible && (
          <div className='enrollment-form' style={{ width: '70vw' }}>
            <h2>Add Course Information</h2>
            <label>Name:</label>
            <input type='text' name='name' />
            <div className='lediv' style={{ width: '40%', float: 'left' }}>
              <label>Duration:</label>
              <input type='text' name='duration' />
              <label>Description:</label>
              <input type='text' name='description' />
              <label>Institution:</label>
              <input type='text' name='institution' />
            </div>
            <div className='rediv' style={{ width: '40%', float: 'right', marginRight: '2vw' }}>
              <label>Fees:</label>
              <input type='text' name='fees' />
              <label>Available Seats:</label>
              <input type='text' name='availableSeats' />
            </div>
            <br /><br />
            <div style={{ display: 'flex', marginTop: '30vh' }}>
              <button onClick={handleAddSaveClick} style={{ marginRight: '5vw' }}>
                Save
              </button>
              <div style={{ width: '2vw' }}></div>
              <button style={{ backgroundColor: 'grey' }} onClick={handleAddFormClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default AdminCourse;
