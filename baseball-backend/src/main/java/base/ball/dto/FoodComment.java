package base.ball.dto;

import java.sql.Timestamp;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FoodComment {
	private int commentId;
    private int foodId;
    private String memberId;
    private String commentText;
    private Timestamp createdAt;
}
