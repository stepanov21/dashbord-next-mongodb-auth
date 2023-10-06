import mongoose from "mongoose";

export interface TProduct {
  productName: string;
  count: number;
  price: number;
  category: string;
  email?: string; 
}

const ProductSchema = new mongoose.Schema(
  {
    productName: String,
    count: Number,
    price: Number,
    category: String,
  }, {
    timestamps: true
  }
);

const Product = mongoose.models.Products || mongoose.model('Products', ProductSchema)

export default Product;