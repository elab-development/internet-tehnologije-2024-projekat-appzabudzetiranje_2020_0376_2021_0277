import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Components/Products';
import LoginPage from './Components/LoginPage/LoginPage';
import Register from './Components/RegisterPage/Register';
import { useState } from 'react';
import Friends from './Components/Friends/Friends';
import Expenses from './Components/Expenses/Expenses';
import MyDebts from './Components/MyDebts/MyDebts';

function App() {
  const [token, setToken] = useState();
  function addToken(auth_token) {
    setToken(auth_token);
  }

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route
          path="/login"
          element={<LoginPage addToken={addToken}></LoginPage>}
        />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/" element={<LoginPage addToken={addToken}></LoginPage>} />
        <Route path="/home" element={<NavBar token={token}></NavBar>}>
          <Route path="friends" element={<Friends></Friends>} />
          <Route path="expenses" element={<Expenses></Expenses>} />
          <Route path="my-debts" element={<MyDebts></MyDebts>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
