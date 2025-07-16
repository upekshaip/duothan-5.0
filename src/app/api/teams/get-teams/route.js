import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { CheckReqFields } from "@/app/actions/CheckFields";
import { auth } from "@/auth";

export const POST = async (request) => {
  try {
    const session = await auth();
    if (!session?.user?.email || session?.admin?.email)
      throw new Error("Unauthorized");

    const data = await request.json();
    console.log(data, Object.keys(data));

    // Check if all required fields are present
    await CheckReqFields(data, Object.keys(data));

    const teams = await prisma.team.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return new NextResponse(JSON.stringify({ ok: true, teams: teams }), {
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
