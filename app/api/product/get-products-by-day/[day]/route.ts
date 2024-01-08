import { endOfDay, endOfYesterday, formatISO } from "date-fns";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import connectToDB from "@/database/index";
import type { TProduct } from "@/models/product/index";
import Product from "@/models/product/index";

import { authOptions } from "../../../auth/[...nextauth]/route";

import type { NextRequest} from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }) {

  const day = params.day;

  const session = await getServerSession(authOptions)
  
  try {
    await connectToDB();

    const currentUser: TProduct[] | null = await Product.find({email: session?.user?.email, 
      createdAt: {
        $gte: formatISO(endOfYesterday()),
        $lt:formatISO(endOfDay(new Date())),
      }
    });

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
