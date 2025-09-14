import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { Notification } from '@progress/kendo-react-notification';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { events } from '../data/events';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookingVisible, setBookingVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="event-details-page">
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Event not found</h2>
          <Button themeColor="primary" onClick={() => navigate('/browse')}>
            Back to Browse Events
          </Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    setBookingVisible(true);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = () => {
    // Simulate booking
    setBookingVisible(false);
    setNotificationMessage(`Successfully booked ${quantity} ticket(s) for ${event.title}!`);
    setShowNotification(true);
    
    // Reset form
    setCurrentStep(0);
    setQuantity(1);
    setCustomerInfo({ name: '', email: '', phone: '' });
  };

  const handleCancelBooking = () => {
    setBookingVisible(false);
    setCurrentStep(0);
    setQuantity(1);
    setCustomerInfo({ name: '', email: '', phone: '' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const totalPrice = quantity * event.price;
  const progressValue = ((event.totalTickets - event.availableTickets) / event.totalTickets) * 100;

  const steps = [
    { label: 'Select Tickets' },
    { label: 'Enter Details' },
    { label: 'Confirm Booking' }
  ];

  return (
    <div className="event-details-page">
      <Button
        className="back-button"
        fillMode="outline"
        themeColor="primary"
        onClick={() => navigate('/browse')}
      >
        ← Back to Events
      </Button>

      <div className="event-header">
        <img 
          src={event.image} 
          alt={event.title}
          className="event-image-large"
        />
        
        <div className="event-info">
          <h1 className="event-title-large">{event.title}</h1>
          
          <div className="event-details-grid">
            <div className="detail-item">
              <span>📅</span>
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="detail-item">
              <span>🕐</span>
              <span>{event.time}</span>
            </div>
            <div className="detail-item">
              <span>📍</span>
              <span>{event.location}</span>
            </div>
            <div className="detail-item">
              <span>🏢</span>
              <span>{event.venue}</span>
            </div>
            <div className="detail-item">
              <span>🎭</span>
              <span>{event.category}</span>
            </div>
            <div className="detail-item">
              <span>👤</span>
              <span>{event.organizer}</span>
            </div>
          </div>

          <div className="price-section">
            <div className="price-large">${event.price}</div>
            <div>per ticket</div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'white' }}>
              <span>Tickets Sold</span>
              <span>{event.totalTickets - event.availableTickets} / {event.totalTickets}</span>
            </div>
            <ProgressBar value={progressValue} />
          </div>

          <Button
            themeColor="primary"
            size="large"
            onClick={handleBooking}
            disabled={event.availableTickets === 0}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {event.availableTickets === 0 ? 'Sold Out' : 'Book Now'}
          </Button>

          <div style={{ textAlign: 'center', color: 'white', fontSize: '0.9rem' }}>
            {event.availableTickets} tickets remaining
          </div>
        </div>
      </div>

      <TabStrip
        selected={currentStep}
        onSelect={(e) => setCurrentStep(e.selected)}
      >
        <TabStripTab title="Overview">
          <div>
            <p style={{ color: 'white', lineHeight: '1.6', fontSize: '1.1rem' }}>
              {event.description}
            </p>
          </div>
        </TabStripTab>
        
        {event.lineup && (
          <TabStripTab title="Lineup">
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Featured Artists</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {event.lineup.map((artist, index) => (
                  <div 
                    key={index}
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      color: 'white'
                    }}
                  >
                    {artist}
                  </div>
                ))}
              </div>
            </div>
          </TabStripTab>
        )}
        
        {event.venueInfo && (
          <TabStripTab title="Venue Info">
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Venue Details</h3>
              <div style={{ color: 'white', lineHeight: '1.6' }}>
                <p><strong>Address:</strong> {event.venueInfo.address}</p>
                <p><strong>Capacity:</strong> {event.venueInfo.capacity} people</p>
                <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Amenities:</h4>
                <ul>
                  {event.venueInfo.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabStripTab>
        )}
      </TabStrip>

      {/* Booking Dialog */}
      {bookingVisible && (
        <Dialog 
          title="Book Event Tickets"
          onClose={handleCancelBooking}
          width={500}
        >
          <div style={{ padding: '1rem' }}>
            {/* Custom Step Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              {steps.map((step, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1
                  }}
                >
                  <div 
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: index <= currentStep ? '#3498db' : '#ddd',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {index + 1}
                  </div>
                  <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>{step.label}</span>
                  {index < steps.length - 1 && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '15px',
                        left: '50%',
                        width: '100%',
                        height: '2px',
                        backgroundColor: index < currentStep ? '#3498db' : '#ddd',
                        zIndex: -1
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {currentStep === 0 && (
              <div>
                <h4>Select Number of Tickets</h4>
                <div style={{ marginBottom: '1rem' }}>
                  <label>Quantity:</label>
                  <NumericTextBox
                    value={quantity}
                    onChange={(e) => setQuantity(e.value || 1)}
                    min={1}
                    max={Math.min(10, event.availableTickets)}
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  />
                </div>
                <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{quantity} × ${event.price}</span>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <h4>Contact Information</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label>Full Name:</label>
                    <Input
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.value})}
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <Input
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.value})}
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                  </div>
                  <div>
                    <label>Phone:</label>
                    <Input
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.value})}
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h4>Confirm Your Booking</h4>
                <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                  <h5>{event.title}</h5>
                  <p>{formatDate(event.date)} at {event.time}</p>
                  <p>{event.venue}, {event.location}</p>
                  <hr />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{quantity} tickets</span>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
                <div>
                  <strong>Customer:</strong> {customerInfo.name}<br />
                  <strong>Email:</strong> {customerInfo.email}<br />
                  <strong>Phone:</strong> {customerInfo.phone}
                </div>
              </div>
            )}
          </div>

          <DialogActionsBar>
            {currentStep > 0 && (
              <Button onClick={handlePrevious}>Previous</Button>
            )}
            {currentStep < 2 ? (
              <Button 
                themeColor="primary" 
                onClick={handleNext}
                disabled={
                  (currentStep === 0 && quantity < 1) ||
                  (currentStep === 1 && (!customerInfo.name || !customerInfo.email))
                }
              >
                Next
              </Button>
            ) : (
              <Button themeColor="primary" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            )}
            <Button onClick={handleCancelBooking}>Cancel</Button>
          </DialogActionsBar>
        </Dialog>
      )}

      {/* Success Notification */}
      {showNotification && (
        <Notification
          type={{ style: 'success', icon: true }}
          closable={true}
          onClose={() => setShowNotification(false)}
        >
          <span>{notificationMessage}</span>
        </Notification>
      )}
    </div>
  );
};

export default EventDetails;
