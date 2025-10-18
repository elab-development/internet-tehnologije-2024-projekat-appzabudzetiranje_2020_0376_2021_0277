import './App.css';
import NavBar from './Components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Components/Products';
import LoginPage from './Components/LoginPage';
import axios from 'axios';
import Register from './Components/Register';

function App() {
  axios.defaults.baseURL = 'http://localhost:8000';
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Products></Products>} />
        {/* <Route path="budget" element = {<Budget></Budget>}/> */}
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
