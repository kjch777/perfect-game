import React from 'react';
import './foodmain.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const FoodMain = () => {
  return (
    <div>
      <div className="container">
        <div className="row mt-6">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <img src="LG 트윈스.png" className="card-img-top" alt="LG 트윈스" style={{ margin: '20px 0' }} />
                <h5 className="card-title">서울 잠실야구장</h5>
                <a href="#" className="btn btn-primary">구경하기</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <img src="키움 히어로즈.png" className="card-img-top" alt="키움 히어로즈" style={{ margin: '20px 0' }} />
                <h5 className="card-title">서울 고척스카이돔</h5>
                <a href="#" className="btn btn-primary">구경하기</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-6">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <img src="SSG 랜더스.png" className="card-img-top" alt="SSG 랜더스" style={{ margin: '20px 0' }} />
                <h5 className="card-title">인천 SSG랜더스필드</h5>
                <a href="" className="btn btn-primary">구경하기</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <img src="KIA 타이거즈.png" className="card-img-top" alt="KIA 타이거즈" style={{ margin: '20px 0' }} />
                <h5 className="card-title">광주 기아챔피언스필드</h5>
                <a href="#" className="btn btn-primary">구경하기</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMain;
