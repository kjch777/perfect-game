package base.ball.dto;

import java.util.Date;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
	
	/** 경기 SELECT **/
	private String gameCode; // 경기 번호
	private String gameDate; // 경기 일자
	private String gameTeamNameHome; // 주인팀 이름
	private String gameTeamNameAway; // 원정팀 이름

	/** 예매 INSERT & SELECT & DELETE **/
	private int bookingId; // 예매 id
	private String gameTitle;
	private Date payDate; // 결제 일자 // import java.util.Date; ← 시/분/초 까지 가능해서 선택했다.
	private int memberNo; // 회원 번호
	
	private String seatIdOne; 
	private String seatSectionOne; 
	private String seatPriceOne;
	
	private String seatIdTwo; 
	private String seatSectionTwo; 
	private String seatPriceTwo;
	
	private String seatIdThree; 
	private String seatSectionThree; 
	private String seatPriceThree;
	
	private String seatIdFour; 
	private String seatSectionFour; 
	private String seatPriceFour;
}