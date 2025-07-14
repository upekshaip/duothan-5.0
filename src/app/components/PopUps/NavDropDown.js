import { logOut } from "@/app/actions/authentication";
import {
  faEnvelope,
  faFile,
  faGear,
  faNewspaper,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const NavDropDown = ({ user }) => {
  return (
    <div className="z-40 absolute right-0 mt-2 w-48 bg-white/80 dark:bg-gray-700/50 backdrop-blur-lg border-2 dark:border-gray-500 shadow-md rounded-md transition-opacity duration-300">
      <ul className="text-sm text-gray-700 dark:text-gray-300">
        <li>
          <Link
            href="/feed"
            className="block px-4 text-gray-600 dark:text-gray-100 py-2"
          >
            <FontAwesomeIcon className="w-4 h-4 mr-2" icon={faNewspaper} />
            Feed
          </Link>
        </li>
        <li>
          <Link
            href="/mydocs"
            className="block px-4 text-gray-600 dark:text-gray-100 py-2"
          >
            <FontAwesomeIcon className="w-4 h-4 mr-2" icon={faFile} />
            My Docs
          </Link>
        </li>
        <li>
          <Link
            href={`/${user.username}`}
            className="block px-4 text-gray-600 dark:text-gray-100 py-2"
          >
            <FontAwesomeIcon className="w-4 h-4 mr-2" icon={faUser} />
            Profile
          </Link>
        </li>
        <li>
          <Link
            href="/notifications"
            className="block px-4 text-gray-600 dark:text-gray-100 py-2"
          >
            <FontAwesomeIcon className="w-4 h-4 mr-2" icon={faEnvelope} />
            Notifications
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="block px-4 text-gray-600 dark:text-gray-100 py-2"
          >
            <FontAwesomeIcon className="w-4 h-4 mr-2" icon={faGear} />
            settings
          </Link>
        </li>
        <li>
          <form
            action={logOut}
            className="block px-4 text-gray-600 dark:text-gray-100 py-2 min-h-fit"
          >
            <button
              className="w-full text-start hover:underline min-h-fit"
              type="submit"
            >
              <FontAwesomeIcon
                className="w-4 h-4 mr-2"
                icon={faRightFromBracket}
              />
              LogOut
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default NavDropDown;
