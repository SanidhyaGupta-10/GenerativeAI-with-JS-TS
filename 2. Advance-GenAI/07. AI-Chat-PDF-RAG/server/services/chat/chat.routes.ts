import { Router } from "express";
import { chat } from "./chat.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

    /* 
    * @route /chat-with-pdf
    * @desc This endpoint processes user queries against uploaded PDFs by fetching context from the vector database and generating an AI response.
    */
router.post("/chat-with-pdf", authMiddleware, chat);

export default router;