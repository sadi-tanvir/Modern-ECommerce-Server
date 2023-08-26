import { Request, Response } from "express";
import bcrypt from "bcryptjs";
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


// update password
const passwordChangingController = async (req: Request, res: Response) => {
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
        status: true,
        message: "Password updated successfully."
    })
}

export {
    verifyEmailController,
    passwordChangingController
};