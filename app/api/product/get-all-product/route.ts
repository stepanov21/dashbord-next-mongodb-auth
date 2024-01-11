import User from "@/models/user/index";
import { formatISO, startOfMonth } from "date-fns";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import connectToDB from "@/database/index";
import type { TProduct } from "@/models/product/index";
import Product from "@/models/product/index";

import { authOptions } from "../../auth/[...nextauth]/route";

import type { NextRequest } from "next/server";
import { time } from "console";
import { filterByDate } from "@/utils/filterByDate";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const firsDayInMonth = startOfMonth(new Date());
  const today = new Date();
  // createdAt: { $gte: formatISO(firsDayInMonth), $lt: formatISO(today) }
  try {
    await connectToDB();

    const currentUser = await User.findOne(
      {
        email: session?.user?.email,
      },
      "products",
    );

    const prodByWeek = filterByDate(currentUser, today, firsDayInMonth);

    if (currentUser) {
      return NextResponse.json({
        success: true,
        message: "Продукты есть!",
        data: prodByWeek,
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
