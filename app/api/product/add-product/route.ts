import Product, { TProduct } from '@/models/product/index';
import connectToDB from "@/database/index";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try{
    await connectToDB()
    const product : TProduct = await req.json()

    const addedProduct = await Product.create(product)

    if(addedProduct) {
      return NextResponse.json({
        success: true,
        message: "Продукт добавлен"
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Ошибка добавления продукта"
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