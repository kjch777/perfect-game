package base.ball.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Game;
import base.ball.dto.Player;
import base.ball.mapper.GameMapper;
import base.ball.repository.GameRepository;

@Service
public class GameServiceImpl implements GameService {
	
	@Autowired
	GameMapper gameMapper;
	
	@Autowired
	private GameRepository gameRepository;
	
	@Override
	public List<Game> gameAll(){
		return gameMapper.gameAll();
	}
	
	@Override
	public List<Game> gameInDay(String gameDate){
		return gameMapper.gameInDay(gameDate);
	}
	
	@Override
	public String homeLineUp(String gameCode) {
		return gameMapper.homeLineUp(gameCode);
	}
	
	@Override
	public String awayLineUp(String gameCode) {
		return gameMapper.awayLineUp(gameCode);
	}
	
	@Override
	public List<Player> homePlayerDetail(String playerBackNo, String playerTeamName){
		return gameMapper.homePlayerDetail(playerBackNo, playerTeamName);
	}
	
	@Override
	public List<Player> awayPlayerDetail(String playerBackNo, String playerTeamName) {
		return gameMapper.awayPlayerDetail(playerBackNo, playerTeamName);
	}
	
	@Override
	public void addGame(Game game) {
		gameMapper.addGame(game);
	}
	
	@Override
	public void deleteGame(String gameCode) {
		gameMapper.deleteGame(gameCode);
	}
	
	@Override
	public List<Player> allPlayer(String playerTeamName) {
		return gameMapper.allPlayer(playerTeamName);
	}
	
	@Override
	public Game getOneGame(String gameCode) {
		return gameMapper.getOneGame(gameCode);
	}
	
	public Game updateGame(String gameCode, Game gm) {
		Game game = gameRepository.findById(gameCode)
				.orElseThrow(()->new RuntimeException("수정할gameCode찾을수없음"));
		
		game.setGameCode(gm.getGameCode());
		game.setGameWinnerTeamName(gm.getGameWinnerTeamName());
		game.setGameDate(gm.getGameDate());
		game.setGameTeamNameHome(gm.getGameTeamNameHome());
		game.setGameTeamNameAway(gm.getGameTeamNameAway());
		game.setGamePlayerListHome(gm.getGamePlayerListHome());
		game.setGamePlayerListAway(gm.getGamePlayerListAway());
		game.setGamePlaygroundId(gm.getGamePlaygroundId());

		return gameRepository.save(game);
	}
}
