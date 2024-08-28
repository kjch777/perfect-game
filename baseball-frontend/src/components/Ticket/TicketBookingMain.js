import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { TicketBookingBanner } from './TicketBookingBanner';
import LoginContext from '../Login/LoginContext';
import '../../css/TicketBooking.css';
import { Button, Card, Col, Row } from "react-bootstrap";

export const TicketBookingMain = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const { loginMember } = useContext(LoginContext);
    
    const teamNameMapping = {
        doosan: '두산 베어스',
        hanwha: '한화 이글스',
        kia: '기아 타이거즈',
        kiwoom: '키움 히어로즈',
        kt: 'KT 위즈',
        lg: 'LG 트윈스',
        lotte: '롯데 자이언츠',
        nc: 'NC 다이노스',
        samsung: '삼성 라이온즈',
        ssg: 'SSG 랜더스'
    }

    useEffect(() => {
        const gameData = async () => {
            const response = await axios.get('http://localhost:9090/ticket/bookingMain');
            setGames(response.data);
        };
        gameData();
    }, []);

    const handleBooking = (gameCode, gameDate, gameTeamNameHome, gameTeamNameAway) => {
        
        if(!loginMember) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate("/login");
            return;
        }

        const memberNo = loginMember.memberNo;

        // 작은 크기의 새 창을 열기 위해 window.open 사용
        const newWindow = window.open(`/ticket/bookingSub/${gameCode}?date=${gameDate}&home=${gameTeamNameHome}&away=${gameTeamNameAway}&memberNo=${memberNo}`, 'BookingWindow', 'width=1200, height=800');
    
        if (newWindow) {
            newWindow.onload = () => {
                
                // 새 창이 로드된 후에 실행될 코드
                newWindow.document.body.style.margin = '0';
                newWindow.document.body.style.padding = '0';
                newWindow.document.body.style.width = '1200px';
                newWindow.document.body.style.height = '800px';
                newWindow.document.body.style.overflow = 'hidden';
                newWindow.document.body.style.backgroundColor = 'white';
    
                // 창 크기 고정
                newWindow.addEventListener('resize', function() {
                    newWindow.resizeTo(1200, 800);
                });
            };
        } else {
            alert('팝업이 차단되어 있습니다. 팝업 허용 후 다시 시도해 주세요.');
        }
    }
    
    return (
        <div className="ticket-container">
            <TicketBookingBanner />
            <div className="ticketMain-Contents"> {/* 배너 하단 예매 전체 */}
                <div className="content-title">
                    <img src="/images/Ticket-Title.jpg" />
                </div>
                <div className="content-content">
                    <div className="ticketDiv-flex">
                        {games.map((game) => (
                            <div key={game.gameCode} className="ticketDiv-calc">
                                <Card className="ticket-card">
                                    <Card.Body>
                                        <div className="sort-images">
                                            <Col>
                                                <img src={`/images/logo-${game.gameTeamNameHome}.png`} />
                                            </Col>
                                            <Col>
                                                <img src="/images/Ticket-VS.png" />
                                            </Col>
                                            <Col>
                                                <img src={`/images/logo-${game.gameTeamNameAway}.png`} />
                                            </Col>
                                        </div>
                                        <Card.Text className="ticketCard-textDate">
                                            경기 일자: {game.gameDate}
                                        </Card.Text>
                                        <Card.Text className="ticketCard-textVS">
                                            {teamNameMapping[game.gameTeamNameHome]} VS {teamNameMapping[game.gameTeamNameAway]}
                                        </Card.Text>
                                        <Button onClick={() => handleBooking(game.gameCode, game.gameDate, game.gameTeamNameHome, game.gameTeamNameAway)} className="ticketCard-button">예매하기</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}