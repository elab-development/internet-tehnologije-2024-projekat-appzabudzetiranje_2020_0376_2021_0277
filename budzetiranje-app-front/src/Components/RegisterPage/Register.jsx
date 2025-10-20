import React from 'react';
import { useState } from 'react';
import axios from '../../axios';
import './Register.css';

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  //Pomocna funkcija koja obradjuje unos
  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Get CSRF cookie
      await axios.get('/sanctum/csrf-cookie');

      // Step 2: Register the user
      const res = await axios.post('/api/register', userData);

      console.log('Registered successfully:', res.data);

      // Step 3: Navigate to login page
      navigate('/login');
    } catch (err) {
      console.error(
        'Registration failed:',
        err.response?.status,
        err.response?.data
      );
    }
  };

  return (
    <div className="login-container-flex">
      <div className="register-container">
        <form onSubmit={handleRegister} className="login-form">
          <h2>
            Regis<u>ter</u>
          </h2>
          <div className="input-field-container">
            <label className="form-label" htmlFor="formExample">
              Name:
            </label>
            <input
              type="name"
              className=""
              placeholder="Enter your name"
              name="name"
              onInput={handleInput} //fja se izvrsava svaki put kada unesemo nesto
            />
          </div>
          <br />
          <div className="input-field-container">
            <label className="form-label" htmlFor="formExample">
              Email:
            </label>
            <input
              type="email"
              className=""
              placeholder="Enter a valid email adress"
              name="email"
              onInput={handleInput} //fja se izvrsava svaki put kada unesemo nesto
            />
          </div>
          <br />
          <div className="input-field-container">
            <label className="form-label" htmlFor="formExample">
              Password:
            </label>
            <input
              type="password"
              className=""
              placeholder="Enter password"
              name="password"
              onInput={handleInput}
            />
          </div>
          <br />
          <div className="input-field-container">
            <button type="submit" className="login-button">
              Register
            </button>
            <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
