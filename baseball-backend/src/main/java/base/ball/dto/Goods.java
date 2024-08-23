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
public class Goods {
	private int goodsId;
	private String goodsName;
	private int goodsPrice;
	private String goodsImage;
	private String goodsDetailImage;
	private String team;
}