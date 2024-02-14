import React, { useEffect, useState } from 'react';
import '../assets/css/Course.css';
import Footer from '../components/Footer';
import AdminNav from '../components/AdminNav';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function AdminCourse() {
  const location = useLocation();
  const instituteId = location.state && location.state.instituteId;
  const [coursesData, setCoursesData] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editedCourse, setEditedCourse] = useState(null);
  useEffect(() => {
    // Fetch courses data from the database when the component mounts
    axios.get(`http://localhost:8081/courses`)
      .then(response => {
        setCoursesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    // Copy the course data for editing
    setEditedCourse({ ...course, institution: course.institution || '' });
    setEditFormVisible(true);
  };
  const handleAddClick = () => {
    console.log(instituteId);
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
    const newCourse = {
      id: coursesData.length + 1,
      courseName: document.getElementsByName('courseName')[0].value,
      courseDuration: document.getElementsByName('courseDuration')[0].value,
      fees: document.getElementsByName('fees')[0].value,
      courseDescription: document.getElementsByName('courseDescription')[0].value,
      noOfSeats: document.getElementsByName('noOfSeats')[0].value,
      // institution: document.getElementsByName('institution')[0].value,
    };

    // Make a POST request to add the new course
    axios.post(`http://localhost:8081/courses/${instituteId}`, newCourse)
      .then(response => {
        // If successful, update the state with the new course
        setCoursesData(prevCourses => [...prevCourses, response.data]);
        setAddFormVisible(false);
      })
      .catch(error => {
        // Handle error
        console.error('Error adding course:', error);
      });
  };

  const handleAddFormClose = () => {
    setAddFormVisible(false);
  };

  const handleSaveClick = () => {
    console.log('Edited Course:', editedCourse);
    editedCourse.instituteId=instituteId;
    // Make a PUT request to update the edited course
    console.log(editedCourse.courseId);
    axios.put(`http://localhost:8081/courses/${editedCourse.courseId}`, editedCourse)
      .then(response => {
        // If successful, update the state with the edited course
        const updatedCourses = coursesData.map(course =>
          course.courseId === editedCourse.courseId ? response.data : course
        );
        setCoursesData(updatedCourses);
        setEditFormVisible(false);
        setSelectedCourse(null);
        setEditedCourse(null);
      })
      .catch(error => {
        // Handle error
        console.error('Error updating course:', error);
      });
  };
  
  const handleDeleteClick = async (courseId) => {
    try {
      // Make a DELETE request to delete the course
      console.log(courseId);
      await axios.delete(`http://localhost:8081/courses/${courseId}`);
      // If successful, update the state by removing the deleted course
      setCoursesData((prevCourses) => prevCourses.filter((course) => course.courseId !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };


  const filteredCourses = coursesData.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <td>{course.courseName}</td>
                  <td>{course.courseDuration}</td>
                  <td>{course.fees}</td>
                  <td>{course.courseDescription}</td>
                  <td>{course.noOfSeats}</td>
                  <td>{instituteId}</td>
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
                      onClick={() => handleDeleteClick(course.courseId)}
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
              name='courseName'
              value={editedCourse.courseName}
              onChange={handleInputChange}
            />
            <div className='lediv' style={{ width: '40%', float: 'left' }}>
              <label>Duration:</label>
              <input
                type='text'
                name='courseDuration'
                value={editedCourse.courseDuration}
                onChange={handleInputChange}
              />
              <label>Description:</label>
              <input
                type='text'
                name='courseDescription'
                value={editedCourse.courseDescription}
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
                name='noOfSeats'
                value={editedCourse.noOfSeats}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", marginTop: "30vh" }}>
              <button onClick={handleSaveClick} style={{ marginRight: "2vw" }} >Save</button>
              <button onClick={handleEditFormClose} style={{ backgroundColor: "grey" }}>Close</button>
            </div>
          </div>
        )}
        {addFormVisible && (
          <div className='enrollment-form' style={{ width: '70vw' }}>
            <h2>Add Course Information</h2>
            <label>Name:</label>
            <input type='text' name='courseName' />
            <div className='lediv' style={{ width: '40%', float: 'left' }}>
              <label>Duration:</label>
              <input type='text' name='courseDuration' />
              <label>Description:</label>
              <input type='text' name='courseDescription' />
            </div>
            <div className='rediv' style={{ width: '40%', float: 'right', marginRight: '2vw' }}>
              <label>Fees:</label>
              <input type='text' name='fees' />
              <label>Available Seats:</label>
              <input type='text' name='noOfSeats' />
            </div>
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
