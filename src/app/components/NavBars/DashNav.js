"use client";
import React, { useState, useEffect, useRef } from "react";
import LogOutBtn from "../Auth/LogOutBtn";
import ThemeToggle from "../Theme/ThemeToggle";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faRightFromBracket,
  faUser,
  faNewspaper,
  faEnvelope,
  faGear,
  faFile,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import profile from "@/../public/img/profile.png";
import NavDropDown from "@/app/components/PopUps/NavDropDown";

const DashNav = ({ user }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notificationsPopup, setNotificationsPopup] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleNotification = () => {
    setNotificationsPopup(!notificationsPopup);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setNotificationsPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="default-container-style max-w-screen-2xl mx-auto flex justify-between items-center p-4 my-1 shadow-md"
        style={{ position: "relative" }}
      >
        <div className="flex items-center">
          <Link href="/feed" className="m-0 p-0 hover:no-underline">
            <p className="uppercase poppins-bold">LOGO</p>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2"
              onClick={toggleDropdown}
            >
              <Image
                src={user.image || profile}
                alt={user.name}
                width={20}
                height={20}
                className="rounded-full h-9 w-9"
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownVisible && <NavDropDown user={user} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashNav;
