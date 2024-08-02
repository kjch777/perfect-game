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
        <Route path="/ticketBookingMain" element={<TicketBookingMain />} />
        <Route path="/ticketBookingSub" element={<TicketBookingSub />} />
        <Route path="/bookingInfoView" element={<BookingInfoView />} />
        <Route path="/bookingInfoChange" element={<BookingInfoChange />} />
      </Routes>
    </div>
  );
}

export default App;
