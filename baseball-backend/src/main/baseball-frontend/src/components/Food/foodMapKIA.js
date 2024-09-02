import React from 'react';
import '../../css/foodmap.css';

const FoodMapKIA = () => {
  return (
    <div className="playground-box">
      <div id="pg">
        <p><strong>광주 기아챔피언스필드</strong></p>
      </div>
      <img className="foodmap-img" src="./images/KIAinside.png" alt="광주야구장내부" />
      <div className="food-container">
        <div className="food-item">
          <a href="./fooddetail/5">마성떡볶이</a>
        </div>
        <div className="food-item">
          <a href="./fooddetail/6">비스트로펍</a>
        </div>
      </div>
    </div>
  );
};

export default FoodMapKIA;