package base.ball.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor //기본생성자
@AllArgsConstructor //필수생성자
public class Orders {
	 private int goodsId;
	 private int orderCount;
	 private int orderPrice;
	 private String payYn;
	 
}
