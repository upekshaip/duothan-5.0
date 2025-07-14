import React from "react";
import NavBar from "./NavBar";
import DashNav from "./DashNav";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

const GetNavBar = async () => {
  const session = await auth();
  const navBar = async () => {
    if (!session) return <NavBar />;

    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
      },
    });

    return <DashNav user={user} />;
  };

  return <>{navBar()}</>;
};

export default GetNavBar;
