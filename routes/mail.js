import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/authMiddleware"

import { sendMail, inbox, sent } from "../controllers/mail";

router.post("/send-mail", verifyToken, sendMail)
router.get("/inbox", verifyToken, inbox)
router.get("/sent", verifyToken, sent)

export default router;