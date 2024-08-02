import React, { useState } from "react";
import "../css/Stadium.css";

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
  orange: lightenColor("#FFA500", 0.3),
  green: lightenColor("#008000", 0.3),
  blue: lightenColor("#0000FF", 0.3),
  purple: lightenColor("#800080", 0.3),
};

/*
    const sections = {
    orange: '#FFB733',
    green: '#4C8A4C',
    blue: '#3333FF',
    purple: '#A64AA2',
    }; 
*/

export const TicketBookingSub = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxSeats, setMaxSeats] = useState(0);

  const handleSeatClick = (id) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== id));
    } else {
      if (selectedSeats.length < maxSeats) {
        setSelectedSeats([...selectedSeats, id]);
      }
    }
  };

  const handleMaxSeatsChange = (event) => {
    setMaxSeats(parseInt(event.target.value, 10));
    setSelectedSeats([]);
  };

  return (
    <div className="stadium-container">
      <h1>야구장 예매</h1>
      <div className="controls">
        <label htmlFor="maxSeats">예매할 좌석 수: </label>
        <input type="number" id="maxSeats" value={maxSeats} onChange={handleMaxSeatsChange} min="1" />
      </div>
      <svg className="stadium-svg" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
        
    {/*
        {/* Big Green Ground/}
        <circle cx="600" cy="580" r="300" fill="#A2C948" />{" "}
        
        {/* Small White Circle/}
        <circle cx="600" cy="600" r="20" fill="white" />{" "}
        
        {/* Triangle/}
        <path d="M600,600 L600,900 L700,900 Z" fill="white" /> 
    */}
  
  <g transform="translate(0,-35) scale(1.5)">
    <path d="M400,200 L600,400 L400,600 L200,400 Z" fill="green" stroke="black" stroke-width="2" />
    <path d="M200,400 A200,200 0 0,1 600,400" fill="green" stroke="black" stroke-width="2" />

    <line x1="400" y1="400" x2="500" y2="500" stroke="black" stroke-width="2" />
    <line x1="300" y1="500" x2="400" y2="400" stroke="black" stroke-width="2" />
    
    <circle cx="400" cy="400" r="10" fill="white" stroke="black" stroke-width="2" />
    <circle cx="500" cy="500" r="10" fill="white" stroke="black" stroke-width="2" />
    <circle cx="400" cy="600" r="10" fill="white" stroke="black" stroke-width="2" />  
    <circle cx="300" cy="500" r="10" fill="white" stroke="black" stroke-width="2" />
  </g>
  
        {seats.map(({ id, section, angle, y }) => {
          const isSelected = selectedSeats.includes(id);
          const fillColor = isSelected ? "#FFD700" : sections[section];

          return (
            <g key={id} transform={`translate(600,600) rotate(${angle})`}>
              <rect className={`seat ${isSelected ? "selected" : ""}`} x="-20" y={y} width="40" height="40" rx="8" ry="8" fill={fillColor} onClick={() => handleSeatClick(id)} />
              <text className="seat-text" x="0" y={parseInt(y, 10) + 25} fontFamily="Arial" fontSize="15" fill="black" textAnchor="middle" onClick={() => handleSeatClick(id)}>
                {id}
              </text>
            </g>
          );
        })}

        <text x="600" y="130" fontFamily="Arial" fontSize="20" fill="black" textAnchor="middle">
          전광판
        </text>
        <text x="100" y="1000" fontFamily="Arial" fontSize="20" fill="black">
          3루 내야 출입구
        </text>
        <text x="1000" y="1000" fontFamily="Arial" fontSize="20" fill="black">
          1루 내야 출입구
        </text>
        <text x="600" y="1150" fontFamily="Arial" fontSize="20" fill="black" textAnchor="middle">
          1-1 Gate
        </text>
        <text x="100" y="200" fontFamily="Arial" fontSize="20" fill="black">
          외야 1루 출입구
        </text>
        <text x="1000" y="200" fontFamily="Arial" fontSize="20" fill="black">
          외야 3루 출입구
        </text>
      </svg>
    </div>
  );
};
