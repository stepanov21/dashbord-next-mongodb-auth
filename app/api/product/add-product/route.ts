import Product, { TProduct } from '@/models/product/index';
import connectToDB from "@/database/index";
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/user/index';

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try{
    await connectToDB()
    const product : TProduct = await req.json()

    const newProduct = await Product.create(product)
    console.log("🚀 ~ file: route.ts:14 ~ POST ~ product:", product)

    const currentUser = await User.updateOne({email: product.email}, {products: product}, {multi: true})

    console.log("🚀 ~ file: route.ts:19 ~ POST ~ currentUser:", currentUser)

    if(newProduct) {
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