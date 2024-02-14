// Login.js

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import '../assets/css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid Email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Invalid Password');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    setIsButtonClicked(true);
    validateEmail();
    validatePassword();
  
    if (emailError === '' && passwordError === '' && email.trim() !== '' && password.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8081/api/v1/auth/authenticate', {
          email: email,
          password: password,
        });
  
        console.log(response.data.message);
        // Dispatch the login action
        dispatch(login({ email: email, ...response.data.user })); // Assuming the response has a 'user' property
        navigate('/', { state: { userEmail: email } });
      } catch (error) {
        setPasswordError("Invalid Email or Password")
        if (error.response && error.response.data) {
          console.error(error.response.data);
          // Handle error response from server
        } else if (error.request) {
          console.error(error.request);
          // Handle request error
        } else {
          console.error('Error', error.message);
          // Handle unknown error
        }
      }
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center', color: 'grey', paddingLeft: '46vw' }}>
      </div>
      <div className="ldiv1">
        <div className="ldiv2">
          <div className="ldiv3">
            <img
              src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Background"
            />
          </div>
          <div className="ldiv4">
            <h2 className="lh2">LOGIN</h2>
            <form className="lform">
              <div className="linput-box">
                <input
                  required
                  type="text"
                  placeholder="Username"
                  className={`linput ${isButtonClicked && emailError ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  onBlur={validateEmail}
                />
                {isButtonClicked && emailError && (
                  <p className="error-message" style={{ color: 'red' }}>
                    {emailError}
                  </p>
                )}
              </div>
              <div className="linput-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className={`linput ${isButtonClicked && passwordError ? 'error' : ''}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  onBlur={validatePassword}
                />
                {isButtonClicked && passwordError && (
                  <p className="error-message" style={{ color: 'red' }}>
                    {passwordError}
                  </p>
                )}
              </div>
              <button type="button" onClick={handleLogin} className="lbutton">
                LOGIN
              </button>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to="/adminlogin">Admin Login</Link>
              </p>
              <br></br>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
