package base.ball.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import base.ball.dto.Playground;

@Mapper
public interface PlaygroundMapper {
	List<Playground> playgroundAll();
}
