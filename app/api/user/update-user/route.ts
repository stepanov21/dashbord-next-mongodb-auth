import connectToDB from "@/database/index";
import User from "@/models/user/index";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {

  const session = await getServerSession(authOptions)

  try{
    await connectToDB()

    const update = await req.json()
    
    const currentUser = await User.find({email: session.user.email})

    const updateUser = await User.updateOne({email: session.user.email}, {...currentUser, ...update})

    if(updateUser) {
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