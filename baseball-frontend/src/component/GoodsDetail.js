import React from 'react';


const GoodsDetail = ({goods}) => {
    
    return (
        <div className="goods-detail">
            <p>상품이름: {goods.goods_name}</p>
            <p>가격: {goods.goods_price}원</p>
        </div>
    );
};

export default GoodsDetail;
