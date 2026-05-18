import { Router } from "express";
import { chat } from "./chat.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

/**
 * Chat With PDF Route
 * @desc - Chat with PDF using Qdrant and Ollama
 * @access Private
 * @method POST
 * @url /api/chats/chat-with-pdf
 * @middlewares authMiddleware
 * @returns {message: string, data: string}
 */
router.post("/chat-with-pdf", authMiddleware, chat);

export default router;