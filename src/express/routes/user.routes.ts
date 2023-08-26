import express from "express";
import { passwordChangingController, verifyEmailController } from "../controllers/user.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

declare global {
    namespace Express {
        interface Request {
            email?: string;
            role?: string;
        }
    }
}


router.get('/', (req, res) => {
    res.json({
        message: 'Hello from user routes 👋'
    })
})

// verify email address
router.get('/verify-email/:token', verifyEmailController)


// update password
router.post('/change-password', auth, passwordChangingController)


export default router;