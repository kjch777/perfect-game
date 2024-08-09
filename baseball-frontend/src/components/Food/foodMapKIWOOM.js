import React from 'react';
import './foodmap.css'

const FoodMapKIWOOM = () => {
  return (
    <div>
      <div className="playground-box">
        <div id="pg">
          <p><strong>서울 고척스카이돔</strong></p>
        </div>
        <img src="./images/KIWOOMinside.jpg" alt="고척야구장내부" />
        <div className="food-container">
            <a href="./fooddetail/3">호시타코야끼</a><br />
            <a href="./fooddetail/4">백남옥 손만두</a><br />
        </div>
      </div>
    </div>
  );
};

export default FoodMapKIWOOM;
