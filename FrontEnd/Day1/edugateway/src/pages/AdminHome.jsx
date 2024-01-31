import React, { useState } from 'react';
import '../assets/css/Home.css';
import Footer from '../components/Footer';
import AdminNav from '../components/AdminNav';

function AdminHome() {
  const [hoveredDiv, setHoveredDiv] = useState(null);
  const [isEditMode, setEditMode] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredDiv(index);
  };

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };

  const handleEditClick = () => {
    setEditMode(!isEditMode);
  };

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <div className='hbody'>
        <div className='central-content'>
          <h1 className="fade-in">Welcome to Edu-GateWay</h1>
          <p className="fade-in">Explore the world of education with more than 200 colleges, 300 courses, and a vibrant community of over 1500 students.</p>
          <div className='additional-content'>
            <h2 className={`fade-in ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
              Our Mission
            </h2>
            <p className={`fade-in ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
              Empowering students to achieve their dreams through quality education and personalized learning experiences.
            </p>

            <h2 className={`fade-in ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
              Why Choose Edu-GateWay?
            </h2>
            <p className={`fade-in ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
              <ul contentEditable={isEditMode}>
                <li className={`fade-in ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
                  Wide range of courses
                </li>
                <li className={`fade-in ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
                  Top-notch colleges and universities
                </li>
                <li className={`fade-in ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
                  Community-driven platform
                </li>
              </ul>
            </p>
          </div>
          <br></br>
          <button onClick={handleEditClick}>{isEditMode ? 'Save' : 'Edit'}</button>
        </div>
        <div className='hidiv'>
  <div className={`hhover-div ${hoveredDiv === 1 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
    <h2 className={`custom-font ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
      More than 200 colleges
    </h2>
  </div>
  <div className={`hhover-div ${hoveredDiv === 2 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
    <h2 className={`custom-font ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
      More than 300 courses
    </h2>
  </div>
  <div className={`hhover-div ${hoveredDiv === 3 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
    <h2 className={`custom-font ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
      More than 1500 students
    </h2>
  </div>
  <div className={`hhover-div ${hoveredDiv === 4 ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}>
    <h2 className={`custom-font ${isEditMode ? 'editable' : ''}`} contentEditable={isEditMode}>
      More than 1500 students
    </h2>
  </div>
</div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default AdminHome;
