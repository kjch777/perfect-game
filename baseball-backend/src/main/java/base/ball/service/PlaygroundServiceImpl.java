package base.ball.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import base.ball.dto.Playground;
import base.ball.mapper.PlaygroundMapper;

@Service
public class PlaygroundServiceImpl implements PlaygroundService {
	@Autowired
	private PlaygroundMapper playgroundMapper;
	
	@Override
	public List<Playground> playgroundAll(){
		return playgroundMapper.playgroundAll();
	}
}
