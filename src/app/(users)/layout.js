import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashNav from "../components/NavBars/DashNav";
import { prisma } from "@/prisma";

const UserLayout = async ({ children }) => {
  const session = await auth();

  if (!session) return redirect("/login");
  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  if (!user) return redirect("/signup");
  if (user.role !== "USER") return redirect("/unauthorized");
  if (!user.teamId) return redirect("/registration");

  const { password, ...filteredUser } = user;

  return (
    <div className="px-2 poppins-regular">
      <DashNav user={filteredUser} />
      {children}
    </div>
  );
};

export default UserLayout;
