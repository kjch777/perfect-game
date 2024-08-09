import React, {useState} from "react";
import axios from 'axios';
import { TicketBookingBanner } from './TicketBookingBanner';
import '../../css/TicketBooking.css';

export const TicketBookingMain = () => {
    

    return (
        <div className="ticket-container">
            <div className="ticket-banner">
                <TicketBookingBanner />
            </div>
            <div className="ticketMain-Contents"> {/* 배너 하단 예매 전체 */}
                <div className="ticketMain-contentOne"> {/* row 1 */}
                    <div className="contentOne-title">
                        <img src="/images/Ticket-Title.jpg" />
                    </div>
                    <div className="contentOne-content">
                        <ul>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Bears.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Dinos.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Eagles.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Giants.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Heroes.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Landers.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="ticketMain-contentTwo"> {/* row 2 */}
                    <div className="contentTwo-content">
                        <ul>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Lions.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Tigers.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Twins.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Wiz.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Heroes.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Landers.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="ticketMain-contentThree"> {/* row 3 */}
                    <div className="contentThree-content">
                        <ul>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Bears.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Dinos.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Eagles.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Giants.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                            <li>
                                <div className="sort-images">
                                    <img src="/images/Logo-Heroes.png" />
                                    <img src="/images/Ticket-VS.png" />
                                    <img src="/images/Logo-Landers.png" />
                                </div>
                                <div>
                                    <a>임시</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}