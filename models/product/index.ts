import mongoose from "mongoose";

export interface TProduct {
  createdAt?: number | Date;
  _id?: string;
  productName: string;
  count: number;
  price: number;
  category: string;
  email?: string;
}

export const ProductSchema = new mongoose.Schema(
  {
    productName: String,
    count: Number,
    price: Number,
    category: String,
    email: String,
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
