// AboutUs.js

import React, { useState } from 'react';
import '../assets/css/AboutUs.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function AboutUs() {
  const [hoveredDiv, setHoveredDiv] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredDiv(index);
  };

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };

  return (
    <>
      <header>
      <NavBar/>
      </header>
      <div className='abody'>
        <div className={`hover-div ${hoveredDiv === 1 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
          <h2 className="custom-font">College Admission Portal</h2>
          <p className="custom-font">Explore our comprehensive college admission portal that provides valuable information for prospective students.Explore our comprehensive college admission portal that provides valuable information for prospective students.</p>
        </div>
        <div className={`hover-div ${hoveredDiv === 2 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
          <h2 className="custom-font">College Admission Process</h2>
          <p className="custom-font">Learn about our streamlined admission process designed to make your journey to college smooth and efficient.Learn about our streamlined admission process designed to make your journey to college smooth and efficient.</p>
        </div>
        <div className={`hover-div ${hoveredDiv === 3 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
          <h2 className="custom-font">Scholarship Opportunities</h2>
          <p className="custom-font">Discover various scholarship opportunities that can help you achieve your academic goals.Discover various scholarship opportunities that can help you achieve your academic goals.Discover various scholarship opportunities.</p>
        </div>
      </div>
      <footer><Footer/></footer>
    </>
  );
}

export default AboutUs;
