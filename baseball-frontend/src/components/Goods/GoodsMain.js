import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../css/GoodsMain.css';

const GoodsMain = ({ goods = [] }) => {
    return (
        <div className="container mt-5">
            <h1>BEST ITEM</h1>
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
                                <p className="card-text">가격 : {item.goodsPrice}원</p>
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
