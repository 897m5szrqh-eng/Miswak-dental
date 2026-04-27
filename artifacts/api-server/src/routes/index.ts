import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatBookingRouter from "./chat-booking";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatBookingRouter);

export default router;
