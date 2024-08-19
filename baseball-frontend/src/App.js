import './App.css';
import React, { useState, useEffect } from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Layout/Main';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginContext from './components/Login/LoginContext';
import Login from './components/Login/Login';
import { TicketBookingMain } from "./components/Ticket/TicketBookingMain";
import { TicketBookingSub } from "./components/Ticket/TicketBookingSub";
import { BookingStepTwo } from "./components/Ticket/BookingStepTwo";
import { BookingInfoView } from "./components/Ticket/BookingInfoView";
import { BookingInfoChange } from "./components/Ticket/BookingInfoChange";

function App() {
  const location = useLocation();

  const [loginMember, setLoginMember] = useState(null);

  const hideHeaderFooter = location.pathname.startsWith('/ticket/bookingSub');
  const addMainContent = ["/", "/login"].includes(location.pathname);

  useEffect(() => {
    const savedMember = localStorage.getItem("loginMember");
    if(savedMember) {
      setLoginMember(JSON.parse(savedMember));
    }
  }, []);

  useEffect(() => {
    if(loginMember) {
      localStorage.setItem("loginMember", JSON.stringify(loginMember));
    }
  }, [loginMember]);
  
  return (
    <LoginContext.Provider value={{ loginMember, setLoginMember }}>
      <div>
        {!hideHeaderFooter && <Header />}
        <div id="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ticket/bookingMain" element={<TicketBookingMain />} />
            <Route path="/ticket/bookingSub/:gameCode" element={<TicketBookingSub />} />
            <Route path="/ticket/bookingSub/:gameCode/bookingStepTwo" element={<BookingStepTwo />} />
            <Route path="/booking/infoView" element={<BookingInfoView />} />
            <Route path="/booking/infoChange" element={<BookingInfoChange />} />
          </Routes>
        </div>
        {!hideHeaderFooter && <Footer />}
      </div>
    </LoginContext.Provider>
  );
}

export default App;
