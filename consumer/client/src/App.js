import React from 'react'
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import CustomerLogin from './component/admin/CustomerLogin'
import CustomerRegister from './component/admin/CustomerRegister';
import CustomerProfile from './component/admin/CustomerProfile';


function App() {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/" element={<CustomerProfile />} />
          <Route path="/login" element={<CustomerLogin />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;

