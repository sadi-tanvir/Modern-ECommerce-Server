import User from "../../database/models/User"
import { UserType } from "../../types/resolvers.types";



const userResolver = {
    Query: {},

    Mutation: {
        signUpUser: async (_: any, { data }: { data: UserType }, context: any) => {
            const _user = new User({
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone
            });

            await _user.save()

            return {
                status: true,
                message: 'Signup has been successful!'
            }
        }
    }
};

export default userResolver;