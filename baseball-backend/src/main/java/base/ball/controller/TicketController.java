package base.ball.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.ball.dto.SeatLockRequest;
import base.ball.dto.Ticket;
import base.ball.service.TicketService;

@RestController
@RequestMapping("/ticket")
public class TicketController {

	@Autowired
	private TicketService ticketService;
	
	@GetMapping("/bookingMain")
	public List<Ticket> selectGame() {
		return ticketService.selectGame();
	}
	
	@PostMapping("/insertTicket")
	public ResponseEntity<String> insertTicket(@RequestBody Ticket ticket) {
		ticketService.insertTicket(ticket);
		return ResponseEntity.ok("response");
	}
	
	@GetMapping("/bookingInfoView")
	public List<Ticket> selectTicket() {
		return ticketService.selectTicket();
	}
	
	@DeleteMapping("/deleteTicket")
	public void deleteTicket(@RequestParam int bookingId) {
		ticketService.deleteTicket(bookingId);
	}
	
	/** Seat **/
	
	@PostMapping("/lockSeat")
	public ResponseEntity<String> lockSeat(@RequestBody SeatLockRequest seatLockRequest) {
		
		boolean success = ticketService.lockSeat(seatLockRequest.getSeatId(), seatLockRequest.getMemberNo());
		
		if (success) {
			
			return ResponseEntity.ok("Seat locked successfully");
		} else {
			
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Seat is already locked or reserved by another user");
		}
	}
	
	@GetMapping("/checkSeat")
	public ResponseEntity<Boolean> checkSeat(@RequestParam("seatId") String seatId) {
		boolean isLocked = ticketService.isSeatLocked(seatId);
		return ResponseEntity.ok(isLocked);
	}
}