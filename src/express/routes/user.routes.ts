import express from "express";
import { verifyEmailController } from "../controllers/user.controller";
const router = express.Router();



// verify email address
router.get('/verify-email/:token', verifyEmailController)


export default router;