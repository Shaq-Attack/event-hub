import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Badge } from '@progress/kendo-react-indicators';
import type { Event } from '../data/events';

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: string) => void;
  variant?: 'default' | 'featured';
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onViewDetails, 
  variant = 'default' 
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`event-card ${variant === 'featured' ? 'featured' : ''}`}>
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
        {event.featured && variant === 'featured' && (
          <Badge
            className="featured-badge"
            themeColor="warning"
          >
            FEATURED
          </Badge>
        )}
      </div>
      
      <div className="event-card-content">
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
          <span className={`availability-indicator ${
            event.availableTickets > 100 ? 'high' : 
            event.availableTickets > 50 ? 'medium' : 'low'
          }`}>
            {event.availableTickets} tickets available
          </span>
        </div>
        
        <Button
          className="view-event-button"
          themeColor="primary"
          fillMode="solid"
          onClick={() => onViewDetails(event.id)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
