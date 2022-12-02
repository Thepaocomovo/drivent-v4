import { forbiddenError, badRequestError, notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import bookingRepository from "@/repositories/booking-repository";

async function getBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw forbiddenError();
  }

  if (ticket.status !== "PAID") {
    throw forbiddenError();
  }

  if (ticket.TicketType.includesHotel !== true || ticket.TicketType.isRemote !== false) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.findByUserId(userId);
  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  if (!roomId || roomId < 1) {
    throw badRequestError();
  }
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw forbiddenError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw forbiddenError();
  }

  if (ticket.status !== "PAID") {
    throw forbiddenError();
  }

  if (ticket.TicketType.includesHotel !== true || ticket.TicketType.isRemote !== false) {
    throw forbiddenError();
  }

  const allRoomBookings = await bookingRepository.findManyByRoomId(roomId);
  
  if(allRoomBookings[0]?.Room.capacity <= allRoomBookings.length) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.insertBooking(userId, roomId);

  return booking;
}

const bookingService = {
  getBooking,
  createBooking
};

export default bookingService;
