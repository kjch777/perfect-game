import React, { useState, useEffect } from "react";//useEffect여기에추가해봄

const CalendarForm = ({ calendarArrayMake, giveYearMonth }) => {

  let year;
  let month;

  //중요 - 여기서 연,월 이용하는 함수 App.js에 정의돼있음
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("year:"+year+", month:"+month);
    calendarArrayMake(year, month-1); //연결한 함수 사용(인자전달 아래form에서)
    //함수이름printCalendar에서 calendarArrayMake로 변경

    giveYearMonth(year, month);

    //제출후 빈칸으로 초기화
    //setYear();
    //setMonth();
  };

  /**입력 받는 폼 */
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>연도 : 
          <input
            id="inputYear"
            type="number"
            value={year}
            onChange={(e) => year = e.target.value}
            required
          />
          </label>
        </div>
        <div>
          <label>월 : 
          <input
            id="inputMonth"
            type="number"
            value={month}
            onChange={(e) => month = e.target.value}
            required
          />
          </label>
        </div>
        <button type="submit">해당달력계산</button>
      </form>
    </div>
  );

};
export default CalendarForm;
