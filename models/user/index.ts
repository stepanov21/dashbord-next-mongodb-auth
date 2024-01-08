import { ProductSchema, TProduct } from "./../product/index";
import { Schema, model, models, Model } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  image: string;
  language: "English" | "Ukrainian";
  darkmode: boolean;
  dayLimit: number;
  products: TProduct[];
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["English", "Ukrainian"],
      default: "English",
    },
    darkmode: {
      type: Boolean,
      default: false,
    },
    dayLimit: {
      type: Number,
      default: 400,
    },
    products: {
      type: [ProductSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = models.Users || model<IUser>("Users", userSchema);
export default User;
