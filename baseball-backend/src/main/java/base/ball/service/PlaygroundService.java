package base.ball.service;

import java.util.List;

import org.springframework.stereotype.Service;

import base.ball.dto.Playground;

@Service
public interface PlaygroundService {
	List<Playground> playgroundAll();
}
