package base.ball.dto;

import java.util.Date;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
	
	private String gameCode; // 경기 번호
	private String gameDate; // 경기 일자
	private String gameTeamNameHome; // 주인팀 이름
	private String gameTeamNameAway; // 원정팀 이름

	private int bookingId; // 예매 id
	private String seatId; // 좌석 번호
	private String seatSection; // 좌석 구역
	private int seatPrice; // 좌석 가격
	private int selectSeatCount; // 선택한 좌석 수
	private String payMethod; // 결제 수단
	private Date payDate; // 결제 일자 // import java.util.Date; ← 시/분/초 까지 가능해서 선택했다.
	private int memberNo; // 회원 번호
}