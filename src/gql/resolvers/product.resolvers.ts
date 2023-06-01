import Product from "../../database/models/Product";
import { checkAdminService } from "../services/admin.services";
import { ObjectId } from "mongodb"

interface CommonType {
    id: string;
    name: string;
};

interface ProductType {
    name: string;
    description?: string;
    unit: string;
    imageUrl?: string;
    category: CommonType;
    brand: CommonType;
};

const productResolver = {
    Query: {},

    Mutation: {
        ////------>>> create a product <<<--------////
        createProduct: async (_: any, { data }: { data: ProductType }, context: any) => {
            const { name, description, unit, imageUrl, category, brand } = data;

            // checking admin authentication
            checkAdminService(context.role);

            // creating the product
            const _product = new Product({
                name,
                description,
                unit,
                imageUrl,
                category: {
                    id: new ObjectId(category.id),
                    name: category.name
                },
                brand: {
                    id: new ObjectId(brand.id),
                    name: brand.name
                }
            });

            await _product.save();

            return {
                status: true,
                message: 'Signup has been successful!'
            };
        }
    }
};

export default productResolver;