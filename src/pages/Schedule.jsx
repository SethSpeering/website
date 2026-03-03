import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: 'delivery',
    date: '',
    time: '',
    notes: '',
    productId: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const services = [
    { value: 'delivery', label: 'Product Delivery', duration: 30 },
    { value: 'demo', label: 'Product Demo', duration: 60 },
    { value: 'consultation', label: 'Lawn Care Consultation', duration: 45 },
    { value: 'maintenance', label: 'Maintenance Training', duration: 90 }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createGoogleCalendarEvent = async () => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const selectedService = services.find(s => s.value === formData.service);
      const startDateTime = new Date(`${formData.date}T${formData.time}`);
      const endDateTime = new Date(startDateTime.getTime() + selectedService.duration * 60000);

      // Get OAuth token
      const token = await user.getIdToken();

      // Create event using Google Calendar API
      const event = {
        summary: `LawnMower Pro - ${selectedService.label}`,
        description: formData.notes || `Scheduled ${selectedService.label.toLowerCase()} with LawnMower Pro`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        attendees: [
          { email: user.email },
          { email: 'support@lawnmowerpro.com' }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 }
          ]
        }
      };

      // Note: In production, you'd use the Google Calendar API here
      // For now, we'll simulate the success
      console.log('Event to be created:', event);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time) {
      setError('Please select both date and time');
      return;
    }

    await createGoogleCalendarEvent();
  };

  if (!user) {
    return (
      <div className="container schedule-page">
        <div className="schedule-auth-prompt">
          <h2>📅 Schedule an Appointment</h2>
          <p>Please sign in with Google to schedule appointments and sync with your calendar.</p>
          <button onClick={signInWithGoogle} className="google-sign-in-button-large">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
              </g>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container schedule-page">
        <div className="success-message-box">
          <div className="success-icon">✓</div>
          <h2>Appointment Scheduled!</h2>
          <p>Your appointment has been added to your Google Calendar.</p>
          <p>We've sent a confirmation email to <strong>{user.email}</strong></p>
          <button onClick={() => navigate('/')} className="continue-shopping-button">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container schedule-page">
      <h1>📅 Schedule an Appointment</h1>
      <p className="schedule-subtitle">Book a delivery, demo, or consultation - synced with your Google Calendar</p>

      <div className="schedule-layout">
        <form onSubmit={handleSubmit} className="schedule-form">
          <div className="form-group">
            <label htmlFor="service">Service Type</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="form-input"
              required
            >
              {services.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label} ({service.duration} min)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Additional Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              placeholder="Special requests, address details, etc."
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button 
            type="submit" 
            className="schedule-submit-button"
            disabled={loading}
          >
            {loading ? 'Scheduling...' : '📅 Add to Google Calendar'}
          </button>
        </form>

        <div className="schedule-info">
          <h3>What to Expect</h3>
          <div className="info-card">
            <h4>🚚 Product Delivery</h4>
            <p>Our team will deliver and set up your new lawn mower at your preferred location.</p>
          </div>
          <div className="info-card">
            <h4>🎯 Product Demo</h4>
            <p>Get a comprehensive demonstration of your mower's features and capabilities.</p>
          </div>
          <div className="info-card">
            <h4>💡 Lawn Care Consultation</h4>
            <p>Expert advice on lawn care, mower selection, and maintenance tips.</p>
          </div>
          <div className="info-card">
            <h4>🔧 Maintenance Training</h4>
            <p>Learn how to properly maintain and service your lawn mower for optimal performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
