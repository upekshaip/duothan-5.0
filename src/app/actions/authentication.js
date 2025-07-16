"use server";
import { signIn, auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { hash, compare } from "bcryptjs";
import { prisma } from "@/prisma";

const signup = async (formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  try {
    if (!name || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const passwordStrength =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordStrength.test(password)) {
      throw new Error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return redirect(`/signup?error=${error.message}`);
  }
  await signIn("credentials", {
    redirectTo: "/user-dashboard",
    name,
    email,
    password,
  });
};
const signupAdmin = async (formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  try {
    if (!name || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const passwordStrength =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordStrength.test(password)) {
      throw new Error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    const hashedPassword = await hash(password, 10);
    await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return redirect(`/admin-signup?error=${error.message}`);
  }
  await signIn("admin", {
    redirectTo: "/admin-dashboard",
    name,
    email,
    password,
  });
};

const login = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("login attempt", email);
  const logUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (logUser) {
    const isValid = await compare(password, logUser.password);
    if (!isValid) {
      return redirect("/login?error=Email or password is incorrect");
    }
    console.log("You logged in successfully");
    await signIn("credentials", {
      redirectTo: "/user-dashboard",
      email,
      password,
    });
  }
  return redirect("/login?error=Email or password is incorrect");
};

const loginAdmin = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("login attempt", email);
  const logUser = await prisma.admin.findFirst({
    where: {
      email: email,
    },
  });
  if (logUser) {
    const isValid = await compare(password, logUser.password);
    if (!isValid) {
      return redirect("/admin-login?error=Email or password is incorrect");
    }
    console.log("You logged in successfully - admin");
    await signIn("admin", {
      redirectTo: "/admin-dashboard",
      email,
      password,
    });
  }
  return redirect("/admin-login?error=Email or password is incorrect");
};

const logOut = async () => {
  await signOut();
};

export { login, signup, logOut, signupAdmin, loginAdmin };
