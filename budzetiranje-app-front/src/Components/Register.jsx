import React from 'react';
import { useState } from 'react';
import axios from '../axios';

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
    <div>
      <form onSubmit={handleRegister}>
        <div className="form-outline mb-4">
          <input
            type="username"
            id="formExample3"
            className="form-control form-control-lg"
            placeholder="Enter a valid username"
            name="name"
            onInput={handleInput} //fja se izvrsava svaki put kada unesemo nesto
          />
          <label className="form-label" htmlFor="formExample3">
            Username
          </label>

          <input
            type="email"
            id="formExample1"
            className="form-control form-control-lg"
            placeholder="Enter a valid email adress"
            name="email"
            onInput={handleInput} //fja se izvrsava svaki put kada unesemo nesto
          />
          <label className="form-label" htmlFor="formExample">
            Email address
          </label>
        </div>
        <div className="form-outline mb-3">
          <input
            type="password"
            id="formExample2"
            className="form-control form-control-lg"
            placeholder="Enter password"
            name="password"
            onInput={handleInput}
          />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
