import React from "react";
import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TicketBookingMain } from "./components/Ticket/TicketBookingMain";
import { TicketBookingSub } from "./components/Ticket/TicketBookingSub";
import { BookingStepTwo } from "./components/Ticket/BookingStepTwo";
import { BookingInfoView } from "./components/Ticket/BookingInfoView";
import { BookingInfoChange } from "./components/Ticket/BookingInfoChange";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/ticket/bookingMain" element={<TicketBookingMain />} />
        <Route path="/ticket/bookingSub/:gameCode" element={<TicketBookingSub />} />
        <Route path="/ticket/bookingSub/:gameCode/bookingStepTwo" element={<BookingStepTwo />} />
        <Route path="/booking/infoView" element={<BookingInfoView />} />
        <Route path="/booking/infoChange" element={<BookingInfoChange />} />
      </Routes>
    </div>
  );
}

export default App;
