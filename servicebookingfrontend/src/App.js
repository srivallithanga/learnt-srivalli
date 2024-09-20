import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/reducers/userSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterConsumer from './components/RegisterConsumer';
import RegisterProvider from './components/RegisterProvider';
import Login from './components/Login';
import ProviderBookingsPage from './components/ProviderBookingsPage';
import VerificationForm from './components/VerificationForm';
import BookingDetailsPage from './components/BookingDetailsPage';
import ServiceDetailsPage from './components/ServiceDetailsPage';
import ConsumerDashboard from './components/ConsumerDashboard';
import ProviderList from './components/ProviderList';
import BookingComponent from './components/BookingComponent';
import Cart from './components/Cart';
import AdminPage from './components/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(setUser({ user, token }));
    }
  }, [dispatch]);
  return (
    <Router>
        <Routes>
          <Route path="/register-consumer" element={<RegisterConsumer />} />
          <Route path="/register-provider" element={<RegisterProvider />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes for Providers */}
          <Route 
            path="/providers-bookings" 
            element={
              <ProtectedRoute roles={['provider']}>
                <ProviderBookingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/verification/:bookingId" 
            element={
              <ProtectedRoute roles={['provider']}>
                <VerificationForm />
              </ProtectedRoute>
            } 
          />

          {/* Protected Route for Consumers */}
          <Route 
            path="/booking/:id" 
            element={
              <ProtectedRoute roles={['consumer']}>
                <BookingDetailsPage />
              </ProtectedRoute>
            } 
          /> 

          <Route path="/service/:id" element={<ServiceDetailsPage />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
          <Route path="/booking" element={<BookingComponent />} />
          <Route path="/providers/:serviceId" element={<ProviderList />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
  );
}

export default App;
