import { Schema, model } from "mongoose";
import validator from "validator"

// Define the interface for Stock document
interface StockModelTypes {
    name: string;
    description?: string;
    unit: "kg" | "litre" | "pcs" | "bag";
    status: "in-stock" | "out-of-stock" | "discontinued";
    imageUrl?: string;
    price: number;
    discount: number;
    quantity: number;
    category: {
        name: string;
        id: Schema.Types.ObjectId;
    };
    sellCount: number;
    brand: {
        name: string;
        id: Schema.Types.ObjectId;
    };
    rating: number;
    isTopSale: boolean;
    createdAt: Date;
    updatedAt: Date;
}


const stockSchema = new Schema<StockModelTypes>({
    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        lowercase: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
    },

    description: {
        type: String
    },

    unit: {
        type: String,
        required: [true, "Unit is required"],
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE} only kg, litre or pcs"
        }
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status value can't be {VALUE} only in-stock, out-of-stock or discontinued"
        }
    },
    imageUrl: {
        type: String,
        default: 'empty-product.png'
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],

    },

    discount: {
        type: Number,
        min: [0, "Price cannot be negative"],
        default: 0
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [0, "Quantity cannot be negative"],
        validate: {
            validator: (value: number) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    },
    category: {
        name: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        }
    },
    sellCount: {
        type: Number,
        default: 0,
        min: [0, "Sell count cannot be negative"]
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Schema.Types.ObjectId,
            ref: "Brand"
        }
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot be greater than 5"],
    },
    isTopSale: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

stockSchema.pre('save', function () {
    if (this.quantity <= 0) {
        this.status = "out-of-stock"
    } else {
        this.status = "in-stock"
    }
})



export default model<StockModelTypes>("Stock", stockSchema);
