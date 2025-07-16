import Registration from "@/app/components/Auth/Registrations";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const RegistrationPage = async () => {
  const session = await auth();
  if (!session)
    return redirect("/login?error=You must be logged in to register a team");

  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
  });
  if (user.teamId) return redirect("/user-dashboard");
  return <Registration />;
};

export default RegistrationPage;
