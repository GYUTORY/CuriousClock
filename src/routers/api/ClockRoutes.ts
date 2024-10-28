import {Router} from "express";

import ClockController from '../controller/clock/ClockController';


const router = Router();

router.post("/highway/tollgate", [], ClockController.tollgate);

router.post("/highway/clock", [], ClockController.clock);



export default router;