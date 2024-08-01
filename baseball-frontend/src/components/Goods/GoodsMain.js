import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

const GoodsMain = ({ goods = [] }) => {
    return (
        <div className="container mt-5">
        <h1>BEST ITEM</h1>
          <div className="row">
            {goods.map((item) => (
              <div key={item.goodsId} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={item.goodsImage}
                    className="card-img-top"
                    style={{ objectFit: 'cover' }}
                    alt={item.goodsName}
                  />
                  <div className="card-body">
                    <h5 className="card-title">상품이름 : {item.goodsName}</h5>
                    <p className="card-text">가격 : {item.goodsPrice}원</p>
                    <Link to={`/goods/${item.goodsId}`} className="btn btn-primary">구경하기</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default GoodsMain;

