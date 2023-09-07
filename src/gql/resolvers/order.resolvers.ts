import Order from "../../database/models/Order";
import User from "../../database/models/User";
import { checkAdminService } from "../services/admin.services";
import { ObjectId } from "mongodb"

interface CommonType {
    id: string;
    name: string;
};

interface ItemsType {
    stockId: any,
    qty: number,
    price: number,
    name: string,
    imageUrl: string,
}

interface OrderType {
    userId: string;
    items: ItemsType[];
    email: string;
    phone: string;
    address: string;
    amount: number;
    paymentStatus: string;
    trxId: string;
    orderStatus: string;
};

const orderResolver = {
    Query: {
        ////------>>> get all orders <<<--------////
        orders: async (_: any, args: any, context: { email: string; role: string; }) => {
            // checking admin authentication
            checkAdminService(context.role);

            // getting from database
            const orders = await Order.find()
                .populate('userId')
                .populate('items.stockId');
            return orders;
        },
    },

    Mutation: {
        ////------>>> create an order <<<--------////
        createOrder: async (_: any, { data }: { data: OrderType }, context: { email: string; role: string; }) => {
            const { userId, items, email, phone, address, amount, } = data;

            const user = await User.find({ email: context.email })
            if (!user) throw new Error("authorized user");

            // creating the order
            const order = new Order({
                userId: new ObjectId(userId),
                items: items,
                email,
                phone,
                address,
                amount,
            });

            await order.save();

            return {
                status: true,
                message: 'The Order has been created successfully!'
            };
        }
    }
};

export default orderResolver;