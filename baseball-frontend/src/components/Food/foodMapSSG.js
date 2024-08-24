import React from "react";
import "../../css/foodmap.css";

const FoodMapSSG = () => {
  return (
    <div>
      <div className="playground-box">
        <div id="pg">
          <p>
            <strong>인천 SSG랜더스필드</strong>
          </p>
        </div>
        <img className="foodmap-img" src="./images/SSGinside.png" alt="SSG야구장내부" />
        <div className="food-container">
          <div className="food-item">
            <a href="./fooddetail/7">씬난다</a>
          </div>
          <div className="food-item">
            <a href="./fooddetail/8">순살싸다리치킨</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMapSSG;
