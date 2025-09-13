import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Icon } from '@progress/kendo-react-common';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import BrowseEvents from './pages/BrowseEvents.tsx';
import EventDetails from './pages/EventDetails.tsx';
import MyBookings from './pages/MyBookings.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import './App.css';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="app">
      <AppBar className="app-bar">
        <AppBarSection>
          <h1 className="app-title" onClick={() => handleNavigation('/')}>
            EventHub
          </h1>
        </AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
          <Button
            className={`nav-button ${isActive('/') ? 'active' : ''}`}
            fillMode="flat"
            onClick={() => handleNavigation('/')}
          >
            Home
          </Button>
          <Button
            className={`nav-button ${isActive('/browse') ? 'active' : ''}`}
            fillMode="flat"
            onClick={() => handleNavigation('/browse')}
          >
            Browse Events
          </Button>
          <Button
            className={`nav-button ${isActive('/bookings') ? 'active' : ''}`}
            fillMode="flat"
            onClick={() => handleNavigation('/bookings')}
          >
            My Bookings
          </Button>
          <Button
            className={`nav-button ${isActive('/admin') ? 'active' : ''}`}
            fillMode="flat"
            onClick={() => handleNavigation('/admin')}
          >
            <Icon name="gear" /> Admin
          </Button>
        </AppBarSection>
      </AppBar>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
