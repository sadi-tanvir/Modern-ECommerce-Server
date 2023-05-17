import { Request, Response } from "express";
import User from "../../database/models/User";

// verify email address
const verifyEmailController = async (req: Request, res: Response) => {

    const _user = await User.findOne({ authToken: req.params.token })
    if (!_user) return res.json({ status: false, message: 'invalid token!' })

    _user.authToken = 'verified';
    _user.accountStatus = 'active'
    await _user.save()

    res.json({
        status: true,
        message: 'You have successfully done your job.',
    })
}

export {
    verifyEmailController
};