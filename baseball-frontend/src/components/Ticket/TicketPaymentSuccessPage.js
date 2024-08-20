import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import '../../css/TicketPaymentSuccessPage.css';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      const response = await fetch("/confirm/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw { message: json.message, code: json.code };
      }

      return json;
    }

    confirm()
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => {
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      });
  }, [searchParams, navigate]);

  return (
    <div class="page-wrapper">
    <div class="box_section">
        <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="Success" />
        <h2>결제를 완료했어요</h2>
        <Link to="/goods"><button className="goMain">메인으로</button></Link>
        <Link to="/order-check"><button className="goOrderCheck">주문확인하러가기</button></Link>
    </div>
</div>
  );
}

export default PaymentSuccessPage;
