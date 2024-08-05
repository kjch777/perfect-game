import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../css/GoodsMain.css';

const GoodsMain = ({ goods = [] }) => {
    // 숫자를 3자리씩 끊어서 , 찍어주는 함수
   const formatCurrency = (amount) => {
    return amount.toLocaleString();
  };

    return (
        <div className="container mt-5">
            <h1><strong>BEST ITEM</strong></h1>
            <br/>
            <div className="row">
                {goods.map((item) => (
                    <div key={item.goodsId} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-img-wrapper">
                                <img
                                    src={item.goodsImage}
                                    className="card-img-top"
                                    alt={item.goodsName}
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{item.goodsName}</h5>
                                <p className="card-text">가격 : {formatCurrency(item.goodsPrice)}원</p>
                                <Link to={`/goods/${item.goodsId}`} className="btn btn-primary mt-auto">구경하기</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoodsMain;
