import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getBookings, createBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", createBooking);
export { bookingRouter };
