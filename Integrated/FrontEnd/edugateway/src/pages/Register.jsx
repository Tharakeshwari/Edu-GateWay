import React, { useState } from 'react';
import '../assets/css/Register.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

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

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('Invalid Phone Number');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleRegister = () => {
    setIsButtonClicked(true);
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validatePhoneNumber();

    if (
      nameError === '' &&
      emailError === '' &&
      passwordError === '' &&
      confirmPasswordError === '' &&
      phoneNumberError === '' &&
      name.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      phoneNumber.trim() !== ''
    ) {
      setLoading(true);
      axios.post('http://localhost:8081/api/v1/auth/register', {
        name,
        email,
        password,
        phoneNumber
      })
      .then(response => {
        setLoading(false);
        navigate('/', { state: { userEmail: email } });
      })
      .catch(error => {
        console.error('Error registering:', error);
        setLoading(false);
      });
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
                    placeholder="Name"
                    required
                    className={`rinput ${isButtonClicked && nameError ? 'error' : ''}`}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError('');
                    }}
                    onBlur={validateName}
                  />
                  {isButtonClicked && nameError && <p className="error-message">{nameError}</p>}
                </div>
                <div className="rinput-box">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className={`rinput ${isButtonClicked && emailError ? 'error' : ''}`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    onBlur={validateEmail}
                  />
                  {isButtonClicked && emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="rinput-box">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    className={`rinput ${isButtonClicked && passwordError ? 'error' : ''}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    onBlur={validatePassword}
                  />
                  {isButtonClicked && passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className="rinput-box">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className={`rinput ${isButtonClicked && confirmPasswordError ? 'error' : ''}`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError('');
                    }}
                    onBlur={validateConfirmPassword}
                  />
                  {isButtonClicked && confirmPasswordError && (
                    <p className="error-message">{confirmPasswordError}</p>
                  )}
                </div>
                <div className="rinput-box">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className={`rinput ${isButtonClicked && phoneNumberError ? 'error' : ''}`}
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setPhoneNumberError('');
                    }}
                    onBlur={validatePhoneNumber}
                  />
                  {isButtonClicked && phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
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
