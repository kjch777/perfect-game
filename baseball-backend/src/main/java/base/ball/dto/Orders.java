package base.ball.dto;

import java.time.LocalDateTime;

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
	 private int orderId;
	 private int goodsId;
	 private String goodsName;
	 private int orderCount;
	 private int orderPrice;
	 private String payYn;
	 private LocalDateTime payDate;
}
