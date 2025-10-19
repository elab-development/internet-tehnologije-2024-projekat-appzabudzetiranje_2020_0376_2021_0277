import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Components/Products';
import LoginPage from './Components/LoginPage';
import Register from './Components/Register';
import { useState } from 'react';
import Friends from './Components/Friends/Friends';

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
        <Route path="/" element={<NavBar token={token}></NavBar>}>
          <Route path="friends" element={<Friends></Friends>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
