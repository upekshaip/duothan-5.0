import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashNav from "../components/NavBars/DashNav";
import { prisma } from "@/prisma";

const AdminLayout = async ({ children }) => {
  const session = await auth();

  if (!session) return redirect("/login");
  const admin = await prisma.admin.findFirst({
    where: { email: session.user.email },
  });

  if (!admin) return redirect("/unauthorized");
  if (admin.role !== "ADMIN") return redirect("/unauthorized");

  const { password, ...filteredUser } = admin;

  return (
    <div className="px-2 poppins-regular">
      <DashNav user={filteredUser} />
      {children}
    </div>
  );
};

export default AdminLayout;
