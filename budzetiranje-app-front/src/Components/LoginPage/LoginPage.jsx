import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ addToken }) => {
  //useState hook koji je predstavljen kao objekat
  const [userData, setUserData] = useState({
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

  function handleLogin(e) {
    e.preventDefault();
    //Moramo ovo da uradimo jer postoje neke default stvari koje forma radi,
    //kao sto je refresh stranice, to nama ne odgovara
    //handleLogin je na onSubmit-u pa zato

    axios
      .post('/api/login', userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          window.sessionStorage.setItem('auth_token', res.data.access_token);
          addToken(res.data.access_token);
          //Unutar application dela mozemo da vidimo local storage

          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login-container-flex">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>
            Log<u>in</u>
          </h2>
          <div>
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
          </div>
          <br />
          <div className="input-field-container">
            <button type="submit" className="login-button">
              Login
            </button>
            <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
