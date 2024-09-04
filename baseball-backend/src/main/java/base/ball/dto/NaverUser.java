package base.ball.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NaverUser {
	private int memberNo;
	private String id;
	private String email;
	private String name;
	private String profileImage;
	private String mobile;
	
	private String newId;
	private String password;
}
