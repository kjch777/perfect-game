package base.ball.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import base.ball.dto.Board;
import base.ball.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@PostMapping("/upload")
	public ResponseEntity<String> uploadImages(@RequestParam("files") MultipartFile[] files,
			                                   @RequestParam("title") String title,
			                                   @RequestParam("content") String content) {	
		boardService.uploadImages(files, title, content);
		return ResponseEntity.ok("게시글 작성 완료!");
	}
	
	@GetMapping("/lists")
	public ResponseEntity<List<Board>> findAllBoard() {
		List<Board> board = boardService.findAllBoard();
		return ResponseEntity.ok(board);
	}
	/*
	@GetMapping("/lists" + ${boardNo})
	*/
}
