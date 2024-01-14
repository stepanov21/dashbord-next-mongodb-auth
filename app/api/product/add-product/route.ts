import { NextResponse } from "next/server";

import connectToDB from "@/database/index";
import type { TProduct } from "@/models/product/index";
import Product from "@/models/product/index";

import type { NextRequest } from "next/server";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOption";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const product: TProduct = await req.json();

    const session = await getServerSession(authOptions);

    const updateUser = await User.updateOne(
      { email: session.user.email },
      { $push: { products: product } },
    );

    if (updateUser) {
      return NextResponse.json({
        success: true,
        message: "Продукт добавлен",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Ошибка добавления продукта",
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
