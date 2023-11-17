import Product, { TProduct } from "@/models/product/index";
import connectToDB from "@/database/index";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { formatISO, getDate, lastDayOfWeek, startOfMonth, startOfWeek } from "date-fns";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }) {

  const weekAgo = params.weekAgo;

  const session = await getServerSession(authOptions)

  const currentMonday = new Date(formatISO(startOfWeek(new Date(), { weekStartsOn: 1 })))
  const currentSunday = new Date(formatISO(lastDayOfWeek(new Date(), { weekStartsOn: 1 }))) 

  const prevMonday = currentMonday.setDate(currentMonday.getDate() - 7 * weekAgo)
  const prevSunday = currentSunday.setDate(currentSunday.getDate() - (7 * weekAgo) - 1)

  
  try {
    await connectToDB();

    const currentUser: TProduct[] | null = await Product.find({email: session?.user?.email, 
      createdAt: {
        $gte: formatISO(prevMonday),
        $lt: formatISO(prevSunday)
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
