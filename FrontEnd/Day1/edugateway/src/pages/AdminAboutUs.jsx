// AboutUs.js

import React, { useState } from 'react';
import '../assets/css/AboutUs.css';
import Footer from '../components/Footer';
import AdminNav from '../components/AdminNav';

function AdminAboutUs() {
  const [hoveredDiv, setHoveredDiv] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState({
    1: "Explore our comprehensive college admission portal that provides valuable information for prospective students.",
    2: "Learn about our streamlined admission process designed to make your journey to college smooth and efficient.",
    3: "Discover various scholarship opportunities that can help you achieve your academic goals."
  });

  const handleMouseEnter = (index) => {
    setHoveredDiv(index);
  };

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };

  const handleEditClick = (index) => {
    setEditMode(true);
    setHoveredDiv(index);
  };

  const handleSaveClick = (index) => {
    setEditMode(false);
    setHoveredDiv(null);
    // You may want to save the edited content to your backend or handle it as needed
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setHoveredDiv(null);
  };

  const handleContentChange = (index, event) => {
    const newContent = { ...editedContent, [index]: event.target.value };
    setEditedContent(newContent);
  };

  return (
    <>
      <header>
        <AdminNav />
      </header>
      <div className='abody'>
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className={`hover-div ${hoveredDiv === index ? 'hovered' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {editMode && hoveredDiv === index ? (
              <>
                <textarea
                  className="custom-font edit-textarea"
                  value={editedContent[index]}
                  onChange={(event) => handleContentChange(index, event)}
                />
                <br></br><br></br>
                {editMode ? <button onClick={() => handleSaveClick(index)}>Save</button> : null}
              </>
            ) : (
              <>
                <h2 className="custom-font">{`College Admission ${index}`}</h2>
                <p className="custom-font">{editedContent[index]}</p>
                <br></br><br></br>
                {editMode ? null : <button onClick={() => handleEditClick(index)}>Edit</button>}
              </>
            )}
          </div>
        ))}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default AdminAboutUs;
