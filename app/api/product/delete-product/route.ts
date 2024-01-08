import { NextResponse } from "next/server"

import connectToDB from "@/database/index";
import Product from '@/models/product/index';

import type { NextRequest} from "next/server";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try{
    await connectToDB()
    const {_id} = await req.json()
    
    const currentUser = await Product.findByIdAndDelete({_id: _id})

    console.log("🚀 ~ file: route.ts:19 ~ POST ~ currentUser:", currentUser)

    if(currentUser) {
      return NextResponse.json({
        success: true,
        message: "Продукт удален"
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Ошибка удаления продукта"
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