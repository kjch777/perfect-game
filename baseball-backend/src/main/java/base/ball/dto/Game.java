package base.ball.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Game {
	
	@Id
	private String gameCode;
	private String gameWinnerTeamName;
	private String gameDate;
	private String gameTeamNameHome;
	private String gameTeamNameAway;
	private String gamePlayerListHome;
	private String gamePlayerListAway;
	private int gamePlaygroundId;
}
