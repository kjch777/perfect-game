import React, { useState, useEffect } from "react";
import "../../css/foodDetail.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import FoodComment from "./foodComment"; // FoodComment 컴포넌트 가져오기

function FoodDetail() {
  const { foodId } = useParams();
  const [food, setFood] = useState(null); // 초기 상태를 null로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        console.log(`Fetching data for foodId: ${foodId}`);
        const response = await axios.get(`http://localhost:9090/foods/${foodId}`);
        console.log("Response data:", response.data);
        setFood(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, [foodId]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>데이터 로드 중 오류가 발생했습니다: {error.message}</p>;
  }

  // food가 존재하지 않는 경우
  if (!food) {
    return <p>데이터를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="food">
      <div className="playground-container">
        <div id="playground">
          <p>
            <strong>{food.foodName}</strong>
          </p>
        </div>
        {food.foodsImage && (
          <img
            src={`/images/${food.foodsImage}`}
            alt={food.foodName}
            className="food-image"
            onError={() =>
              console.error("이미지를 로드하는 데 문제가 발생했습니다.")
            }
          />
        )}
        <div className="foodstore-container">
          {food.foodMenu &&
            Object.entries(JSON.parse(food.foodMenu)).map(([menu, price]) => (
              <div key={menu}>
                <p>
                  {menu}: {price}원
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="foodComment-container">
        <FoodComment foodId={foodId} />
      </div>
    </div>
  );
}

export default FoodDetail;
