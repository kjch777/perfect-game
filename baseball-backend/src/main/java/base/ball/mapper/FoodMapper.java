package base.ball.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import base.ball.dto.Food;

@Mapper
public interface FoodMapper {
	List<Food> foodAll();
}
