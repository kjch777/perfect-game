import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../../css/GoodsMain.css';

const GoodsMain = ({ goods = [] }) => {
    // 현재 선택된 팀
    const [selectedTeam, setSelectedTeam] = useState('all');

    // 숫자를 3자리씩 끊어서 , 찍어주는 함수
    const formatCurrency = (amount) => {
        return amount.toLocaleString();
    };

    // 팀에 따라 굿즈를 필터링하는 함수
    const filterGoods = (goods) => {
        if (selectedTeam === 'all') {
            return goods;
        }
        return goods.filter(item => item.team === selectedTeam);
    };

    // 필터링된 굿즈 목록
    const filteredGoods = filterGoods(goods);

    return (
        <div className="container mt-5">
            <h3 className='goods-main-bset'><strong>BEST ITEM</strong></h3>
            <br/>

            {/* 팀 선택 버튼 */}
            <div className="btn-group mb-4" role="group" aria-label="Team selection">
                <button
                    type="button"
                    className={`teamCheck btn btn-secondary ${selectedTeam === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedTeam('all')}
                >
                    모든 팀
                </button>
                <button
                    type="button"
                    className={`teamCheck btn btn-secondary ${selectedTeam === 'samseong' ? 'active' : ''}`}
                    onClick={() => setSelectedTeam('samseong')}
                >
                    삼성
                </button>
                <button
                    type="button"
                    className={`teamCheck btn btn-secondary ${selectedTeam === 'hanwha' ? 'active' : ''}`}
                    onClick={() => setSelectedTeam('hanwha')}
                >
                    한화
                </button>
                {/* 필요한 만큼 버튼을 추가하세요 */}
            </div>

            <div className="row">
                {filteredGoods.map((item) => (
                    <div key={item.goodsId} className="col-md-4 mb-4">
                        <div className="goods-main-card">
                            <div className="goods-card-img-wrapper">
                                <img
                                    src={`/images/${item.goodsImage}`}
                                    className="goods-card-img-top"
                                    alt={item.goodsName}
                                />
                            </div>
                            <div className="goods-card-body d-flex flex-column">
                                <h5 className="goods-card-title">{item.goodsName}</h5>
                                <p className="goods-card-text">가격 : {formatCurrency(item.goodsPrice)}원</p>
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
