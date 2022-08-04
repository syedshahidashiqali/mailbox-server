import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/authMiddleware";
import { getUser } from "../controllers/user";

router.get("/", verifyToken, getUser);

export default router;
