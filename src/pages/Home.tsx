import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { Badge } from '@progress/kendo-react-indicators';
import { events } from '../data/events';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredEvents = events.filter(event => event.featured);

  const handleViewEvent = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleBrowseAll = () => {
    navigate('/browse');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to EventHub</h1>
          <p className="hero-subtitle">
            Discover and book amazing events happening around you. From concerts and sports 
            to conferences and cultural experiences - find your next adventure here.
          </p>
          <Button
            className="hero-button"
            themeColor="primary"
            size="large"
            onClick={handleBrowseAll}
          >
            Browse All Events
          </Button>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Events</h2>
          <p>Don't miss out on these popular events</p>
        </div>

        <div className="featured-events-grid">
          {featuredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image-container">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="event-image"
                />
                <Badge
                  className="event-category-badge"
                  themeColor="primary"
                >
                  {event.category}
                </Badge>
              </div>
              
              <div className="event-card-content">
                <div className="event-content-top">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-details">
                    <p className="event-date">
                      📅 {event.date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="event-time">🕐 {event.time}</p>
                    <p className="event-location">📍 {event.location}</p>
                    <p className="event-price">💰 ${event.price}</p>
                  </div>
                  
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-availability">
                    <span className={`availability-indicator ${event.availableTickets > 100 ? 'high' : event.availableTickets > 50 ? 'medium' : 'low'}`}>
                      {event.availableTickets} tickets available
                    </span>
                  </div>
                </div>
                
                <Button
                  className="view-event-button"
                  themeColor="primary"
                  fillMode="solid"
                  onClick={() => handleViewEvent(event.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Events Listed</p>
          </div>
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Tickets Sold</p>
          </div>
          <div className="stat-item">
            <h3>25+</h3>
            <p>Cities Covered</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
