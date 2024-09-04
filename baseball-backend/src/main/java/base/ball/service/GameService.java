package base.ball.service;

import java.util.List;

import base.ball.dto.Game;
import base.ball.dto.Player;

public interface GameService {
	List<Game> gameAll();

	List<Game> gameInDay(String gameDate);
	
	String homeLineUp(String gameCode);
	
	String awayLineUp(String gameCode);
	
	List<Player> homePlayerDetail(String playerBackNo, String playerTeamName);
	List<Player> awayPlayerDetail(String playerBackNo, String playerTeamName);

	void addGame(Game game);

	void deleteGame(String gameCode);

	List<Player> allPlayer(String playerTeamName);

	Game getOneGame(String gameCode);

	Game updateGame(String gameCode, Game game);

}
