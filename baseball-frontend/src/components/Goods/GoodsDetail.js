import React from "react";
import { useParams } from "react-router-dom";

const GoodsDetail = ({ goods }) => {
  const { goodsId } = useParams(); // URL에서 goodsId를 추출합니다.

  console.log("goodsId:", goodsId);

  // goods 배열에서 현재 goodsId에 맞는 상품을 찾습니다.
  const item = goods.find((good) => good.goodsId === Number(goodsId)); // 비교 시 타입을 맞춤

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
          <p>가격: {item.goodsPrice}원</p>
          {/* 추가적인 상세 정보 */}
        </div>
      ) : (
        <p>상품을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default GoodsDetail;
