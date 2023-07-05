import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Rough from './components/inventory/addProduct/rough'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/rough" element={<Rough />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

