import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/reducers/userSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterConsumer from './components/RegisterConsumer';
import RegisterProvider from './components/RegisterProvider';
import Login from './components/Login';
import ProviderBookingsPage from './components/provider/ProviderBookingsPage';
import VerificationForm from './components/provider/VerificationForm';
import BookingDetailsPage from './components/rating/BookingDetailsPage';
import ServiceDetailsPage from './components/rating/ServiceDetailsPage';
import ConsumerDashboard from './components/consumer/ConsumerDashboard';
import ProviderList from './components/consumer/ProviderList';
import BookingComponent from './components/consumer/BookingComponent';
import Cart from './components/consumer/Cart';
import ProfilePage from './components/consumer/ProfilePage';
import Bookings from './components/consumer/Bookings';
import AdminPage from './components/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import ProviderProfilePage from './components/provider/ProviderProfilePage';
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
        <Route path="/register" element={<Register />} />
          {/* <Route path="/register-consumer" element={<RegisterConsumer />} />
          <Route path="/register-provider" element={<RegisterPage />} /> */}
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
          <Route path="/" element={<ConsumerDashboard />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/provider/:id" element={<ProviderProfilePage />} />
          <Route path="/bookings" element={<Bookings />} />
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
