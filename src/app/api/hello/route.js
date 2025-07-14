import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { CheckReqFields } from "@/app/actions/CheckFields";

export const POST = async (request) => {
  try {
    const data = await request.json();
    console.log(data, Object.keys(data));

    // Check if all required fields are present
    await CheckReqFields(data, Object.keys(data));

    const users = await prisma.user.findMany({
      where: {
        gender: "m",
      },
    });

    return new NextResponse(JSON.stringify({ ok: true, data: users }), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ ok: false, error: error.message }),
      { status: 400 }
    );
  }
};
