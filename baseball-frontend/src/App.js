import React from "react";
import {Routes, Route} from "react-router-dom";
import { TicketBookingMain } from "./components/Ticket/TicketBookingMain";
import { TicketBookingSub } from "./components/Ticket/TicketBookingSub";
import { BookingInfoView } from "./components/Ticket/BookingInfoView";
import { BookingInfoChange } from "./components/Ticket/BookingInfoChange";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/ticket/bookingMain" element={<TicketBookingMain />} />
        <Route path="/ticket/bookingSub" element={<TicketBookingSub />} />
        <Route path="/booking/infoView" element={<BookingInfoView />} />
        <Route path="/booking/infoChange" element={<BookingInfoChange />} />
      </Routes>
    </div>
  );
}

export default App;
