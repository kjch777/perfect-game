import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/TicketPaymentCheckoutPage.css';

const clientKey = "test_ck_P9BRQmyarYy5GkEgnon9rJ07KzLN";
const customerKey = generateRandomString();
const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);

export function TicketPaymentCheckoutPage() {

  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  // 주문 데이터 가져오기
  const location = useLocation();
  const {  } = location.state || {};
  
  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({
          customerKey,
        });
        setPayment(payment);
      } catch (error) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    }
    fetchPayment();
  }, []);

  const requestPayment = async () => {
    try {
      const orderId = generateRandomString();
      const response = await payment.requestPayment({
        method: selectedPaymentMethod,
        amount: {
          currency: "KRW",
          value: amount,
        },
        orderId,
        orderName,
        successUrl: window.location.origin + "/payment/success",
        failUrl: window.location.origin + "/payment/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
      });
      console.log(response);
    } catch (error) {
      console.error("결제 요청 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        <h1>결제 방법을 선택해주세요</h1>
        <div id="payment-method">
          {["CARD", "TRANSFER", "VIRTUAL_ACCOUNT", "MOBILE_PHONE"].map((method) => (
            <button
              key={method}
              id={method}
              className={`payType ${selectedPaymentMethod === method ? "active" : ""}`}
              onClick={() => selectPaymentMethod(method)}
            >
              {method}
            </button>
          ))}
        </div>
        <button className="payButton" onClick={requestPayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}