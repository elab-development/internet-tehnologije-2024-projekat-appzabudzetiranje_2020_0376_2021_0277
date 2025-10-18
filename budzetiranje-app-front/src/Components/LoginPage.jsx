import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
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
          //Unutar application dela mozemo da vidimo local storage

          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div onSubmit={handleLogin}>
      <form>
        <div className="form-outline mb-4">
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
          Login
        </button>
        <a href="/register">Register an account</a>
      </form>
    </div>
  );
};

export default LoginPage;
