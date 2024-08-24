package base.ball.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Game {
	private String gameCode;
	private String gameWinnerTeamName;
	private String gameDate;
	private String gameTeamNameHome;
	private String gameTeamNameAway;
	private String gamePlayerListHome;
	private String gamePlayerListAway;
	private int gamePlaygroundId;
}
