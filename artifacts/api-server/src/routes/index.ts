import { Router, type IRouter } from "express";
import healthRouter from "./health";
import pressConferenceRouter from "./press-conference";

const router: IRouter = Router();

router.use(healthRouter);
router.use(pressConferenceRouter);

export default router;
