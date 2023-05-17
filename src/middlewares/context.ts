import jwt from "jsonwebtoken";

const context = async ({ req }: { req: any }) => {
    const authorization = req.headers.authorization
    if (authorization) {
        const decode: any = jwt.verify(authorization, 'bangladesh');
        return {
            email: decode?.email,
            role: decode?.role
        }
    } {
        return null
    };
};

export default context