import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link,useLocation } from "react-router-dom";
import '../../css/PaySuccess.css';

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

  const goToGoodsPage = () => {
    navigate("/goods");
  };

  return (
    <div class="page-wrapper">
    <div class="box_section">
        <img src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="Success" />
        <h2>결제를 완료했어요</h2>
        <Link to="/goods" className="goMain">메인으로</Link>
    </div>
</div>
  );
}

export default PaymentSuccessPage;