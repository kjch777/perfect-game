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
	private int memberNo; // 회원 번호
	private String matchCode; // 경기 code
	private int basePrice; // 기본 가격
	private String payMethod; // 결제 수단
	private Date payDate; // 결제 일자 // import java.util.Date; ← 시/분/초 까지 가능해서 선택했다.
	private String bankType; // 어느 은행인지
	private String cardType; // 어디 카드인지
	private String installment; // 일시불 또는 할부 개월 수
	private boolean isCanceled; // 취소 여부
	private String seatClass; // 좌석 구역(등급)
	private String seatNumber; // 좌석 번호(문자열)
	private int totalSeatCount; // 좌석의 총 갯수
	private int chooseSeatCount; // 선택한 좌석의 갯수
}
