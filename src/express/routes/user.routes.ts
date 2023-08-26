import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { verifyEmailController } from "../controllers/user.controller";
import auth from "../../middlewares/auth";
import User from "../../database/models/User";
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
router.post('/change-password', auth, async (req: Request, res: Response) => {
    const _user = await User.findOne({ email: req.email });

    // matching passwor
    const isMathPass = bcrypt.compareSync(req.body.oldPass, _user.password)
    if (!isMathPass) return res.status(400).json({ message: 'invalid password' });

    // If password match, then make hash the new password.
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.newPass, salt);

    const updatePassword = await User.findOneAndUpdate({ email: _user.email }, { $set: { password: hash } })
    if (!updatePassword) return res.status(400).json({ message: 'failed to update password' });

    res.json({
        pass: _user.password,
        match: isMathPass,
        updatePassword
    })
})


export default router;