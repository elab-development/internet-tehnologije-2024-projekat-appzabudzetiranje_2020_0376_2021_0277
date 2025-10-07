import './App.css';
import NavBar from './Components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './Components/Products';

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Products></Products>} />
        {/* <Route path="budget" element = {<Budget></Budget>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
