package base.ball.dto;

import java.util.Date;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
	
	private String gameCode; // ��� ��ȣ
	private String gameDate; // ��� ����
	private String gameTeamNameHome; // ������ �̸�
	private String gameTeamNameAway; // ������ �̸�

	private int bookingId; // ���� id
	private String seatId; // �¼� ��ȣ
	private String seatSection; // �¼� ����
	private int seatPrice; // �¼� ����
	private int selectSeatCount; // ������ �¼� ��
	private String payMethod; // ���� ����
	private Date payDate; // ���� ���� // import java.util.Date; �� ��/��/�� ���� �����ؼ� �����ߴ�.
	private int memberNo; // ȸ�� ��ȣ
}