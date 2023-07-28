import express from "express";
import { verifyEmailController } from "../controllers/user.controller";
const router = express.Router();



router.get('/', (req, res) => {
    res.json({
        message: 'Hello from user routes 👋'
    })
})

// verify email address
router.get('/verify-email/:token', verifyEmailController)


export default router;