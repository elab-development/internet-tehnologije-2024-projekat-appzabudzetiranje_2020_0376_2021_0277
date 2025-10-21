import React from 'react';
import './NavBar.css';
import axios from '../../axios';
import { Outlet } from 'react-router-dom';

function NavBar({ token }) {
  function handleLogout(e) {
    e.preventDefault();
    let config = {
      method: 'post',
      url: 'api/logout',
      headers: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        //Kada se izlogujemo nas token treba izbrisati
        window.sessionStorage.setItem('auth_token', null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="navBar">
        <a href="/home/friends">My friends</a>
        <a href="/home/expenses">Expenses</a>
        <a href="/home/my-debts">My debts</a>
        {/* Pre je stajao ovaj kod window.sessionStorage.getItem('auth_token') == null */}
        {token == null ? (
          <a href="/login">Login</a>
        ) : (
          <a href="/home" onClick={handleLogout}>
            Logout
          </a>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default NavBar;
