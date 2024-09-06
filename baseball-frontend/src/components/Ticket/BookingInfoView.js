import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginContext from "../Login/LoginContext";
import '../../css/TicketBooking.css';
import { Button } from "react-bootstrap";

export const BookingInfoView = () => {
    const { loginMember } = useContext(LoginContext);
    const [ticketInfo, setTicketInfo] = useState([]);
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginMember === null) return;

        if (!loginMember) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate("/login");
            return;
        }

        // const memberNo = loginMember.memberNo;
        // console.log(memberNo);

        const ticketData = async () => {
            try {
                const response = await axios.get('/ticket/bookingInfoView', {
                    params: { memberNo: loginMember.memberNo }
                });
                setTicketInfo(response.data);
            } catch (error) {
                console.error("예매 정보 불러오기 실패", error);
            }
        };
        ticketData();
    }, [loginMember, navigate]);

    useEffect(() => {
        const calculateTotalAmount = () => {
            const amount = ticketInfo.reduce((total, ticket) => {
                // 여기부터
                const prices = [
                    ticket.seatPriceOne,
                    ticket.seatPriceTwo,
                    ticket.seatPriceThree,
                    ticket.seatPriceFour
                ];
                return total + prices.reduce((sum, price) => sum + (parseInt(price) || 0), 0);
            }, 0);
            // 여기까지 
            // let sum = 0;
            // 각 가격 정보를 가져와서 더합니다.
            // if (ticket.seatPriceOne) sum += parseInt(ticket.seatPriceOne) || 0;
            // if (ticket.seatPriceTwo) sum += parseInt(ticket.seatPriceTwo) || 0;
            // if (ticket.seatPriceThree) sum += parseInt(ticket.seatPriceThree) || 0;
            // if (ticket.seatPriceFour) sum += parseInt(ticket.seatPriceFour) || 0;
            // return total + sum;
            // }, 0);
            setTotalAmount(amount);
        };
        calculateTotalAmount();
    }, [ticketInfo]);

    const formatSeatInfo = (ticket) => {
        const seats = [
            { id: ticket.seatIdOne, section: ticket.seatSectionOne },
            { id: ticket.seatIdTwo, section: ticket.seatSectionTwo },
            { id: ticket.seatIdThree, section: ticket.seatSectionThree },
            { id: ticket.seatIdFour, section: ticket.seatSectionFour }
        ];

        return seats
            .filter(seat => seat.id)
            .map(seat => `${seat.id}번(${seat.section})`)
            .join(" / ");
    };

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'numeric', day: 'numeric' };
        const formatter = new Intl.DateTimeFormat('ko-KR', options);
        const [month, day] = formatter.format(date).split('.');
        return `${month}월 ${day}일`;
    }

    const isPastOrToday = (dateString) => {
        const today = new Date();
        const gameDate = new Date(dateString);
        return gameDate <= today;
    };

    const handleCheckboxChange = (bookingId) => {
        setSelectedBookings(prevSelected =>
            prevSelected.includes(bookingId)
                ? prevSelected.filter(id => id !== bookingId)
                : [...prevSelected, bookingId]
        );
    };

    const handleSelectAll = () => {
        const selectableBookings = ticketInfo
            .filter(ticket => !isPastOrToday(ticket.gameDate))
            .map(ticket => ticket.bookingId);
        setSelectedBookings(selectableBookings);
    };

    const handleDeselectAll = () => {
        setSelectedBookings([]);
    };

    const handleCancel = async () => {
        if (selectedBookings.length === 0) {
            alert("취소할 예매를 선택해 주세요.");
            return;
        }

        try {
            await axios.delete('/ticket/deleteTicket', {
                data: selectedBookings // DELETE 요청에 data를 담아 전송
            });
            alert("선택된 예매가 취소되었습니다.");
            setTicketInfo(ticketInfo.filter(ticket => !selectedBookings.includes(ticket.bookingId)));
            setSelectedBookings([]);
        } catch (error) {
            console.error("예매 취소 실패", error);
            alert("예매 취소에 실패했습니다.");
        }
    };

    const calculateTicketAmount = (ticket) => {
        const prices = [
            ticket.seatPriceOne,
            ticket.seatPriceTwo,
            ticket.seatPriceThree,
            ticket.seatPriceFour
        ];
        return prices.reduce((sum, price) => sum + (parseInt(price) || 0), 0);
    };

    // 개별 예매의 총 결제 금액 계산 함수
    // const calculateTicketAmount = (ticket) => {
    //     let sum = 0;
    //     if (ticket.seatPriceOne) sum += parseInt(ticket.seatPriceOne) || 0;
    //     if (ticket.seatPriceTwo) sum += parseInt(ticket.seatPriceTwo) || 0;
    //     if (ticket.seatPriceThree) sum += parseInt(ticket.seatPriceThree) || 0;
    //     if (ticket.seatPriceFour) sum += parseInt(ticket.seatPriceFour) || 0;
    //     return sum;
    // };

    return (
        <div className="infoView-container">
            {ticketInfo.length > 0 ? (
                <div className="infoView-div">
                    <div className="infoView-actions">
                        <Button onClick={handleSelectAll}>모두 선택</Button>
                        <Button onClick={handleDeselectAll} className="infoView-btnMl">모두 해제</Button>
                    </div>
                    <table className="infoView-table">
                        <thead>
                            <tr>
                                <th>선택</th>
                                <th>경기 이름</th>
                                <th>경기 일자</th>
                                <th>좌석 정보</th>
                                <th>예매 일자</th>
                                <th>총 결제 금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketInfo.map(ticket => (
                                <tr key={ticket.bookingId}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedBookings.includes(ticket.bookingId)}
                                            onChange={() => handleCheckboxChange(ticket.bookingId)}
                                            disabled={isPastOrToday(ticket.gameDate)}
                                        />
                                    </td>
                                    <td>{ticket.gameTitle}</td>
                                    <td>{dateFormat(ticket.gameDate)}</td>
                                    <td>{formatSeatInfo(ticket)}</td>
                                    <td>{dateFormat(ticket.payDate)}</td>
                                    <td>{calculateTicketAmount(ticket).toLocaleString()}원</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="infoView-action">
                        <Button onClick={handleCancel}>선택된 예매 취소하기</Button>
                    </div>
                </div>
            ) : (
                <h1>조회된 예매 내역이 없습니다.</h1>
            )}
        </div>
    );
};