import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginContext from "../Login/LoginContext";
import "../../css/TicketBooking.css";
import { Button, Col, Row } from "react-bootstrap";

export const BookingStepTwo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginMember } = useContext(LoginContext);
    const { selectedSeats, totalPrice, count, homeTeamName, awayTeamName, date } = location.state;

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'numeric', day: 'numeric' };
        const formatter = new Intl.DateTimeFormat('ko-KR', options);
        const [month, day] = formatter.format(date).split('.');
        return `${month}월 ${day}일`
      }

    const handlePrevStep = () => {
        const isConfirmed = window.confirm("선택하신 좌석이 취소됩니다. 이전 단계로 이동하시겠습니까?");
        if (isConfirmed) {
            navigate(-1);
        }
    }

    return (
        <div className="payPage-container">
            <div className="payPage-title">결제 페이지</div>
            
            <Row className="payPage-info">
                <Col className="payPage-infoOne">경기 정보</Col>
                <Col className="payPage-infoTwo">결제 정보</Col>
            </Row>
            
            <Row className="payPage-contentRow">
                <Col className="payPage-halfView">
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
                                <td>{dateFormat(date)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="seatInfo-table">
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
                                    <td>{seat.id}번</td>
                                    <td>{seat.section}</td>
                                    <td>{seat.price}원</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                    
                <Col className="payPage-theOther">    
                    <table className="theOther-payInfo">
                        <thead>
                            <tr>
                                <th>총 좌석 수</th>
                                <th>총 결제 금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{count}석</td>
                                <td>{totalPrice}원</td>
                            </tr>
                        </tbody>
                    </table>      

                    <table className="theOther-memberInfo">
                        <thead>
                            <tr>
                                <th>성함</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{loginMember.memberName}</td>
                                <td>{loginMember.memberPhone}</td>
                                <td>{loginMember.memberEmail}</td>
                            </tr>
                        </tbody>
                    </table>       
                    
                    <div className="payPage-buttons">
                        <Button onClick={handlePrevStep} className="prev-step">이전 단계로</Button>           
                        <Button className="ticket-toss">결제하기</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};