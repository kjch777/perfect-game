package base.ball.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.Ticket;
import base.ball.service.TicketService;

@RestController
@RequestMapping("/ticket")
public class TicketController {

	@Autowired
	private TicketService ticketService;
	
	@PostMapping
	public void insertTicket(@RequestBody Ticket ticket) {
		ticketService.insertTicket(ticket);
	}
	
	@DeleteMapping
	public void deleteTicket(@RequestParam int bookingId) {
		ticketService.deleteTicket(bookingId);
	}
}
