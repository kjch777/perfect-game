import React from 'react';
import './foodmap.css'

const FoodMap = () => {
  return (
    <div>
      <div className="playground-box">
        <div id="pg">
          <p><strong>서울 잠실야구장</strong></p>
        </div>
        <img src="LGinside.png" alt="LG야구장내부" />
        <div className="food-container">
            <a href="./fooddetail/{foodId}">원샷치킨</a><br />
            <a href="#">잭슨피자</a><br />
        </div>
      </div>
    </div>
  );
};

export default FoodMap;
