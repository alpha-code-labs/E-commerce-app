import React from 'react'
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import AdminLogin from './component/admin/AdminLogin'
import AdminRegister from './component/admin/AdminRegister';


function App() {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<AdminRegister />} />
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;

