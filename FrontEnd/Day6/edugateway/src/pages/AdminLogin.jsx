// Login.js

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import '../assets/css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid Email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    // Password validation: at least 1 letter, 1 number, 1 symbol, minimum length 8
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Invalid Password');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    // Perform validation before proceeding with login
    validateEmail();
    validatePassword();

    if (emailError === '' && passwordError === '' && email.trim() !== '' && password.trim() !== '') {
      // Proceed with login logic
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 700);
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', color: 'grey', paddingLeft: '46vw' }}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="ldiv1">
          <div className="ldiv2">
            <div className="ldiv3">
              {/* Image for ldiv3 (replace with your own image) */}
              <img
                src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Background"
              />
            </div>
            <div className="ldiv4">
              {/* Content for ldiv4 */}
              <h2 className="lh2">ADMIN LOGIN</h2>
              <form className="lform">
                <div className="linput-box">
                  <input
                    required
                    type="text"
                    placeholder="Username"
                    className={`linput ${emailError ? 'error' : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    onBlur={validateEmail}
                  />
                  {emailError && <p className="error-message" style={{ color: 'red' }}>{emailError}</p>}
                </div>
                <div className="linput-box">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className={`linput ${passwordError ? 'error' : ''}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    onBlur={validatePassword}
                  />
                  {passwordError && <p className="error-message" style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <button type="button" onClick={handleLogin} className="lbutton">
                  LOGIN
                </button>
               
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminLogin;
