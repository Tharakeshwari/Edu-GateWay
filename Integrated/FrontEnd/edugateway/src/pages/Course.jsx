import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../assets/css/Course.css';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBar';
import { useLocation } from 'react-router-dom';

function Course() {
  const location = useLocation();
  const instituteId = location.state && location.state.instituteId;
  const [coursesData, setCoursesData] = useState([]);
  const [confirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollmentFormVisible, setEnrollmentFormVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    // Fetch colleges data when the component mounts
    axios.get('http://localhost:8081/courses')
      .then(response => {
        setCoursesData(response.data);
        console.log(coursesData);
      })
      .catch(error => {
        console.error('Error fetching courses data:', error);
      });
      console.log(coursesData.instituteId);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEnrollClick = (course) => {
    setSelectedCourse({ ...course, institution: course.instituteId });
    setEnrollmentFormVisible(true);
  };

  const handleEnrollmentFormClose = (course) => {
    setEnrollmentFormVisible(false);
    setSelectedCourse(course);

    // Display an alert with OK and Cancel buttons
    const confirmation = window.confirm(`Do you want to enroll?`);

    // Check if the user clicked OK
    if (confirmation) {
      setEnrollmentFormVisible(true);
      setPaymentVisible(true);
    }
  };

  const handleProceedToPayment = () => {
    // Show the confirmation box
    setConfirmationBoxVisible(true);
  };

  const handleConfirm = () => {
    // Handle confirmation logic (e.g., proceed to payment)
    // For now, let's close the confirmation box
    setConfirmationBoxVisible(false);

    // Fetch the courseId from the selectedCourse
    const courseId = selectedCourse && selectedCourse.courseId;

    // Make a POST request to create admission
    axios.post(`http://localhost:8081/admissions?studentId=${studentId}&courseId=${courseId}`, {
      status: "Pending",
    })
    .then(response => {
      console.log('Admission created:', response.data);
      // Additional logic if needed after admission creation
    })
    .catch(error => {
      console.error('Error creating admission:', error);
    });
};



  const handleCancel = () => {
    // Close the confirmation box
    setConfirmationBoxVisible(false);
    setEnrollmentFormVisible(false);
  };

  const filteredCourses = coursesData.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <Sidebar />
      </header>
      <body className='cbody'>
        <div className={`course-container ${enrollmentFormVisible ? 'dark-overlay' : ''}`}>
          <h1>Available Courses</h1>
          <input
            type="text"
            placeholder="Search Courses"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
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
                <tr key={course.courseId}>
                  <td>{course.courseName}</td>
                  <td>{course.courseDuration}</td>
                  <td>{course.fees}</td>
                  <td>{course.courseDescription}</td>
                  <td>{course.noOfSeats}</td>
                  <td>{instituteId}</td>
                  <td>
                    <button
                      className='enroll-button'
                      onClick={() => handleEnrollClick(course)}
                    >
                      Enroll Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enrollment Form */}
        {!confirmationBoxVisible && enrollmentFormVisible && selectedCourse && (
          <div className='enrollment-form'>
            <h2>Enrollment Form for {selectedCourse.courseName}</h2>
            <p>College:{instituteId}</p>
            <p>Duration: {selectedCourse.courseDuration}</p>
            <p>Fees: {selectedCourse.fees}</p>
            <label>Student ID: <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} /></label><br />
            {/* Add other form fields as needed */}
            {/* Add a submit button for the enrollment form */}
            {!paymentVisible && (
              <button onClick={() => handleEnrollmentFormClose(selectedCourse)}>Enroll</button>
            )}
            {paymentVisible && (
              <button onClick={handleProceedToPayment}>Proceed to Payment</button>
            )}
          </div>
        )}
        {confirmationBoxVisible && (
          <div className="confirmation-box">
            <p>Are you sure you want to proceed to payment?</p>
            <button onClick={handleConfirm} className='confirmbut'>Confirm</button>
            <button onClick={handleCancel} className='confirmbut'>Close</button>
          </div>
        )}
      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Course;
