package base.ball.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import base.ball.dto.Board;

public interface BoardService {
	List<Board> findAllBoard();
	
	void insertBoard(Board board);
	
	void uploadImages(MultipartFile[] files, String title, String content, String writerId, String name, String password, String selectPrivate);
	
	void deleteBoard(int boardNo);
	
	void updateBoard(Board board);
}
