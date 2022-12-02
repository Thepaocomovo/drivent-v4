import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookings, createBooking, updateBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", createBooking)
  .put("/:bookingId", updateBooking);
export { bookingRouter };
