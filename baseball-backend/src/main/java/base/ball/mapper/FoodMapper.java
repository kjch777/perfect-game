package base.ball.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import base.ball.dto.Food;

@Mapper
public interface FoodMapper {
	Food getFoodById(int foodId);
}
