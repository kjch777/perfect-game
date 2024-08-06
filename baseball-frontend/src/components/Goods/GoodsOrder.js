import React from "react";
import { useLocation } from "react-router-dom";
import "../css/GoodsOrder.css";

const GoodsOrder = () => {
  const location = useLocation();
  const { item, quantity, totalPrice } = location.state || {};

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
              <p>총 금액: {totalPrice.toLocaleString()}원</p>
            </div>
          </div>
        </div>
      ) : (
        <p>주문 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default GoodsOrder;
