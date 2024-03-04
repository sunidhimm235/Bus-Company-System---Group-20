// import React from 'react'
// import Footer from './Components/Footer/Footer'
// import Home from './Components/Home/Home'
// import Info from './Components/Info/Info'
// import Navbar from './Components/NavBar/Navbar'
// import Search from './Components/Search/Search'
// import Subcribe from './Components/Subscribe/Subcribe'
// import './index.css'

// const App = () => {
//   return (
//     <div>
//       <Navbar/>
//       <Home/>
//       <Search/>
//       <Info/>
//       <Subcribe/>
//       <Footer/>
//     </div>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Info from './Components/Info/Info';
import Navbar from './Components/NavBar/Navbar';
import Search from './Components/Search/Search';
import Subscribe from './Components/Subscribe/Subcribe';
import SignInPage from './Components/SignInPage/SignInPage'; // Adjust path as necessary
import SignUpPage from './Components/SignUpPage/SignUpPage'; // Adjust path as necessary
import Admin from './Components/Admin/Admin';
import BusSchedule from './Components/BusSchedule/BusSchedule';
import TravelInformation from './Components/TravelInformation/TravelInformation';
import DestinationPage from './Components/DestinationsPage/DestinationPage';
import FAQPage from './Components/FAQPage/FAQPage';
import ContactPage from './Components/ContactPage/ContactPage';
import './index.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar/>
              <Home />
              <Search/>
              <Info/>
              <Subscribe/>
              <Footer/>
            </>
          } />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/bus-schedule" element={
              <>
                <Navbar />
                <BusSchedule />
              </>
          } />
          <Route path='/travel-information' element={<TravelInformation />} />
          <Route path='/destination' element={<DestinationPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/contact' element={<ContactPage />} />
          {/* Add more routes here if you have other pages */}
        </Routes>
        {/* Components that should be available in all routes can stay outside Routes */}
        {/* Example: <Navbar/> and potentially <Footer/> if you want it on every page */}
      </div>
    </Router>
  );
}

export default App;

