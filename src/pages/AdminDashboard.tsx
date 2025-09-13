import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { Badge } from '@progress/kendo-react-indicators';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { events, categories, locations } from '../data/events';
import { bookings } from '../data/bookings';

type AdminView = 'overview' | 'events' | 'bookings' | 'analytics';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<AdminView>('overview');
  const [newEventDialogVisible, setNewEventDialogVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Calculate statistics
  const totalEvents = events.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const upcomingEvents = events.filter(e => e.date > new Date()).length;

  const renderOverview = () => (
    <div>
      <h2 style={{ color: 'white', marginBottom: '2rem' }}>Dashboard Overview</h2>
      
      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'rgba(52, 152, 219, 0.2)',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>{totalEvents}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Events</p>
        </div>
        
        <div style={{
          background: 'rgba(46, 204, 113, 0.2)',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>{totalBookings}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Bookings</p>
        </div>
        
        <div style={{
          background: 'rgba(155, 89, 182, 0.2)',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>${totalRevenue.toLocaleString()}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Revenue</p>
        </div>
        
        <div style={{
          background: 'rgba(231, 76, 60, 0.2)',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>{upcomingEvents}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Upcoming Events</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '1.5rem',
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Recent Bookings</h3>
        {bookings.slice(0, 5).map(booking => (
          <div key={booking.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white'
          }}>
            <div>
              <strong>{booking.eventTitle}</strong> - {booking.customerInfo.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>${booking.totalPrice}</span>
              <Badge themeColor={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'}>
                {booking.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'white', margin: 0 }}>Manage Events</h2>
        <Button 
          themeColor="primary" 
          onClick={() => setNewEventDialogVisible(true)}
        >
          Add New Event
        </Button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {events.map(event => {
          const soldTickets = event.totalTickets - event.availableTickets;
          const salesPercentage = (soldTickets / event.totalTickets) * 100;
          
          return (
            <div key={event.id} style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '1.5rem',
              borderRadius: '10px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem',
              alignItems: 'start'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, color: '#2c3e50' }}>{event.title}</h4>
                  <Badge themeColor="primary">{event.category}</Badge>
                  {event.featured && <Badge themeColor="warning">FEATURED</Badge>}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                  <div><strong>Date:</strong> {event.date.toLocaleDateString()}</div>
                  <div><strong>Time:</strong> {event.time}</div>
                  <div><strong>Venue:</strong> {event.venue}</div>
                  <div><strong>Price:</strong> ${event.price}</div>
                </div>

                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    <span>Tickets Sold: {soldTickets} / {event.totalTickets}</span>
                    <span>{salesPercentage.toFixed(1)}%</span>
                  </div>
                  <ProgressBar value={salesPercentage} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Button size="small" themeColor="primary" onClick={() => setSelectedEvent(event)}>
                  Edit
                </Button>
                <Button size="small" themeColor="secondary">
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div>
      <h2 style={{ color: 'white', marginBottom: '2rem' }}>Manage Bookings</h2>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {bookings.map(booking => (
          <div key={booking.id} style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '1.5rem',
            borderRadius: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, color: '#2c3e50' }}>Booking #{booking.id}</h4>
                  <Badge themeColor={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'}>
                    {booking.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                  <div><strong>Event:</strong> {booking.eventTitle}</div>
                  <div><strong>Customer:</strong> {booking.customerInfo.name}</div>
                  <div><strong>Email:</strong> {booking.customerInfo.email}</div>
                  <div><strong>Tickets:</strong> {booking.quantity}</div>
                  <div><strong>Total:</strong> ${booking.totalPrice}</div>
                  <div><strong>Booked:</strong> {booking.bookingDate.toLocaleDateString()}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Button size="small" themeColor="primary">
                  Contact Customer
                </Button>
                {booking.status === 'pending' && (
                  <Button size="small" themeColor="success">
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <h2 style={{ color: 'white', marginBottom: '2rem' }}>Analytics & Reports</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Category Performance */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1.5rem',
          borderRadius: '10px'
        }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Events by Category</h3>
          {categories.map(category => {
            const categoryEvents = events.filter(e => e.category === category);
            const percentage = (categoryEvents.length / events.length) * 100;
            
            return (
              <div key={category} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <span>{category}</span>
                  <span>{categoryEvents.length} events ({percentage.toFixed(1)}%)</span>
                </div>
                <ProgressBar value={percentage} />
              </div>
            );
          })}
        </div>

        {/* Revenue by Status */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1.5rem',
          borderRadius: '10px'
        }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>Booking Status</h3>
          {['confirmed', 'pending', 'cancelled'].map(status => {
            const statusBookings = bookings.filter(b => b.status === status);
            const revenue = statusBookings.reduce((sum, b) => sum + b.totalPrice, 0);
            const percentage = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
            
            return (
              <div key={status} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                  <span>${revenue.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                </div>
                <ProgressBar value={percentage} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h3 className="sidebar-title">Admin Panel</h3>
        <ul className="sidebar-menu">
          <li>
            <button 
              className={activeView === 'overview' ? 'active' : ''}
              onClick={() => setActiveView('overview')}
            >
              📊 Overview
            </button>
          </li>
          <li>
            <button 
              className={activeView === 'events' ? 'active' : ''}
              onClick={() => setActiveView('events')}
            >
              🎪 Manage Events
            </button>
          </li>
          <li>
            <button 
              className={activeView === 'bookings' ? 'active' : ''}
              onClick={() => setActiveView('bookings')}
            >
              📝 Manage Bookings
            </button>
          </li>
          <li>
            <button 
              className={activeView === 'analytics' ? 'active' : ''}
              onClick={() => setActiveView('analytics')}
            >
              📈 Analytics
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {activeView === 'overview' && renderOverview()}
        {activeView === 'events' && renderEvents()}
        {activeView === 'bookings' && renderBookings()}
        {activeView === 'analytics' && renderAnalytics()}
      </div>

      {/* New Event Dialog */}
      {newEventDialogVisible && (
        <Dialog 
          title="Add New Event"
          onClose={() => setNewEventDialogVisible(false)}
          width={600}
        >
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label>Event Title:</label>
                <Input style={{ width: '100%', marginTop: '0.5rem' }} />
              </div>
              <div>
                <label>Category:</label>
                <DropDownList data={categories} style={{ width: '100%', marginTop: '0.5rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Date:</label>
                  <DatePicker style={{ width: '100%', marginTop: '0.5rem' }} />
                </div>
                <div>
                  <label>Time:</label>
                  <Input style={{ width: '100%', marginTop: '0.5rem' }} />
                </div>
              </div>
              <div>
                <label>Location:</label>
                <DropDownList data={locations} style={{ width: '100%', marginTop: '0.5rem' }} />
              </div>
              <div>
                <label>Venue:</label>
                <Input style={{ width: '100%', marginTop: '0.5rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Price:</label>
                  <Input style={{ width: '100%', marginTop: '0.5rem' }} />
                </div>
                <div>
                  <label>Total Tickets:</label>
                  <Input style={{ width: '100%', marginTop: '0.5rem' }} />
                </div>
              </div>
            </div>
          </div>

          <DialogActionsBar>
            <Button themeColor="primary">Create Event</Button>
            <Button onClick={() => setNewEventDialogVisible(false)}>Cancel</Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default AdminDashboard;
