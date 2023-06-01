import Category from "../../database/models/Category";
import { checkAdminService } from "../services/admin.services";


interface CategoryType {
    name: string;
    description?: string;
};

const categoryResolver = {
    Query: {
        categories: async (_: any, args: any, context: { email: string; role: string; }) => {
            // checking admin authentication
            checkAdminService(context.role);

            // getting from database
            const _categories = await Category.find();
            return _categories;
        }
    },

    Mutation: {
        ////------>>> create a category <<<--------////
        createCategory: async (_: any, { data }: { data: CategoryType }, context: any) => {
            const { name, description } = data;

            // checking admin authentication
            checkAdminService(context.role);

            // creating the category
            const _category = new Category({
                name,
                description
            });

            await _category.save();

            return {
                status: true,
                message: 'The Category has been created successfully!'
            };
        }
    }
};

export default categoryResolver;