package base.ball.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Board {
	private int boardNo;
	private int boardMemberNo;
	private String boardTitle;
	private String boardContents;
	private String boardImageUrl;
	private int boardHits;
	private int boardLikes;
	private String boardPrivate;
	private String boardPassword;
	private String createdAt;
}