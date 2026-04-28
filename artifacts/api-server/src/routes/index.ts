import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatBookingRouter from "./chat-booking";
import appointmentRequestRouter from "./appointment-request";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatBookingRouter);
router.use(appointmentRequestRouter);

export default router;
