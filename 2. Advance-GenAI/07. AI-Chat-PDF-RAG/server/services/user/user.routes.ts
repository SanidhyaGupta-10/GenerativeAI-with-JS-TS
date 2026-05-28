import { Router } from "express";

import { syncUser } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();
    /* 
    * @route /user
    * @desc this endpoint syncs the user data from clerk with our database
    */
router.post('/create-user', authMiddleware, syncUser)

export default router;  