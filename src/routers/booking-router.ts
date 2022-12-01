import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getBookings } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookings);

export { bookingRouter };
