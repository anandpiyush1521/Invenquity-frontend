import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        {/* <Footer />  Add the Footer component */}
      </BrowserRouter>
    </div>
  );
}

export default App;
