import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inventory from './pages/Inventory';

function App() {
  const admin = new URLSearchParams(window.location.search).get('token');

  if (!admin) {
    window.location.href = 'http://localhost:3001/login';
    return null; // Return null to prevent rendering any other component
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


