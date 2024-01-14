import {
  formatISO,
  getDate,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import connectToDB from "@/database/index";
import type { TProduct } from "@/models/product/index";
import Product from "@/models/product/index";

import { authOptions } from "@/utils/authOption";

import type { NextRequest } from "next/server";
import User from "@/models/user";
import { filterByDate } from "@/utils/filterByDate";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }) {
  const weekAgo = params.weekAgo;

  const session = await getServerSession(authOptions);

  const currentMonday = new Date(
    formatISO(startOfWeek(new Date(), { weekStartsOn: 1 })),
  );
  const currentSunday = new Date(
    formatISO(lastDayOfWeek(new Date(), { weekStartsOn: 1 })),
  );

  const prevMonday = currentMonday.setDate(
    currentMonday.getDate() - 7 * weekAgo - 1,
  );
  const prevSunday = currentSunday.setDate(
    currentSunday.getDate() - 7 * weekAgo,
  );

  console.log(formatISO(prevMonday), formatISO(prevSunday));

  try {
    await connectToDB();

    const currentUser: TProduct[] | null = await User.findOne(
      { email: session?.user?.email },
      "products",
    );

    const prodByWeek = filterByDate(currentUser, prevSunday, prevMonday);

    if (prodByWeek) {
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
