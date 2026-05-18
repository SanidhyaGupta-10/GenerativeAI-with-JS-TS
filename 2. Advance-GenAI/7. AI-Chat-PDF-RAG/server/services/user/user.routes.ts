import { Router } from "express";

import { syncUser } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post('/create-user', authMiddleware, syncUser)

export default router;  