import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";

import connectToDB from "@/database/index";
import User from "@/models/user/index";

import { authOptions } from "../../auth/[...nextauth]/route";

import type { NextRequest} from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try{

    const session = await getServerSession(authOptions)

    await connectToDB()

    const currentUser = await User.findOne({email: session.user.email})

    if(currentUser) {
      return NextResponse.json({
        success: true,
        message: "Пользователи найдены",
        data: currentUser
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