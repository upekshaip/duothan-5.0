"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

const RegisterTeam = async (formData) => {
  const session = await auth();
  if (!session) {
    return redirect("/login?error=You must be logged in to register a team");
  }

  const gender = formData.get("gender");
  const nic = formData.get("nic");
  const team = formData.get("team");
  if (team === "create_new") {
    const teamName = formData.get("teamName");
    const teamDesc = formData.get("teamDesc");
    if (!teamName || !teamDesc) {
      return redirect(
        "/registration?error=Team name and description are required"
      );
    }
    try {
      const newTeam = await prisma.team.create({
        data: {
          name: teamName,
          description: teamDesc,
        },
      });
      // Register the user to the new team
      await prisma.user.update({
        where: { email: session.user.email },
        data: { teamId: newTeam.id, gender: gender, nic: nic },
      });
    } catch (error) {
      return redirect(`/registration?error=${error.message}`);
    }
  } else {
    try {
      // Register the user to the existing team
      await prisma.user.update({
        where: { email: session.user.email },
        data: { teamId: parseInt(team), gender, nic },
      });
    } catch (error) {
      return redirect(`/registration?error=${error.message}`);
    }
  }
  return redirect("/user-dashboard");
};

export { RegisterTeam };
