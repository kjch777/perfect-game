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

        locked: 1
      };

      await axios.post('/ticket/insertTicket', requestData);
      console.log("성공");
    } catch (error) {
      console.error("실패:", error);
    }
  };

  const handleOpen = () => {
    if (window.opener) {
      window.opener.location.href = '/';
      window.close();
    }
  }

  return (
    <div className="page-wrapper">
      <div className="box_section">
        <img 
          width="100%" 
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" 
          alt="Success" 
        />
        <h2>예매가 완료되었습니다.</h2>
        <Button onClick={handleOpen}>메인 페이지로 이동하기</Button>
      </div>
    </div>
  );
}