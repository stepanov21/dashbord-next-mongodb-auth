import { endOfDay, endOfYesterday, formatISO } from "date-fns";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import connectToDB from "@/database/index";
import type { TProduct } from "@/models/product/index";

import { authOptions } from "@/utils/authOption";

import type { NextRequest } from "next/server";
import User from "@/models/user";
import { filterByDate } from "@/utils/filterByDate";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }) {
  const day = params.day;

  const session = await getServerSession(authOptions);

  try {
    await connectToDB();

    const currentUser: TProduct[] | null = await User.findOne(
      { email: session?.user?.email },
      "products",
    );

    const prodByWeek = filterByDate(
      currentUser,
      endOfDay(new Date()),
      endOfYesterday(),
    );
    // createdAt: {
    //   $gte: formatISO(endOfYesterday()),
    //   $lt:formatISO(endOfDay(new Date())),
    // }

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
