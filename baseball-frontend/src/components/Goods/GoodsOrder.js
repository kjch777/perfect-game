import React from "react";
import { useLocation } from "react-router-dom";
import "../css/GoodsOrder.css";

const GoodsOrder = () => {
  const location = useLocation(); //useLocation() = useNavigate를 이용해 전송된 데이터를 받을 수 있음
  const { item, quantity, totalPrice } = location.state || {};

  //결제하기 버튼을 눌렀을 때 토스페이api 로 연결할 함수
  const handlePay = async () => {
    
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
       <button onClick={handlePay}>주문하기</button> 
      </div>
    </div>
  );
};

export default GoodsOrder;

