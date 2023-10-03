import mongoose from "mongoose";

const connectToDB = async() => {
  try {
    await mongoose.connect(
      "mongodb+srv://stepan21:Zvx9ZeK6yO9FefhE@cluster0.zivh2cw.mongodb.net/"
    )
    console.log("Connected to DB")
  } catch (err) {
    console.log(err, "Pososi Zhopu")
  }
}

export default connectToDB;
