package base.ball.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SeatLockRequest {
    
	private String seatId;
    private String memberNo;
}