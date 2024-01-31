// Register.js

import React, { useState } from 'react';
import '../assets/css/Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateUsername = () => {
    // Your validation logic for username
    if (username.trim() === '') {
      setUsernameError('Username is required');
    } else {
      setUsernameError('');
    }
  };

  const validateEmail = () => {
    // Your validation logic for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid Email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    // Your validation logic for password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Invalid Password');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    // Your validation logic for confirming password
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = () => {
    // Perform validation before proceeding with registration
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    // Check if all validations pass
    if (
      usernameError === '' &&
      emailError === '' &&
      passwordError === '' &&
      confirmPasswordError === '' &&
      username.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== ''
    ) {
      // Proceed with registration logic
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Navigate to the next page or perform other registration logic
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
        <div className="rdiv1">
          <div className="rdiv2">
            <div className="rdiv3">
              <h2 className="rh2">REGISTER</h2>
              <form className="rform">
                <div className="rinput-box">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    className={`rinput ${usernameError ? 'error' : ''}`}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError('');
                    }}
                    onBlur={validateUsername}
                  />
                  {usernameError && <p className="error-message">{usernameError}</p>}
                </div>
                <div className="rinput-box">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className={`rinput ${emailError ? 'error' : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    onBlur={validateEmail}
                  />
                  {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="rinput-box">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className={`rinput ${passwordError ? 'error' : ''}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    onBlur={validatePassword}
                  />
                  {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className="rinput-box">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className={`rinput ${confirmPasswordError ? 'error' : ''}`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError('');
                    }}
                    onBlur={validateConfirmPassword}
                  />
                  {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                </div>
                <button type="button" onClick={handleRegister} className="rbutton">
                  REGISTER
                </button>
              </form>
            </div>
            <div className="rdiv4">
              <img
                src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Background"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
