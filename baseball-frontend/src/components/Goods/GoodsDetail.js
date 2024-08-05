import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../css/GoodsDetail.css";

const GoodsDetail = ({ goods }) => {
  const { goodsId } = useParams(); // URL에서 goodsId를 추출합니다.
  const [quantity, setQuantity] = useState(1); // 초기 수량을 1로 설정

  console.log("goodsId:", goodsId);

  // goods 배열에서 현재 goodsId에 맞는 상품을 찾습니다.
  const item = goods.find((good) => good.goodsId === Number(goodsId)); // 비교 시 타입을 맞춤

  // goodsDetailImage를 배열로 파싱합니다.
  const detailImages =
    item && item.goodsDetailImage ? JSON.parse(item.goodsDetailImage) : [];

  // 수량 증가 함수
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // 수량 감소 함수
  const decreaseQuantity = () => {
    if (quantity > 1) {
      // 수량이 1보다 클 때만 감소
      setQuantity(quantity - 1);
    }
  };

  // 총 금액 계산
  const totalPrice = item ? item.goodsPrice * quantity : 0;

   // 숫자를 3자리씩 끊어서 , 찍어주는 함수
   const formatCurrency = (amount) => {
    return amount.toLocaleString();
  };

  return (
    <div className="container mt-5">
      {item ? (
        <div className="goods-detail">
          <div className="goods-detail-content">
            <img
              src={`/${item.goodsImage}`}
              className="goods-detail-img"
              alt={item.goodsName}
            />
            <div className="goods-detail-info">
              <h2 className="mt-3">{item.goodsName}</h2>
              <h5>가격: {formatCurrency(item.goodsPrice)}원</h5>
              <div className="quantity-selector">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
              <p className="totalPrice">총 금액: {formatCurrency(totalPrice)}원</p>
              <button className="buy-button">구매하기</button>
            </div>
          </div>
          <br />
          <hr />
          <h4>show detail</h4>
          <hr />
          <div className="goods-show-detail">
            {detailImages.length > 0 ? (
              detailImages.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`}
                  className="goods-show-detail-img"
                  alt={`Detail ${index + 1}`}
                />
              ))
            ) : (
              <p>상세 이미지가 없습니다.</p>
            )}
          </div>
        </div>
      ) : (
        <p>상품을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default GoodsDetail;
