import {Router} from "express";

import ClockRoutes from "./ClockRoutes";


const router = Router();

router.use("/api", ClockRoutes);

export default router;

