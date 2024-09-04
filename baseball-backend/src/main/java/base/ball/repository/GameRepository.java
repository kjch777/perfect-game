package base.ball.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import base.ball.dto.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, String> {

}
