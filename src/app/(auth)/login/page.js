"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/actions/authentication";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black transition-colors">
      <form
        action={login}
        className="bg-white dark:bg-black border border-black dark:border-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-colors"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-black dark:text-white">
          Login
        </h2>

        {error && (
          <div className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded mb-4 text-sm border border-white dark:border-black">
            {decodeURIComponent(error)}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white placeholder-black dark:placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white placeholder-black dark:placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
