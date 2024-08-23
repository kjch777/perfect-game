import React from 'react';
import '../../css/foodmain.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FoodMain = () => {
  return (
    <div>
      <br />
      <div className="container">
        <div className="row mt-6">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <img src="./images/Logo-Twins.png" className="card-img-top" alt="LG 트윈스" style={{ margin: '20px 0' }} />
                <h5 className="card-title">서울 잠실야구장</h5>
                <a href="./foodmapLG" className="btn btn-primary">구경하기</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <img src="./images/Logo-Heroes.png" className="card-img-top" alt="키움 히어로즈" style={{ margin: '20px 0' }} />
                <h5 className="card-title">서울 고척스카이돔</h5>
                <a href="./foodMapKIWOOM" className="btn btn-primary">구경하기</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-6">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <img src="./images/Logo-Landers.png" className="card-img-top" alt="SSG 랜더스" style={{ margin: '20px 0' }} />
                <h5 className="card-title">인천 SSG랜더스필드</h5>
                <a href="./foodMapSSG" className="btn btn-primary">구경하기</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <img src="./images/Logo-Tigers.png" className="card-img-top" alt="KIA 타이거즈" style={{ margin: '20px 0' }} />
                <h5 className="card-title">광주 기아챔피언스필드</h5>
                <a href="./foodMapKIA" className="foodmain-btn btn-primary">구경하기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default FoodMain;
