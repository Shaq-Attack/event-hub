import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Notification } from '@progress/kendo-react-notification';
import { Badge } from '@progress/kendo-react-indicators';
import { bookings } from '../data/bookings';

const MyBookings: React.FC = () => {
  const [bookingData, setBookingData] = useState(bookings);
  const [cancelDialogVisible, setCancelDialogVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleCancelBooking = (booking: any) => {
    setSelectedBooking(booking);
    setCancelDialogVisible(true);
  };

  const confirmCancelBooking = () => {
    if (selectedBooking) {
      const updatedBookings = bookingData.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      );
      setBookingData(updatedBookings);
      setNotificationMessage(`Booking for ${selectedBooking.eventTitle} has been cancelled.`);
      setShowNotification(true);
    }
    setCancelDialogVisible(false);
    setSelectedBooking(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <div className="bookings-page">
      <h1 className="page-title">My Bookings</h1>
      
      <div style={{ marginBottom: '2rem', textAlign: 'center', color: 'white' }}>
        <p>Manage your event bookings and tickets</p>
      </div>

      <div className="bookings-grid">
        {bookingData.map((booking) => {
          const isPastEvent = new Date(booking.eventDate) < new Date();
          const canCancel = booking.status === 'confirmed' && !isPastEvent;

          return (
            <div 
              key={booking.id} 
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '15px',
                padding: '1.5rem',
                marginBottom: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#2c3e50' }}>{booking.eventTitle}</h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                    <div><strong>Booking ID:</strong> {booking.id}</div>
                    <div><strong>Event Date:</strong> {formatDate(booking.eventDate)}</div>
                    <div><strong>Time:</strong> {booking.eventTime}</div>
                    <div><strong>Venue:</strong> {booking.venue}</div>
                    <div><strong>Location:</strong> {booking.location}</div>
                    <div><strong>Tickets:</strong> {booking.quantity}</div>
                    <div><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</div>
                    <div><strong>Booked On:</strong> {formatDate(booking.bookingDate)}</div>
                  </div>

                  <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f8f9fa', borderRadius: '4px', fontSize: '0.8rem' }}>
                    <strong>Customer:</strong> {booking.customerInfo.name} | 
                    <strong> Email:</strong> {booking.customerInfo.email} | 
                    <strong> Phone:</strong> {booking.customerInfo.phone}
                  </div>

                  {booking.ticketNumbers.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#666' }}>
                      <strong>Ticket Numbers:</strong> {booking.ticketNumbers.join(', ')}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right' }}>
                  {canCancel ? (
                    <Button
                      themeColor="error"
                      onClick={() => handleCancelBooking(booking)}
                    >
                      Cancel Booking
                    </Button>
                  ) : (
                    <div style={{ color: '#999', fontSize: '0.8rem' }}>
                      {isPastEvent ? 'Past Event' : 'Cannot Cancel'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {bookingData.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: 'white',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          marginTop: '2rem'
        }}>
          <h3>No bookings found</h3>
          <p>You haven't booked any events yet.</p>
          <Button
            themeColor="primary"
            onClick={() => window.location.href = '/browse'}
            style={{ marginTop: '1rem' }}
          >
            Browse Events
          </Button>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelDialogVisible && selectedBooking && (
        <Dialog 
          title="Cancel Booking"
          onClose={() => setCancelDialogVisible(false)}
          width={400}
        >
          <div style={{ padding: '1rem' }}>
            <p>Are you sure you want to cancel your booking for:</p>
            <div style={{ 
              background: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px', 
              margin: '1rem 0' 
            }}>
              <strong>{selectedBooking.eventTitle}</strong><br />
              {formatDate(selectedBooking.eventDate)} at {selectedBooking.eventTime}<br />
              {selectedBooking.venue}, {selectedBooking.location}<br />
              Tickets: {selectedBooking.quantity}<br />
              Total: ${selectedBooking.totalPrice.toFixed(2)}
            </div>
            <p style={{ color: '#d32f2f', fontSize: '0.9rem' }}>
              This action cannot be undone. Refund policies may apply.
            </p>
          </div>

          <DialogActionsBar>
            <Button 
              themeColor="error" 
              onClick={confirmCancelBooking}
            >
              Yes, Cancel Booking
            </Button>
            <Button onClick={() => setCancelDialogVisible(false)}>
              Keep Booking
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}

      {/* Notification */}
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

export default MyBookings;
