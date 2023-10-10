import Product, { TProduct } from "@/models/product/index";
import connectToDB from "@/database/index";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  
  try {
    await connectToDB();

    const currentUser: TProduct[] | null = await Product.find({});

    console.log("🚀 ~ file: route.ts:19 ~ GET ~ allProducts:", currentUser);

    if (currentUser) {
      return NextResponse.json({
        success: true,
        message: "Продукты есть!",
        data: currentUser
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Продукты не найдены",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Что-то пошло не так! Попробуйте позже",
    });
  }
}
