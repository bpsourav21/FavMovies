import { Router } from "express";
import authRoute from "./auth";
import movieRoute from "./movie";

const router = Router();

router.use('/auth', authRoute)
router.use('/movies', movieRoute)

export default router;
