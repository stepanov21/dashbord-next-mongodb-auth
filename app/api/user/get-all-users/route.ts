import connectToDB from "@/database/index";
import User from "@/models/user/index";
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
  try{
    await connectToDB()

    const newUser = await User.find({})

    if(newUser) {
      return NextResponse.json({
        success: true,
        message: "Пользователи найдены",
        data: newUser
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Ошибка, пользователей нима"
      })
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Что-то пошло не так! Попробуйте позже"
    })
  }
  
}