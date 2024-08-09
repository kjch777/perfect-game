package base.ball.dto;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Chat {
	private int chat_no;
	private int member_no;
	private String member_id;
	private String message;
	private LocalTime send_time;
}