import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import '../../css/TicketPaymentSuccessPage.css';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  const handleInsert = async () => {
    const ticketInfo = JSON.parse(localStorage.getItem("ticketInfo"));
    const requestData = {
      seatId: ticketInfo.
	    seatSection
	    seatPrice
	    selectSeatCount
	    payMethod
	    payDate
	    memberNo
    }
  }

  return (
    <div class="page-wrapper">
      <div class="box_section">
        <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="Success" />
        <h2>결제를 완료했어요</h2>
        <Button onClick={handleInsert}></Button>
        <Link to="/"><button className="goMain">메인으로</button></Link>
        <Link to="/"><button className="goOrderCheck">주문확인하러가기</button></Link>
      </div>
    </div>
  );
}
