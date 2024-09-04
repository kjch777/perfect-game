package base.ball.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

import base.ball.dto.Board;
import base.ball.service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@Value("${file.upload-dir}")
	private String uploadDir;
	
	@PostMapping("/upload")
	public ResponseEntity<String> uploadImages(@RequestParam("files") MultipartFile[] files,
			                                   @RequestParam("title") String title,
			                                   @RequestParam("content") String content,
			                                   @RequestParam("writerId") String writerId,
			                                   @RequestParam("password") String password,
			                                   @RequestParam("selectPrivate") String selectPrivate,
			                                   @RequestParam("name") String name) {	
		boardService.uploadImages(files, title, content, writerId, password, selectPrivate, name);
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
	
	@DeleteMapping("/lists")
	public ResponseEntity<Void> deleteBoard(@RequestParam("boardNo") int boardNo) {
	    boardService.deleteBoard(boardNo);
	    return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/lists/{boardNo}")
	public ResponseEntity<String> updateBoard(@PathVariable("boardNo") int boardNo,
			                                  @RequestBody Board board) {
	    board.setBoardNo(boardNo);
	    boardService.updateBoard(board);
	    return ResponseEntity.ok("게시글 수정 완료!");
	}
	
	@GetMapping("/files/{filename}")
	public ResponseEntity<Resource> downloadFile(@PathVariable("filename") String filename) {
	    File file = new File(uploadDir, filename);
	    if (!file.exists()) {
	        return ResponseEntity.notFound().build();
	    }
	    Resource resource = new FileSystemResource(file);
	    return ResponseEntity.ok()
	            .contentType(MediaType.APPLICATION_OCTET_STREAM)
	            .body(resource);
	}
}
