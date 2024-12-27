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
import ProductHome from './pages/Products/ProductHome';
import UserRegistration from './pages/Admin/UserOperation/UserRegistration';
import About from './pages/Home/About';
import Contact from './pages/Home/Contact';
import ProductCharts from './pages/Products/Charts/ProductCharts';
import Notifications from './components/Notifications';
import AdminDashboard from './pages/Admin/AdminDashoard';
import AdminNotification from './pages/Admin/AdminNotification';
import AdminProductChart from './pages/Admin/AdminProductChart';
import Product from './pages/Products/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin/user-details" element={<UserDetails />} />
            <Route path="/admin/user-registration" element={<UserRegistration />} />
            <Route path="/admin/product/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product/notification" element={<AdminNotification />} />
            <Route path="/admin/product/visualization" element={<AdminProductChart />} />
            <Route path="/product/home" element={<ProductHome />} />
            <Route path="/product/visualization" element={<ProductCharts />} />
            <Route path="/product/notifications" element={<Notifications />} />

            <Route path="/product/" element={<Product />} />
          </Routes>
        </div>
        <Footer />  
      </BrowserRouter>
    </div>
  );
}

export default App;
