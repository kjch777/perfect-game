import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import '../../css/TicketPaymentSuccessPage.css';
import axios from "axios";

export function TicketPaymentSuccessPage() {
  
  useEffect(() => {
    const isInsert = sessionStorage.getItem("isInsert");
    if (!isInsert) {
      handleInsert();
      sessionStorage.setItem("isInsert", "true");
    }
  }, []);

  const handleInsert = async () => {
    try {
      const ticketInfo = JSON.parse(sessionStorage.getItem("ticketInfo"));
      if (!ticketInfo) {
        throw new Error("오류 발생");
      }
      
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
      };

      await axios.post('/ticket/insertTicket', requestData);
      console.log("성공");
    } catch (error) {
      console.error("실패:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="box_section">
        <img 
          width="100%" 
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" 
          alt="Success" 
        />
        <h2>결제가 완료되었습니다.</h2>
        <Link to="/">
          <Button className="goMain">메인으로</Button>
        </Link>
        <Link to="/">
          <Button className="goOrderCheck">주문확인하러가기</Button>
        </Link>
      </div>
    </div>
  );
}