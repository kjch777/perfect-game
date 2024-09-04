package base.ball.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import base.ball.dto.Game;
import base.ball.dto.Player;

@Mapper
public interface GameMapper {
	List<Game> gameAll();

	List<Game> gameInDay(String gameDate);
	
	String homeLineUp(String gameCode);
	
	String awayLineUp(String gameCode);
	
	//@Param없으면 오류
	List<Player> homePlayerDetail(@Param("playerBackNo") String playerBackNo, @Param("playerTeamName") String playerTeamName);
	List<Player> awayPlayerDetail(@Param("playerBackNo") String playerBackNo, @Param("playerTeamName") String playerTeamName);

	void addGame(Game game);

	void deleteGame(@Param("gameCode") String gameCode);

	List<Player> allPlayer(@Param("playerTeamName") String playerTeamName);

	Game getOneGame(@Param("gameCode") String gameCode);

	Game updateGame(@Param("gameCode") String gameCode, @RequestBody Game game);
	
	

}
