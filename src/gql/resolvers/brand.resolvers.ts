import Brand from "../../database/models/Brand";
import { checkAdminService } from "../services/admin.services";
import { ObjectId } from "mongodb"

interface CommonType {
    id: string;
    name: string;
};

interface BrandType {
    name: string;
    description?: string;
    email: string;
    phone?: string;
    website?: string;
    location?: string;
};

const brandResolver = {
    Query: {
        ////------>>> get all brands <<<--------////
        brands: async (_: any, args: any, context: { email: string; role: string; }) => {
            // checking admin authentication
            checkAdminService(context.role);
            
            // getting from database
            const _brands = await Brand.find();
            return _brands
        }
    },

    Mutation: {
        ////------>>> create a brand <<<--------////
        createBrand: async (_: any, { data }: { data: BrandType }, context: any) => {
            const { name, description, email, phone, website, location, } = data;

            // checking admin authentication
            checkAdminService(context.role);

            // creating the brand
            const _brand = new Brand({
                name,
                description,
                email,
                phone,
                website,
                location
            });

            await _brand.save();

            return {
                status: true,
                message: 'The Brand has been created successfully!'
            };
        }
    }
};

export default brandResolver;