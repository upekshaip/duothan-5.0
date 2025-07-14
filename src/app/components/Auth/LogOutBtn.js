import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "@/app/actions/authentication";

const LogOutBtn = () => {
  return (
    <>
      <form action={logOut}>
        <button
          type="submit"
          className="text-white px-4 py-1 bg-red-500 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <FontAwesomeIcon
              className="w-4 h-4 mr-2"
              icon={faRightFromBracket}
            />
            <p className="">Log Out</p>
          </div>
        </button>
      </form>
    </>
  );
};

export default LogOutBtn;
