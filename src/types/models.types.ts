import { Document } from "mongoose";

export interface UserSchemaType extends Document {
    name: string;
    email: string;
    password: string;
    image: string;
    phone: string;
    role: string;
    gender: string;
    currentAddress: string;
    permanentAddress: string;
    dateOfBirth: string;
    authToken: string;
    accountStatus: string;
    darkMode: boolean;
}