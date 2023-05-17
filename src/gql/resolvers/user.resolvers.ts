import User from "../../database/models/User"
import sendEmail from "../../middlewares/sendMail";
import { UserType } from "../../types/resolvers.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const userResolver = {
    Query: {},

    Mutation: {
        ////------>>> user signup <<<--------////
        signUpUser: async (_: any, { data }: { data: UserType }, context: any) => {
            const { name, email, password, phone } = data;

            // hashing password
            const hashedPassword = await bcrypt.hash(password, 10);

            // generating token
            const token = jwt.sign({ email }, process.env.SECRET_KEY);

            // create user
            const _user = new User({
                name,
                email,
                password: hashedPassword,
                phone,
                authToken: token
            });
            await _user.save()

            // sending mail
            sendEmail(data.email, token)

            return {
                status: true,
                message: 'Signup has been successful!'
            };
        },

        ////------>>> user login <<<--------////
        loginUser: async (_: any, { data }: { data: UserType }, context: any) => {
            const { email, password } = data;

            // checking user existence
            const _user = await User.findOne({ email })
            if (!_user) return { status: false, message: 'Invalid Credentials' }

            // verifying password
            const isPasswordMatch = await bcrypt.compare(password, _user.password);
            if (!isPasswordMatch) return { status: false, message: 'Invalid Credentials' };

            // generating token
            const token = jwt.sign({ email, role: _user.role }, process.env.SECRET_KEY);

            return {
                status: true,
                message: 'Successfully logged in',
                token,
                user: _user
            };
        }
    }
};

export default userResolver;