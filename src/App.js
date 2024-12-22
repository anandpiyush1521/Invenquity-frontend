import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import AdminLogin from './pages/Admin/AdminLogin';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </div>
        {/* <Footer />  Add the Footer component */}
      </BrowserRouter>
    </div>
  );
}

export default App;
