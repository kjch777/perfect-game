import React from "react";
import { useLocation } from "react-router-dom";
import "../../css/TicketBooking.css";
import { Button, Col, Row } from "react-bootstrap";

export const BookingStepTwo = () => {
    const location = useLocation();
    const { selectedSeats, totalPrice, count, homeTeamName, awayTeamName, date } = location.state;

    return (
        <div>
            <div className="payPage-title">결제 페이지</div>
            <Row className="payPage-info">
                <Col className="payPage-infoOne">경기 정보</Col>
                <Col className="payPage-infoTwo">결제 정보</Col>
            </Row>
            <table className="gameInfo-table">
                <thead>
                    <tr>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>경기 일자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{homeTeamName}</td>
                        <td>{awayTeamName}</td>
                        <td>{date}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>좌석 번호</th>
                        <th>좌석 구역</th>
                        <th>좌석 가격</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedSeats.map(seat => (
                        <tr key={seat.id}>    
                            <td>{seat.id}</td>
                            <td>{seat.section}</td>
                            <td>{seat.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr />

            <div>총 좌석 수: {count}석</div>
            <div>총 결제 금액: {totalPrice}원</div>

            <Button>결제 하기</Button>
        </div>
    );
};
