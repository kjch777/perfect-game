package base.ball.service;

import java.io.File;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import base.ball.dto.Board;
import base.ball.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {
	@Autowired
	private BoardMapper boardMapper;
	
	@Value("${file.upload-dir}")
	private String uploadDir;
	
	@Override
	public List<Board> findAllBoard() {
		return boardMapper.findAllBoard();
	}
	
	@Override
	public void insertBoard(Board board) {
		boardMapper.insertBoard(board);
	}
	
	@Override
	public void uploadImages(MultipartFile[] files,
			                 String title,
			                 String content,
			                 String writerId,
			                 String password,
			                 String selectPrivate,
			                 String name) {
		File uploadDirFile = new File(uploadDir);
		if(!uploadDirFile.exists()) {
            System.out.println("Upload directory does not exist.");
			if(!uploadDirFile.mkdirs()) {
                throw new RuntimeException("Failed to create upload directory.");
			}
		}
		List<String> fileNames = null;
		try {
			fileNames = List.of(files).stream().map(file -> {
				String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
				File df = new File(uploadDir + File.separator + fileName);
				try {
					file.transferTo(df);
				} catch (Exception e) {
					throw new RuntimeException("Failed to save file", e);
				}
				return fileName;
			}).collect(Collectors.toList());
		} catch (Exception e) {
			e.printStackTrace();
	        throw new RuntimeException("Failed to process files", e);
		}
		
		Board board = new Board();
		board.setBoardMemberId(writerId);
		board.setBoardMemberName(name);
		board.setBoardTitle(title);
		board.setBoardContents(content);
		board.setBoardPassword(password);
		board.setBoardImageUrl(String.join(",", fileNames));
		board.setBoardPrivate(selectPrivate);
		//board.setBoardHits(hits);
		//board.setBoardLikes(likes);
		
		insertBoard(board);
	}
	
	@Override
	public void deleteBoard(int boardNo) {
		boardMapper.deleteBoard(boardNo);
	}
	
	@Override
	public void updateBoard(Board board) {
		boardMapper.updateBoard(board);
	}
}
