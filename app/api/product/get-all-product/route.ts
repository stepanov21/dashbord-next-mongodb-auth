import Product, { TProduct } from '@/models/product/index';
import connectToDB from "@/database/index";
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try{
    await connectToDB()

    const allProducts: TProduct[] = await Product.find({})

    if(allProducts) {
      return NextResponse.json({
        success: true,
        data: allProducts
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Продукты не найдены"
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