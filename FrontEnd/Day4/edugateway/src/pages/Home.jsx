import React from 'react'
import { useState } from 'react';
import '../assets/css/Home.css';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state && location.state.userEmail;
  const [hoveredDiv, setHoveredDiv] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredDiv(index);
  };
  const handleCreateProfile= () => {
    navigate('/createprofile');
  };
  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };

  return (
    <>
      <header>
        <NavBar isLoggedIn={userEmail} userEmail={userEmail} />
      </header>
      <div className='hbody'>
        <div className='central-content'>
          {/* Add your central content here */}
          <h1 className="fade-in">Welcome to Edu-GateWay</h1>
          <p className="fade-in">Explore the world of education with more than 200 colleges, 300 courses, and a vibrant community of over 1500 students.</p>
          <div className='additional-content'>
            <h2 className="fade-in">Our Mission</h2>
            <p className="fade-in">Empowering students to achieve their dreams through quality education and personalized learning experiences.</p>

            <h2 className="fade-in">Why Choose Edu-GateWay?</h2>
            <p className="fade-in">
              <ul>
                <li className="fade-in">Wide range of courses</li>
                <li className="fade-in">Top-notch colleges and universities</li>
                <li className="fade-in">Community-driven platform</li>
              </ul>
            </p>
            <br></br>
            <button onClick={handleCreateProfile}>Create Profile</button>
            
          </div>
        </div>
        <div className='hidiv'>
          <div className={`hhover-div ${hoveredDiv === 1 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
            <h2 className="custom-font">More than 200 colleges</h2>
          </div>
          <div className={`hhover-div ${hoveredDiv === 2 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
            <h2 className="custom-font">More than 300 courses</h2>
          </div>
          <div className={`hhover-div ${hoveredDiv === 3 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
            <h2 className="custom-font">More than 1500 students</h2>
          </div>
          <div className={`hhover-div ${hoveredDiv === 4 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}>
            <h2 className="custom-font">More than 1500 students</h2>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Home;