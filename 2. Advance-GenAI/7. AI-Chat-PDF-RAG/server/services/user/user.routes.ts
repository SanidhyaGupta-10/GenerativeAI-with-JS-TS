import { Router } from "express";

import { syncUser } from "./user.controller";
import { attachUser } from "../../middleware/auth.middleware";

const router = Router();

router.post('/create-user', attachUser, syncUser)

export default router;  