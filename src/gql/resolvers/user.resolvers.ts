import User from "../../database/models/User"
import sendEmail from "../../middlewares/sendMail";
import { UserType } from "../../types/resolvers.types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const userResolver = {
    Query: {},

    Mutation: {
        signUpUser: async (_: any, { data }: { data: UserType }, context: any) => {
            const { name, email, password, phone } = data;

            // hashing password
            const hashedPassword = await bcrypt.hash(password, 10)

            // generating token
            const token = jwt.sign({ email }, process.env.SECRET_KEY)

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
            }
        }
    }
};

export default userResolver;