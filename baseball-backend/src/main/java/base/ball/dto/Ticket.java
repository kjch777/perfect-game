package base.ball.dto;

import java.util.Date;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

	private int bookingId; // ���� id
	private int memberNo; // ȸ�� ��ȣ
	private String matchCode; // ��� code
	private int basePrice; // �⺻ ����
	private String payMethod; // ���� ����
	private Date payDate; // ���� ���� // import java.util.Date; �� ��/��/�� ���� �����ؼ� �����ߴ�.
	private String bankType; // ��� ��������
	private String cardType; // ��� ī������
	private String installment; // �Ͻú� �Ǵ� �Һ� ���� ��
	private boolean isCanceled; // ��� ����
	private String seatClass; // �¼� ����(���)
	private String seatNumber; // �¼� ��ȣ(���ڿ�)
	private int totalSeatCount; // �¼��� �� ����
	private int chooseSeatCount; // ������ �¼��� ����
}
