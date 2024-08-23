import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import '../../css/TicketPaymentSuccessPage.css';
import axios from "axios";

export function TicketPaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    handleInsert()
  }, [])

  const handleInsert = async () => {
    const ticketInfo = JSON.parse(localStorage.getItem("ticketInfo"));
    
    const requestData = {
      memberNo: ticketInfo.memberNo,
      gameCode: ticketInfo.gameCode,
      gameTitle: ticketInfo.gameTitle,
      payDate: new Date().toISOString().split('T')[0],
      
      seatIdOne: ticketInfo.seatIdOne,
      seatSectionOne: ticketInfo.seatSectionOne,
      seatPriceOne: ticketInfo.seatPriceOne,
      
      seatIdTwo: ticketInfo.seatIdTwo,
      seatSectionTwo: ticketInfo.seatSectionTwo,
      seatPriceTwo: ticketInfo.seatPriceTwo,
      
      seatIdThree: ticketInfo.seatIdThree,
      seatSectionThree: ticketInfo.seatSectionThree,
      seatPriceThree: ticketInfo.seatPriceThree,
      
      seatIdFour: ticketInfo.seatIdFour,
      seatSectionFour: ticketInfo.seatSectionFour,
      seatPriceFour: ticketInfo.seatPriceFour,
    }

    await axios.post('/ticket/insertTicket', requestData)
    .then((response) => {
      console.log("성공");
    })
    .catch((error) => {
      console.log("실패");
    })
  }

  return (
    <div class="page-wrapper">
      <div class="box_section">
        <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="Success" />
        <h2>결제를 완료했어요</h2>
        <Link to="/"><button className="goMain">메인으로</button></Link>
        <Link to="/"><button className="goOrderCheck">주문확인하러가기</button></Link>
      </div>
    </div>
  );
}
