package base.ball.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Game;
import base.ball.dto.Player;
import base.ball.service.GameService;

@RestController
@RequestMapping("/game")
public class GameController {
	
	@Autowired
	private GameService gameService;
	
	@GetMapping//위 RequestMapping으로 인해 연결주소: "/game"
	public List<Game> gameAll(){
		return gameService.gameAll();
	}
	
	@GetMapping("/{gameDate}")
	public List<Game> gameInDay(@PathVariable("gameDate") String gameDate){
		return gameService.gameInDay(gameDate);
	}
	
	@GetMapping("/home/{gameCode}")
	public String homeLineUp(@PathVariable("gameCode") String gameCode) {
		return gameService.homeLineUp(gameCode);
	}
	
	@GetMapping("/away/{gameCode}")
	public String awayLineUp(@PathVariable("gameCode") String gameCode) {
		return gameService.awayLineUp(gameCode);
	}
	
	@GetMapping("/player/home/{playerTeamName}/{playerBackNo}")
	public List<Player> homePlayerDetail(
			@PathVariable("playerBackNo") String playerBackNo, 
			@PathVariable("playerTeamName") String playerTeamName){
		return gameService.homePlayerDetail(playerBackNo, playerTeamName);
	}
	
	@GetMapping("/player/away/{playerTeamName}/{playerBackNo}")
	public List<Player> awayPlayerDetail(
			@PathVariable("playerBackNo") String playerBackNo, 
			@PathVariable("playerTeamName") String playerTeamName){
		return gameService.awayPlayerDetail(playerBackNo, playerTeamName);
	}
	
	@GetMapping("/player/{playerTeamName}")
	public List<Player> allPlayer(@PathVariable("playerTeamName") String playerTeamName){
		return gameService.allPlayer(playerTeamName);
	}
	
	@PostMapping("/add")
	public void addGame(@RequestBody Game game) {
		gameService.addGame(game);
	}
	
	@DeleteMapping("/{gameCode}")
	public void deleteGame(@PathVariable("gameCode") String gameCode) {
		gameService.deleteGame(gameCode);
	}
	
	@GetMapping("/one/{gameCode}")
	public Game getOneGame(@PathVariable("gameCode") String gameCode) {
		return gameService.getOneGame(gameCode);
	}
	
	@PutMapping("/edit/{gameCode}")
	public Game updateGame(
			@PathVariable("gameCode") String gameCode,
			@RequestBody Game game) {
		System.out.println("gameCode:"+ gameCode);
		System.out.println("game:"+game);
		return gameService.updateGame(gameCode, game);
		
		//return ResponseEntity.ok(game);
	}
	

}
