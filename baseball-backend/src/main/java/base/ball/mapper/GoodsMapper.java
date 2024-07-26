package base.ball.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import base.ball.dto.Goods;

@Mapper
public interface GoodsMapper {
	List<Goods> findAll();
}
