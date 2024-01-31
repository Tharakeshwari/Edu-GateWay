// Institutes.js
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../assets/css/Institutes.css';
import {Link, useNavigate} from 'react-router-dom';
import Sidebar from '../components/SideBar';

const Institutes = () => {
  const navigate = useNavigate();
  const collegesData = [
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
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const handleEnrollInstitute= () => {
        navigate('/course');
    }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredColleges = collegesData.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <Sidebar />
      </header>
      <body className='ibody'>
        <input
          style={{ width: '500px', marginLeft: '100px', marginRight: '60px' }}
          type='text'
          placeholder='Search Colleges'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul className='iul'>
          {filteredColleges.map((college) => (
            <li key={college.id}>
              <div className='college-card'>
                <h3>{college.name}</h3>
                  <button className='ienroll-button' onClick={handleEnrollInstitute}>Enroll Now</button>
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
              </div>
            </li>
          ))}
        </ul>
      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Institutes;