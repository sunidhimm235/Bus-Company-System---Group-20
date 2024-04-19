import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Info from './Components/Info/Info';
import Search from './Components/Search/Search';
import SignInPage from './Components/SignInPage/SignInPage';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import Admin from './Components/Admin/Admin';
import BusSchedule from './Components/BusSchedule/BusSchedule';
import DestinationPage from './Components/DestinationsPage/DestinationPage';
import FAQPage from './Components/FAQPage/FAQPage';
import ContactPage from './Components/ContactPage/ContactPage';
import SeatSelection from './Components/BusSchedule/SeatSelection';
import UserInformation from './Components/UserInformation/UserInformation';
import TravelHistory from './Components/TravelHistory/TravelHistory';
import TransactionPage from './Components/TransactionPage/TransactionPage';
import ReservationSuccessPage from './Components/TransactionPage/ReservationSuccessPage';
import ReservationsPage from './Components/ReservationsPage/ReservationsPage';
import Employee from './Components/Employee/Employee';
import RightsAndRules from './Components/RandR/RightsAndRules';
import BaggageRules from './Components/BaggageRules/BaggageRules';
import Features from './Components/BusFeatures/BusFeatures';
import HowToPage from './Components/HowTo/HowTo';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Search />
                <Info />
                <Footer />
              </>
            } />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/bus-schedule" element={
              <>
                <Navbar />
                <BusSchedule />
              </>
            } />
            <Route path="/seat-selection" element={
              <>
                <Navbar />
                <SeatSelection />
              </>
            } />
            <Route path="/user-information" element={<UserInformation />} />
            <Route path="/howto" element={
              <>
                <Navbar />
                <HowToPage />
                <Footer />
              </>
            } />
            <Route path="/destination" element={
              <>
                <Navbar />
                <DestinationPage />
                <Footer />
              </>
            } />
            <Route path="/faq" element={
              <>
                <Navbar />
                <FAQPage />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <ContactPage />
                <Footer />
              </>
            } />
            <Route path="/baggage" element={
              <>
                <Navbar />
                <BaggageRules />
                <Footer />
              </>
            } />
            <Route path="/features" element={
              <>
                <Navbar />
                <Features />
                <Footer />
              </>
            } />
            <Route path="/rights&rules" element={
              <>
                <Navbar />
                <RightsAndRules />
                <Footer />
              </>
            } />
            <Route path="/reservations" element={
              <>
                <Navbar />
                <ReservationsPage  />
                <Footer />
              </>
            } />
            <Route path="/travel-history" element={<TravelHistory />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/reservation-success" element={<ReservationSuccessPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;