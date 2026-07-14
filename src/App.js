import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Contacts from './pages/Contact';
import Gallery from './pages/Gallery';
import PeoplePage from './pages/PeoplePage';
import LoginPage from './pages/LoginPage';
import CarParkingPage from './pages/CarParkingPage';
import StarRating from './pages/StarRating';
import HotelLocation from './pages/HotelLocation';
import HotelTransport from './pages/HotelTransport';
import ContactPayment from './pages/ContactPayment';
import GamePalace from './pages/GamePlace';
import RooftopClub from './pages/RooftopClub';
import Bathroom from './pages/Bathroom';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hotel_admin_logged') === 'true';
  });

  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = () => {
    localStorage.setItem('hotel_admin_logged', 'true');
    setIsAuthenticated(true);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('hotel_admin_logged');
      setIsAuthenticated(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout} 
      />
      
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />
        
        <div className="content-body">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'rooms' && <Rooms />}
          {activePage === 'people' && <PeoplePage />}
          {activePage === 'parking' && <CarParkingPage />}
          {activePage === 'contacts' && <Contacts />}
          {activePage === 'gallery' && <Gallery />}
          {activePage === 'starrating' && <StarRating />}
          {activePage === "location" && <HotelLocation />}
          {activePage === "transport" && <HotelTransport />}
          {activePage === "payment" && <ContactPayment />}
          {activePage === 'rooftop' && <RooftopClub />}
          {activePage === 'bathroom' && <Bathroom />}
          {activePage === 'gameplace' && <GamePalace />}
        </div>
      </div>
    </div>
  );
}

export default App;