import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import SubscriptionForm from './pages/Home/SubscriptionForm';
import AddProducts from './pages/Products/AddProducts';
import AdminProductInfo from './pages/Admin/AdminProductInfo';
import CustomerQuery from "./pages/Admin/CustomerQuery";
import FAQ from './pages/Home/FAQ';
import HelpCenter from './pages/Home/HelpCenter';
import GettingStarted from './pages/Home/HelpCenter/GettingStarted';
import AccountIssues from './pages/Home/HelpCenter/AccountIssues';
import TechnicalSupport from './pages/Home/HelpCenter/TechnicalSupport';
import AdminAddProduct from './pages/Admin/AdminAddProduct';
import SubscriptionInfo from './pages/SubscriptionInfo';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subscription" element={<SubscriptionForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/help/getting-started" element={<GettingStarted />} />
            <Route path="/help/account-issues" element={<AccountIssues />} />
            <Route path="/help/technical-support" element={<TechnicalSupport />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin/user-details" element={<UserDetails />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
            <Route path="/admin/user-registration" element={<UserRegistration />} />
            <Route path="/admin/product/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/product/notification" element={<AdminNotification />} />
            <Route path="/admin/product/visualization" element={<AdminProductChart />} />
            <Route path="/admin/product/product-info" element={<AdminProductInfo />} />
            <Route path="/product/home" element={<ProductHome />} />
            <Route path="/product/visualization" element={<ProductCharts />} />
            <Route path="/product/notifications" element={<Notifications />} />
            <Route path="/product/product-info" element={<Product />} />
            <Route path="/product/add" element={<AddProducts />} />

            <Route path="/invenquity/product/subscription-info" element={<SubscriptionInfo />} />
            <Route path="/invenquity/product/subscription-info/query" element={<CustomerQuery />} />
          </Routes>
        </div>
        <Footer />  
      </BrowserRouter>
    </div>
  );
}

export default App;
