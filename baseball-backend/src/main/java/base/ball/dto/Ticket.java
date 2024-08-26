package base.ball.dto;

import java.util.Date;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
	
	/** ��� SELECT **/
	private String gameCode; // ��� ��ȣ
	private String gameDate; // ��� ����
	private String gameTeamNameHome; // ������ �̸�
	private String gameTeamNameAway; // ������ �̸�

	/** ���� INSERT & SELECT & DELETE **/
	private int bookingId; // ���� id
	private String gameTitle;
	private Date payDate; // ���� ���� // import java.util.Date; �� ��/��/�� ���� �����ؼ� �����ߴ�.
	private int memberNo; // ȸ�� ��ȣ
	
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