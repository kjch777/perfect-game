package base.ball.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
	@GetMapping(value = {"", "/", "/ticket/**", "/board/**"})
	public String forward() {
		return "forward:/index.html";
	}
}