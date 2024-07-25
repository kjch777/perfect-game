package base.ball.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member {
	private int member_id;
	private String member_pw;
	private String member_name;
	private String member_phone;
	private String member_email;
	private String member_address;
	private String member_address_detail;
	private String member_post;
	private int member_team_code;
	private String member_img;
}
