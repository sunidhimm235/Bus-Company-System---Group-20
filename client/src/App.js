import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Info from './Components/Info/Info';
import Search from './Components/Search/Search';
import Subscribe from './Components/Subscribe/Subcribe';
import SignInPage from './Components/SignInPage/SignInPage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import Admin from './Components/Admin/Admin';
import BusSchedule from './Components/BusSchedule/BusSchedule';
import TravelInformation from './Components/TravelInformation/TravelInformation';
import DestinationPage from './Components/DestinationsPage/DestinationPage';
import FAQPage from './Components/FAQPage/FAQPage';
import ContactPage from './Components/ContactPage/ContactPage';
import SeatSelection from './Components/BusSchedule/SeatSelection';
import UserInformation from './Components/UserInformation/UserInformation';
import TravelHistory from './Components/TravelHistory/TravelHistory';
import TransactionPage from './Components/TransactionPage/TransactionPage';
import ReservationSuccessPage from './Components/TransactionPage/ReservationSuccessPage';
import ReservationsPage from './Components/ReservationsPage/ReservationsPage';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <Search />
                <Info />
                <Subscribe />
                <Footer />
              </>
            } />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/bus-schedule" element={<BusSchedule />} />
            <Route path="/seat-selection" element={<SeatSelection />} />
            <Route path="/user-information" element={<UserInformation />} />
            <Route path="/travel-information" element={<TravelInformation />} />
            <Route path="/destination" element={<DestinationPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/travel-history" element={<TravelHistory />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/reservation-success" element={<ReservationSuccessPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            {}
          </Routes>
        </div>
        {}
      </Router>
    </AuthProvider>
  );
};

export default App;