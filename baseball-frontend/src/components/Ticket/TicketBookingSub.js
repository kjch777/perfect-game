import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../css/TicketBooking.css";
import { Button, Card, Col, Row } from "react-bootstrap";
import axios from "axios";

const seats = [
  { id: "101", section: "orange", angle: 70, y: 400 },
  { id: "103", section: "orange", angle: 60, y: 400 },
  { id: "105", section: "orange", angle: 50, y: 400 },
  { id: "107", section: "orange", angle: 40, y: 400 },
  { id: "109", section: "orange", angle: 30, y: 400 },
  { id: "111", section: "orange", angle: 20, y: 400 },
  { id: "113", section: "orange", angle: 10, y: 400 },
  { id: "115", section: "orange", angle: 0, y: 400 },
  { id: "117", section: "orange", angle: -10, y: 400 },
  { id: "119", section: "orange", angle: -20, y: 400 },
  { id: "121", section: "orange", angle: -30, y: 400 },
  { id: "123", section: "orange", angle: -40, y: 400 },
  { id: "125", section: "orange", angle: -50, y: 400 },
  { id: "127", section: "orange", angle: -60, y: 400 },
  { id: "129", section: "orange", angle: -70, y: 400 },

  { id: "202", section: "green", angle: -75, y: -390 },
  { id: "204", section: "green", angle: -65, y: -390 },
  { id: "206", section: "green", angle: -55, y: -390 },
  { id: "208", section: "green", angle: -45, y: -390 },
  { id: "210", section: "green", angle: -35, y: -390 },
  { id: "212", section: "green", angle: -25, y: -390 },
  { id: "214", section: "green", angle: -15, y: -390 },
  { id: "216", section: "green", angle: -5, y: -390 },
  { id: "218", section: "green", angle: 5, y: -390 },
  { id: "220", section: "green", angle: 15, y: -390 },
  { id: "222", section: "green", angle: 25, y: -390 },
  { id: "224", section: "green", angle: 35, y: -390 },
  { id: "226", section: "green", angle: 45, y: -390 },
  { id: "228", section: "green", angle: 55, y: -390 },
  { id: "230", section: "green", angle: 65, y: -390 },
  { id: "232", section: "green", angle: 75, y: -390 },

  { id: "301", section: "blue", angle: 90, y: 350 },
  { id: "303", section: "blue", angle: 80, y: 350 },
  { id: "305", section: "blue", angle: 70, y: 350 },
  { id: "307", section: "blue", angle: 60, y: 350 },
  { id: "309", section: "blue", angle: 50, y: 350 },
  { id: "311", section: "blue", angle: 40, y: 350 },
  { id: "313", section: "blue", angle: 30, y: 350 },
  { id: "315", section: "blue", angle: 20, y: 350 },
  { id: "317", section: "blue", angle: 10, y: 350 },
  { id: "319", section: "blue", angle: 0, y: 350 },
  { id: "321", section: "blue", angle: -10, y: 350 },
  { id: "323", section: "blue", angle: -20, y: 350 },
  { id: "325", section: "blue", angle: -30, y: 350 },
  { id: "327", section: "blue", angle: -40, y: 350 },
  { id: "329", section: "blue", angle: -50, y: 350 },
  { id: "331", section: "blue", angle: -60, y: 350 },
  { id: "333", section: "blue", angle: -70, y: 350 },
  { id: "335", section: "blue", angle: -80, y: 350 },
  { id: "337", section: "blue", angle: -90, y: 350 },

  { id: "001", section: "purple", angle: 40, y: 300 },
  { id: "002", section: "purple", angle: 30, y: 300 },
  { id: "003", section: "purple", angle: 20, y: 300 },
  { id: "004", section: "purple", angle: 10, y: 300 },
  { id: "005", section: "purple", angle: 0, y: 300 },
  { id: "006", section: "purple", angle: -10, y: 300 },
  { id: "007", section: "purple", angle: -20, y: 300 },
  { id: "008", section: "purple", angle: -30, y: 300 },
  { id: "009", section: "purple", angle: -40, y: 300 },
];

const seatPrice = {
  orange: 1,
  green: 2,
  blue: 3,
  purple: 5
};

const sectionNameMapping = {
  orange: "스탠다드석",
  green: "외야 응원석",
  blue: "내야 응원석",
  purple: "프리미엄석"
}

const lightenColor = (color, percent) => {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;

  return `#${(
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

const sections = {
  orange: lightenColor("#FF7b00", 0.15), 
  green: lightenColor("#008000", 0.15),
  blue: lightenColor("#0000FF", 0.3),
  purple: lightenColor("#800080", 0.3),
  disabled: "#D3D3D3"
};

export const TicketBookingSub = () => {
  const navigate = useNavigate();
  const { gameCode } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeats, setMaxSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [countAlert, setCountAlert] = useState(null); // 여기엔 null 만 사용 가능(' ' 또는 " " 사용 시 페이지를 로드하자마자 공백 alert 가 출력되는 문제 발생)
  
  const [canClick, setCanClick] = useState({});

  const location = useLocation(); // 현재 URL의 위치 객체 가져오기
  const query = new URLSearchParams(location.search); // 쿼리 문자열에서 데이터 가져오기
  const home = query.get('home'); // 쿼리 파라미터에서 home 팀 이름 가져오기
  const away = query.get('away'); // 쿼리 파라미터에서 away 팀 이름 가져오기
  const date = query.get('date'); // 쿼리 파라미터에서 date 경기 일자 가져오기
  const memberNo = query.get('memberNo'); // 쿼리 파라미터에서 memberNo 회원 번호 가져오기

  const teamNameMapping = {
    doosan: '두산 베어스',
    hanwha: '한화 이글스',
    kia: '기아 타이거즈',
    kiwoom: '키움 히어로즈',
    kt: 'KT 위즈',
    lg: 'LG 트윈스',
    lotte: '롯데 자이언츠',
    nc: 'NC 다이노스',
    samsung: '삼성 라이온즈',
    ssg: 'SSG 랜더스'
  }

  const changeHomeName = teamNameMapping[home];
  const changeAwayName = teamNameMapping[away];

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'numeric', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    const [month, day] = formatter.format(date).split('.');
    return `${month}월 ${day}일`
  }

  useEffect(() => {
    const loadCanClick = async () => {
      try {
        const response = await axios.get(`/ticket/checkSeatStatus`, {
          params: { gameCode },
        });
        console.log(response.data);
        const seatStatus = response.data.reduce((acc, seat) => {
          // 필드 이름이 실제와 맞는지 확인
          if (seat.seatIdOne) {
            acc[seat.seatIdOne] = seat.locked;
          }
          if (seat.seatIdTwo) {
            acc[seat.seatIdTwo] = seat.locked;
          }
          if (seat.seatIdThree) {
            acc[seat.seatIdThree] = seat.locked;
          }
          if (seat.seatIdFour) {
            acc[seat.seatIdFour] = seat.locked;
          }
          return acc;
        }, {});        
        console.log(seatStatus);
        setCanClick(seatStatus);
      } catch (error) {
        console.error("좌석 상태 가져오기 실패", error);
      }
    };
    loadCanClick();
  }, [gameCode])
 
  /********** Seat **********/
  // 비동기적으로 좌석 클릭을 처리하는 함수
  const handleSeatClick = async (id, section) => {

    // if (canClick[id]) {
    //   setCountAlert('이미 예약이 완료된 좌석입니다.');
    //   return;
    // }

    try {
        // 선택된 좌석 목록에 이미 해당 좌석이 있는 경우
        if (selectedSeats.includes(id)) {
            // 사용자에게 좌석 선택 취소 여부를 확인
            const userConfirm = window.confirm('좌석 선택을 취소하시겠습니까?');
            
            // 사용자가 선택 취소를 확인한 경우
            if (userConfirm) {
                // 선택된 좌석 목록에서 해당 좌석을 제거
                setSelectedSeats(selectedSeats.filter((seat) => seat !== id));
                // 총 가격에서 해당 좌석의 가격을 차감
                setTotalPrice(totalPrice - seatPrice[section]);
            }
            // 기존의 처리를 종료하고 함수에서 반환
            return; 
        }

        // 선택된 좌석의 수가 최대 선택 가능 좌석 수를 초과한 경우
        if (selectedSeats.length >= maxSeats) {
            // 경고 메시지를 설정하여 사용자에게 알림
            setCountAlert('선택 가능한 좌석 수를 초과했습니다.');
            return;
        }

        // 서버에 좌석 상태를 확인하는 요청을 보냄
        const checkSeatResponse = await axios.get(`/ticket/checkSeat`, {
            params: { seatId: id },
        });

        // 해당 좌석이 이미 선택된 상태인 경우
        if (checkSeatResponse.data) {
            // 경고 메시지를 설정하여 사용자에게 알림
            setCountAlert('이미 선택된 좌석입니다.');
            return;
        }

        // 서버에 좌석 잠금을 요청하는 API 호출
        const lockSeatResponse = await axios.post(`/ticket/lockSeat`, {
            seatId: id,
            memberNo
        });

        // 좌석 잠금이 성공한 경우
        if (lockSeatResponse.status === 200) {
            // 선택된 좌석 목록에 해당 좌석을 추가
            setSelectedSeats([...selectedSeats, id]);
            // 총 가격에 해당 좌석의 가격을 더함
            setTotalPrice(totalPrice + seatPrice[section]);
        } else {
            // 좌석 잠금 실패 시 경고 메시지를 설정하여 사용자에게 알림
            setCountAlert('이미 선택된 좌석입니다.');
        }
    } catch (error) {
        // 오류 발생 시 경고 메시지를 설정하여 사용자에게 알림
        setCountAlert('좌석을 잠글 수 없습니다. 다시 시도해 주세요.');
    }
  };
  /********** Seat **********/
  


  /***** window.confirm TWICE ERROR *****/
  const [inputValue, setInputValue] = useState(maxSeats);
  const [isConfirming, setIsConfirming] = useState(false);

  // handleMaxSeatsChange 이벤트 핸들러
  const handleMaxSeatsChange = useCallback((event) => {
    const count = parseInt(event.target.value, 10);
    setInputValue(count);

    // 유효성 검사
    if (count < 1) {
        setCountAlert('선택 가능한 좌석의 최소 수량은 1개입니다.');
    } else if (count > 4) {
        setCountAlert('선택 가능한 좌석의 최대 수량은 4개입니다.');
    } else {
      // 현재 선택된 좌석 수가 입력된 값보다 많은 경우
      if (count < selectedSeats.length && !isConfirming) {
          setIsConfirming(true);
      } else {
          // 최대 좌석 수를 입력된 값으로 설정
          setMaxSeats(count);
          // 현재 선택된 모든 좌석들의 가격을 다시 계산하여 총 가격을 설정
          setTotalPrice(selectedSeats.reduce((acc, seatId) => {
              const seat = seats.find((s) => s.id === seatId);
              return acc + seatPrice[seat.section];
          }, 0));
        }
    }
  }, [selectedSeats, seats, seatPrice, totalPrice, maxSeats, setMaxSeats, setSelectedSeats, setTotalPrice, isConfirming]);

  // useEffect 를 사용하여 confirm 창 처리
  useEffect(() => {
    if (isConfirming) {
      const count = parseInt(inputValue, 10);
      const confirm = window.confirm('마지막에 선택된 좌석이 취소됩니다. 취소하시겠습니까?');
      
      if (confirm) {
        setMaxSeats(count);
        const seatsToRemove = selectedSeats.slice(count);
        setSelectedSeats(selectedSeats.slice(0, count));
        
        const priceToDeduct = seatsToRemove.reduce((acc, seatId) => {
          const seat = seats.find((s) => s.id === seatId);
          return acc - seatPrice[seat.section];
        }, totalPrice);

        setTotalPrice(priceToDeduct);

      } else {
        setInputValue(maxSeats); // 원래 최대 좌석 수로 되돌림
      }

      setIsConfirming(false);

    }
  }, [isConfirming, inputValue, selectedSeats, seats, seatPrice, totalPrice, maxSeats, setMaxSeats, setSelectedSeats, setTotalPrice]);
  /***** window.confirm ERROR *****/
  
  const noTyping = (event) => {
    event.preventDefault();
  };

  const noCursor = (event) => {
    event.target.blur(); 
  };

  const handleNextStep = () => {
    
    if(selectedSeats.length < maxSeats) {
    
      setCountAlert(`좌석을 ${maxSeats}개 선택하세요.`);
    } else {
    
        const selectedSeatInfo = selectedSeats.map((seatId) => {
          const seat = seats.find((s) => s.id === seatId);
          return {
            id: seat.id,
            section: sectionNameMapping[seat.section],
            price: seatPrice[seat.section]
          };
        });
  
        navigate(`/ticket/bookingSub/${gameCode}/bookingStepTwo`, { 
          state: { 
            selectedSeats: selectedSeatInfo, 
            totalPrice,
            count: selectedSeats.length,
            homeTeamName: changeHomeName,
            awayTeamName: changeAwayName,
            date,
            gameCode
          } 
        });
      }
  }

  /* alert 가 2번씩 호출되는 오류때문에 작성한 코드*/
  useEffect(() => {
    if (countAlert !== null) { // countAlert 가 null 이 아닐 때만 실행
      const timer = setTimeout(() => { // 1) setTimeout 을 설정하여
        alert(countAlert); // 3) alert 가 호출되도록 설정(countAlert 의 현재 값으로 표시)
        setCountAlert(null); // 4) 이후 countAlert 를 null 로 상태 변경하여, 추후 다시 상태가 변경될 때까지 표시되지 않도록 설정
      }, 1); // 1ms 의 지연 시간 후에

      return () => clearTimeout(timer); // 컴포넌트가 언마운트(컴포넌트가 DOM 에서 제거되는 것) 되거나, countAlert 의 상태가 변경되기 전에 타이머 정리
      // 메모리 누수나 불필요한 작업을 방지하기 위해 필요하다.
    }
  }, [countAlert]); // countAlert 의 상태가 변경될 때마다 실행

  const BookingStepOne = () => (

    <div>
      <Row className="ticketingSub-header">
        <Col className="teamName-section col-5">{changeHomeName} VS {changeAwayName}</Col>     
        <Col className="gameDate-section col-3">경기 일자: {dateFormat(date)}</Col>       
        <Col className="imgSmall-Change col-4">
          <img src={`/images/logo-${home}.png`} />
          <img src="/images/Ticket-VS.png" />
          <img src={`/images/logo-${away}.png`} />
        </Col>
      </Row>

      <div className="svgAndBtn">

        <svg className="stadium-svg" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
          
          <circle cx="600" cy="580" r="300" fill="#D2B48C" stroke="black" strokeWidth="3" />
    
          <g transform="translate(0,-35) scale(1.5)">
            <path d="M400,200 L600,400 L400,600 L200,400 Z" fill="green" stroke="black" strokeWidth="2" /> {/* 다이아몬드 모양*/}
            <path d="M200,400 A200,200 0 0,1 600,400" fill="green" stroke="black" strokeWidth="2" /> {/* 반원 모양*/}

            <line x1="400" y1="400" x2="500" y2="500" stroke="black" strokeWidth="2" />
            <line x1="300" y1="500" x2="400" y2="400" stroke="black" strokeWidth="2" />
            
            <path d="M400,600 L388,588 L388,576 L412,576 L412,588 Z" fill="white" stroke="black" strokeWidth="2" /> {/* Home */}
            <rect x="480" y="500" width="20" height="20" fill="white" stroke="black" strokeWidth="2" transform="rotate(45, 500, 500)" /> {/* 1루*/}
            <rect x="400" y="400" width="20" height="20" fill="white" stroke="black" strokeWidth="2" transform="rotate(45, 400, 400)" /> {/* 2루*/}
            <rect x="300" y="480" width="20" height="20" fill="white" stroke="black" strokeWidth="2" transform="rotate(45, 300, 500)" /> {/* 3루*/}

            <circle cx="400" cy="500" r="20" fill="#D2B48C" stroke="black" strokeWidth="2" />
          </g>
    
          {seats.map(({ id, section, angle, y }) => {
            const isSelected = selectedSeats.includes(id);
            // const fillColor = isSelected ? "#FFD700" : sections[section]; ▼ 코드 변경
            const fillColor = canClick[id] ? sections['disabled'] : (isSelected ? "#FFD700" : sections[section]);
            const cursorStyle = canClick[id] ? "not-allowed" : "pointer"; // 코드 추가

            return (
              <g key={id} transform={`translate(600,600) rotate(${angle})`}>
                <rect className={`seat ${isSelected ? "selected" : ""}`} x="-20" y={y} width="40" height="40" rx="8" ry="8" fill={fillColor} onClick={() => !canClick[id] && handleSeatClick(id, section)} style={{ cursor: cursorStyle }} />
                <text className="seat-text" x="0" y={parseInt(y, 10) + 25} fontFamily="Arial" fontSize="15" fill="black" textAnchor="middle" onClick={() => !canClick[id] && handleSeatClick(id, section)} style={{ cursor: cursorStyle }}>
                  {id}
                </text>
              </g>
            );
          })}

          <text x="600" y="130" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="black" textAnchor="middle">전광판</text>
    
          <text x="100" y="1000" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="black">
            <tspan>2-1 GATE</tspan>
            <tspan x="60" dy="1.2em">(내야 3루 출입구)</tspan>
          </text>
    
          <text x="1000" y="1000" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="black">
            <tspan>2-3 GATE</tspan>
            <tspan x="960" dy="1.2em">(내야 1루 출입구)</tspan>
          </text>
    
          <text x="600" y="1150" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="black" textAnchor="middle">1-1 GATE (중앙문)</text>
    
          <text x="100" y="200" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="black">
            <tspan>3-1 GATE</tspan>
            <tspan x="60" dy="1.2em">(외야 3루 출입구)</tspan>
          </text>
    
          <text x="1000" y="200" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="black">
            <tspan>3-3 GATE</tspan>
            <tspan x="960" dy="1.2em">(외야 1루 출입구)</tspan>
          </text>
    
        </svg>

        <div className="bookingInfo-rightView">
        
          <div className="controls">
            <label htmlFor="maxSeats">예매할 좌석 수: </label>
            <input type="number" id="maxSeats" className="noCursorChange" value={maxSeats} onChange={handleMaxSeatsChange} onKeyDown={noTyping} onFocus={noCursor} />
          </div>

          <Card className="booking-card">
            <Card.Header className="bookingInfo-cardHeader">예매 정보</Card.Header>
            <Card.Body className="booking-info">              
              {selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.id === seatId);
                if (seat) {
                  const infoColor = sections[seat.section];
                  const borderColor = infoColor;
                  
                  return (
                    <div key={seatId} className="bookingInfo-seatInfo" style={{ color: infoColor, border: `1px solid ${borderColor}`, filter: 'brightness(0.8)' }}>
                      <div>좌석 번호: {seat.id}번</div>
                      <div>좌석 구역: {sectionNameMapping[seat.section]}</div>
                      <div>좌석 가격: {seatPrice[seat.section]}원</div>
                    </div>
                  );
                }
                
                return null;
              })}
            </Card.Body>
            <Card.Footer className="total-price">총 결제 가격: {totalPrice}원</Card.Footer>
          </Card>

          <Button onClick={handleNextStep}>다음 단계</Button>
        </div>

      </div>    

    </div>
  )

  return (
      <div className="stadium-container">
        <BookingStepOne />
      </div>
  );
};