import React, {useState} from "react";
import { useParams } from "react-router-dom";
import '../css/GoodsDetail.css';

const GoodsDetail = ({ goods }) => {
  const { goodsId } = useParams(); // URL에서 goodsId를 추출합니다.
  const [quantity, setQuantity] = useState(1); // 초기 수량을 1로 설정

  console.log("goodsId:", goodsId);

  // goods 배열에서 현재 goodsId에 맞는 상품을 찾습니다.
  const item = goods.find((good) => good.goodsId === Number(goodsId)); // 비교 시 타입을 맞춤

    // 수량 증가 함수
    const increaseQuantity = () => {
      setQuantity(quantity + 1);
    };
  
    // 수량 감소 함수
    const decreaseQuantity = () => {
      if (quantity > 1) { // 수량이 1보다 클 때만 감소
        setQuantity(quantity - 1);
      }
    };
  
    // 총 금액 계산
    const totalPrice = item ? item.goodsPrice * quantity : 0;

  return (
    <div className="container mt-5">
      {item ? (
        <div className="goods-detail">
          <img
            src={`/${item.goodsImage}`}
            className="GodosDetail-img"
            style={{ objectFit: "cover" }}
            alt={item.goodsName}
          />
          <h2 className="mt-3">{item.goodsName}</h2>
          <h5>가격: {item.goodsPrice}원</h5>
          <div className="quantity-selector">
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
          <p className="totalPrice">총 금액: {totalPrice}원</p>
          {/* 추가적인 상세 정보 */}
        </div>
      ) : (
        <p>상품을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default GoodsDetail;
