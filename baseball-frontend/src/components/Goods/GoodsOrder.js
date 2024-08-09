import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../css/GoodsOrder.css";

const GoodsOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, quantity, totalPrice } = location.state || {};
  const [orderData, setOrderData] = useState(location.state || {});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderData.item) {
      navigate('/goods'); //주문한 상품이 없으면 goods 페이지로 이동
    }
  }, [orderData, navigate]);

  //결제 버튼을 눌렀을 때 실행할 함수 
  const handlePayment = async () => {
    try {
      setOrderData({
        ...orderData,
        amount: totalPrice,
        orderName: `${item.goodsName} x ${quantity}`,
        quantity,
      });
      navigate('/payment/checkout');
    } catch (err) {
      console.error('Payment initiation error:', err);
      setError(err.message || 'Payment initiation failed.');
    }
  };

  if (!orderData.item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
    <h2>주문 페이지</h2>

  <div className="order-member-info">
      {/* 주문자 정보 들어갈 자리 */}
  </div>

  {item ? (
      <div className="order-details">
        <div className="order-goods-details">
          <img
            src={`/${item.goodsImage}`}
            className="order-details-img"
            alt={item.goodsName}
          />
          <div className="order-details-info">
            <h4>{item.goodsName}</h4>
            <p>수량: {quantity}</p>
            <p>총 금액: {totalPrice.toLocaleString()}원</p> {/* .toLocaleString() = 숫자 3자리씩 , 찍어주기 */}
          </div>
        </div>
      </div>
    ) : (
      <p>주문 정보를 불러올 수 없습니다.</p>
    )}

    <div>
     <button onClick={handlePayment}>결제하기</button> 
    </div>
  </div>
);
};
export default GoodsOrder;

