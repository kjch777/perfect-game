import React from 'react';
import './foodmap.css'

const FoodMapKIA = () => {
  return (
    <div>
      <div className="playground-box">
        <div id="pg">
          <p><strong>광주 기아챔피언스필드</strong></p>
        </div>
        <img src="./images/KIAinside.png" alt="광주야구장내부" />
        <div className="food-container">
            <a href="./fooddetail/5">마성떡볶이</a><br />
            <a href="./fooddetail/6">스테이크펍</a><br />
        </div>
      </div>
    </div>
  );
};

export default FoodMapKIA;
