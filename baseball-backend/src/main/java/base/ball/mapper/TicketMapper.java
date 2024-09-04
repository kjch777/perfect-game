package base.ball.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import base.ball.dto.Ticket;

@Mapper
public interface TicketMapper {
	
	List<Ticket> selectGame();

	void insertTicket(Ticket ticket);
	
	List<Ticket> selectTicket(int memberNo);
	
	void deleteTicket(List<Integer> bookingIds);
	
	List<Ticket> checkSeatStatus(String gameCode);
	
	Ticket checkBookingStatus(String gameCode);
	
	/** Seat **/
	
	Ticket findById(@Param("seatId") String seatId);
    
	void updateSeat(Ticket ticket);
    
	void insertSeat(Ticket ticket);
}