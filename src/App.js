import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminHome from './pages/Admin/AdminHome';
import UserDetails from './pages/Admin/UserOperation/UserDetails';
import Footer from './components/Footer';

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
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin/user-details" element={<UserDetails />} />
          </Routes>
        </div>
        <Footer />  
      </BrowserRouter>
    </div>
  );
}

export default App;
