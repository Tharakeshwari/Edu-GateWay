// Institutes.js

// Institutes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';
import {Link, useNavigate} from 'react-router-dom';
import '../assets/css/Institutes.css';
const Institutes = () => {
  const navigate = useNavigate();
  const [collegesData, setCollegesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch colleges data when the component mounts
    axios.get('http://localhost:8081/institutes')
      .then(response => {
        setCollegesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching colleges data:', error);
      });
  }, []);
  const handleEnrollInstitute= (instituteId) => {
    navigate('/course', { state: { instituteId } });
}
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredColleges = collegesData.filter((college) =>
    college.instituteName.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h3>{college.instituteName}</h3>
                <button className='ienroll-button' onClick={()=>{handleEnrollInstitute(college.instituteId)}}>Enroll Now</button>
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



        