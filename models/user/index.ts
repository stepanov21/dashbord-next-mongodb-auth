import { Schema, model, models, Model } from "mongoose";

const  {default: mongoose} = require('mongoose')

interface IUser {
  email: string;
  name: string;
  image: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  }
);

const User: Model<IUser>= models.Users || model<IUser>('Users', userSchema)
export default User;