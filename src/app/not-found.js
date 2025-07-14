import Link from "next/link";
import React from "react";
import GetNavBar from "./components/NavBars/GetNavBar";

const NotFound = () => {
  return (
    <>
      <title>404: This page could not be found.</title>
      <div className="poppins-regular min-h-screen max-w-screen-2xl relative bg-white dark:bg-black transition-colors duration-300">
        <GetNavBar />
        <div
          className="flex flex-col items-center justify-center absolute w-full"
          style={{ height: `calc(90vh)` }}
        >
          <div className="text-center">
            <h1 className="text-9xl font-bold text-black dark:text-white">
              404
            </h1>
            <h3 className="mt-4 poppins-semibold text-gray-800 dark:text-gray-200">
              This page could not be found.
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sorry, but the page you are looking for does not exist
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="btn-framed fill-button !py-2 !px-6 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-200"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
