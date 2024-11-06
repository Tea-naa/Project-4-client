import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './pages/Navbar'; 
import Footer from './pages/Footer'; 
import Insert from './pages/Insert'; 
import NoPage from './pages/NoPage';
import './pages/styles.css'; 

// Main App component that defines the structure and routes
function App() {
    return (
        <Router>
            <div className="app-container"> 
                
                <Navbar />

                <div className="main-content"> 
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/insert" element={<Insert />} />
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
