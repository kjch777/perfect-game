import React, {useState} from "react";
import axios from 'axios';
import { TicketBookingBanner } from './TicketBookingBanner'
import "../css/TicketBooking.css";

export const TicketBookingMain = () => {
    

    return (
        <div className="ticket-container">
            <div className="ticket-banner">
                <TicketBookingBanner />
            </div>
            <div className="ticketMain-mainSection">
                <ul>
                    <li>

                    </li>
                    <li>
                        
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </div>
        </div>
    )
}