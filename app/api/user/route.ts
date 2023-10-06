import connectToDB from "@/database/index";
import User from "@/models/user/index";
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
  try{
    await connectToDB()
    const {name, email} = await req.json()

    const newUser = await User.create({name, email})

    if(newUser) {
      return NextResponse.json({
        success: true,
        message: "Пользователь зарегистрирован"
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Ошибка регистрации"
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