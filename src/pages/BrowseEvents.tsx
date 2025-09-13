import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Button } from '@progress/kendo-react-buttons';
import { Badge } from '@progress/kendo-react-indicators';
import { events, categories, locations } from '../data/events';

const BrowseEvents: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const categoryMatch = !selectedCategory || event.category === selectedCategory;
      const locationMatch = !selectedLocation || event.location === selectedLocation;
      const dateMatch = !selectedDate || 
        event.date.toDateString() === selectedDate.toDateString();
      
      return categoryMatch && locationMatch && dateMatch;
    });
  }, [selectedCategory, selectedLocation, selectedDate]);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setSelectedDate(null);
  };

  const handleViewEvent = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="browse-events-page">
      <h1 className="page-title">Browse Events</h1>
      
      {/* Filters Section */}
      <div className="filters-section">
        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Filter Events</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <DropDownList
              data={['All Categories', ...categories]}
              value={selectedCategory || 'All Categories'}
              onChange={(e) => setSelectedCategory(e.value === 'All Categories' ? '' : e.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Location</label>
            <DropDownList
              data={['All Locations', ...locations]}
              value={selectedLocation || 'All Locations'}
              onChange={(e) => setSelectedLocation(e.value === 'All Locations' ? '' : e.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Date</label>
            <DatePicker
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.value)}
              placeholder="Select date"
            />
          </div>
          <div className="filter-group">
            <Button
              themeColor="secondary"
              onClick={handleClearFilters}
              style={{ marginTop: '1.5rem' }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', color: 'white' }}>
          Showing {filteredEvents.length} of {events.length} events
        </div>
      </div>

      {/* Events Cards Grid */}
      <div className="events-grid">
        {filteredEvents.map((event) => (
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
                    📅 {formatDate(event.date)}
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
                View Details & Book
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: 'white',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3>No events found</h3>
          <p>Try adjusting your filters to see more events.</p>
          <Button
            themeColor="primary"
            onClick={handleClearFilters}
            style={{ marginTop: '1rem' }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default BrowseEvents;
