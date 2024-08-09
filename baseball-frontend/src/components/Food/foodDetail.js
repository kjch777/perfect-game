import React, { useState, useEffect } from "react";
import "./foodDetail.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function FoodDetail() {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);  // 초기 상태를 null로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const FoodData = async () => {
      try {
        console.log(`Fetching data for foodId: ${foodId}`);
        const response = await axios.get(`http://localhost:9090/foods/${foodId}`);
        console.log('Response data:', response.data);
        setFood(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    FoodData();
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
    <div className="App">
      <div className="playground-box">
        <div id="pg">
          <p>
            <strong>{food.foodName}</strong>
          </p>
        </div>
        <div className="food-container">
          {food.foodMenu && Object.entries(JSON.parse(food.foodMenu)).map(([menu, price]) => (
            <div key={menu}>
              <p>
                {menu}: {price}원
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;
