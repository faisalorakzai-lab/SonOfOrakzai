import { Router, type IRouter } from "express";
import healthRouter from "./health";
import membersRouter from "./members";
import blogRouter from "./blog";
import contactRouter from "./contact";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(membersRouter);
router.use(blogRouter);
router.use(contactRouter);
router.use(statsRouter);

export default router;
