// Course.js
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import '../assets/css/Course.css';
import Footer from '../components/Footer';

function Course() {
  const coursesData = [
    {
      id: 1,
      name:'Computer Science Engineering',
      duration: '4 years',
      fees: '$10,000',
      description: 'Computer Science Engineering',
      availableSeats: 50,
      institution: 'ABC University',
    },
    {
        id: 1,
        name:'Computer Science Engineering',
        duration: '4 years',
        fees: '$10,000',
        description: 'Computer Science Engineering',
        availableSeats: 50,
      institution: 'ABC University',
    },
    {
        id: 1,
        duration: '4 years',
        name:'Computer Science Engineering',
        fees: '$10,000',
        description: 'Computer Science Engineering',
        availableSeats: 50,
        institution: 'ABC University',
    },
    {
        id: 1,
        name:'Computer Science Engineering',
        duration: '4 years',
        fees: '$10,000',
        description: 'Computer Science Engineering',
        availableSeats: 50,
        institution: 'ABC University',
    },
    {
        id: 1,
        name:'Computer Science Engineering',
      duration: '4 years',
      fees: '$10,000',
      description: 'Computer Science Engineering',
      availableSeats: 50,
      institution: 'ABC University',
    },
    // Add more course data as needed
  ];
  const [confirmationBoxVisible, setConfirmationBoxVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollmentFormVisible, setEnrollmentFormVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setEnrollmentFormVisible(true);
  };

  const handleEnrollmentFormClose = (course) => {
    setEnrollmentFormVisible(false);
    setSelectedCourse(course);

    // Display an alert with OK and Cancel buttons
    const confirmation = window.confirm(`Do you want to enroll in ${course.name}?`);

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
  };

  const handleCancel = () => {
    // Close the confirmation box
    setConfirmationBoxVisible(false);
    setEnrollmentFormVisible(false);
  };
  const filteredCourses = coursesData.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <NavBar />
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
            <h2>Enrollment Form for {selectedCourse.name}</h2>
            <p>College: {selectedCourse.institution}</p>
            <p>Duration: {selectedCourse.duration}</p>
            <p>Fees: {selectedCourse.fees}</p>
            <label>Marks: <input type="text" /></label><br />
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
