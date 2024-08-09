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
			                 String content) {
		File uploadDirFile = new File(uploadDir);
		if(!uploadDirFile.exists()) {
			System.out.println("폴더를 생성합니다.");
			if(!uploadDirFile.mkdirs()) {
				throw new RuntimeException("폴더 생성 실패하였습니다.");
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
					throw new RuntimeException("파일 업로드 실패", e);
				}
				return fileName;
			}).collect(Collectors.toList());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Board board = new Board();
		//board.setBoardMemberNo(memberNo);
		board.setBoardTitle(title);
		board.setBoardContents(content);
		board.setBoardImageUrl(String.join(",", fileNames));
		//board.setBoardHits(hits);
		//board.setBoardLikes(likes);
		//board.setBoardPrivate(private);
		//board.setBoardPassword(password);
		
		insertBoard(board);
	}
}
