package base.ball.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Player {
	private int playerCode;
	private String playerTeamName;
	private String playerBackNo;
	private String playerName;
	private String playerPosition;
	private String playerBirthDate;
	private int playerHeightCm;
	private int playerWeightKg;	

}