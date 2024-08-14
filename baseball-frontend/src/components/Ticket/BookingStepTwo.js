// 임시

import React from "react";
import { useLocation } from "react-router-dom";
import "../../css/TicketBooking.css";
import { Button } from "react-bootstrap";

export const BookingStepTwo = () => {
    const location = useLocation();
    const { selectedSeats, totalPrice, count, homeTeamName, awayTeamName, date } = location.state;

    return (
        <div>
            <h1>선택한 좌석</h1>
            <span className="teamName-section">{homeTeamName} VS {awayTeamName}</span>     
            <span className="gameDate-section">{date}</span>       
            <ul>
                {selectedSeats.map(seat => (
                    <li key={seat.id}>
                        {seat.section} - {seat.id}번 - {seat.price}원
                    </li>
                ))}
            </ul>
            <h2>총 가격: {totalPrice}원</h2>
            <h2>총 좌석 수: {count}석</h2>
        </div>
    );
};
