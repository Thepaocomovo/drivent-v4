import { AddressEnrollment } from "@/protocols";
import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import bookingRepository from "@/repositories/booking-repository";

async function getBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  if (!ticket) {
    throw notFoundError();
  }
  
  if(ticket.status !== "PAID") {
    throw notFoundError();
  }
  
  if (ticket.TicketType.includesHotel !== true || ticket.TicketType.isRemote !== false) {
    throw notFoundError();
  }
  
  const booking = await bookingRepository.findByUserId(userId);
  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

const bookingService = {
  getBooking
};

export default bookingService;
