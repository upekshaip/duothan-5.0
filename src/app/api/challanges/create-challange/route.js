import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { CheckReqFields } from "@/app/actions/CheckFields";
import { auth } from "@/auth";

export const POST = async (request) => {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Unauthorized");

    const admin = await prisma.admin.findFirst({
      where: { email: session.user.email },
    });
    if (!admin || admin.role !== "ADMIN") {
      return new NextResponse(
        JSON.stringify({ ok: false, error: "Unauthorized" }),
        { status: 403 }
      );
    }

    const data = await request.json();
    console.log(data, Object.keys(data));

    // Check if all required fields are present
    await CheckReqFields(data, Object.keys(data));

    await prisma.challenge.create({
      data: {
        title: data.title || "",
        description: data.description || "",
        algoQuestion: data.algoQuestion || "",
        buildQuestion: data.buildQuestion || "",
        flag: data.flag || "",
        status: "PENDING",
        createdBy: admin.id,
      },
    });

    return new NextResponse(JSON.stringify({ ok: true }), {
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
