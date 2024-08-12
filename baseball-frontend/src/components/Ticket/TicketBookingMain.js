import React, { useState, useEffect } from "react";
import axios from 'axios';
import { TicketBookingBanner } from './TicketBookingBanner';
import '../../css/TicketBooking.css';

export const TicketBookingMain = () => {
    const [games, setGames] = useState([]);
    
    useEffect(() => {
        const gameData = async () => {
            const response = await axios.get('http://localhost:9090/ticket/bookingMain');
            setGames(response.data);
        };
        gameData();
    }, []);

    return (
        <div className="ticket-container">
            <div className="ticket-banner">
                <TicketBookingBanner />
            </div>
            <div className="ticketMain-Contents"> {/* 배너 하단 예매 전체 */}
                <div className="content-title">
                    <img src="/images/Ticket-Title.jpg" />
                </div>
                <div className="content-content">
                    {games.map((game) => (
                        <div key={game.game_code}>
                            <p>{game.gameDate}</p>
                            <img src={`/images/Logo-${game.gameTeamNameHome.toLowerCase()}.png`} />
                            <p>{game.gameTeamNameHome}</p>
                            <img src="/images/Ticket-VS.png" />
                            <img src={`/images/Logo-${game.gameTeamNameAway.toLowerCase()}.png`} />
                            <p>{game.gameTeamNameAway}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}