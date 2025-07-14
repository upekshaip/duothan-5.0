"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMoon,
  faRocket,
  faSun,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const [menuExpand, setMenuExpand] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);
  const [theme, setTheme] = useState("dark");
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const isLogged = false;

  const handleScroll = (e, id) => {
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        handleClose(e);
      }
    } else {
      setScrollTarget(id);
      router.push(`/#${id}`);
    }
  };

  const handleExpand = (e) => {
    if (menuExpand) {
      setMenuExpand(false);
    } else {
      setMenuExpand(true);
    }
  };

  const handleClose = (e) => {
    setMenuExpand(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (pathname === "/" && scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setScrollTarget(null); // Reset scroll target after scrolling
      setMenuExpand(false);
    }
  }, [pathname, scrollTarget]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (e) => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="sticky top-0 z-30 mx-auto flex w-full bg-opacity-60 backdrop-blur border-none shadow">
      <nav
        ref={menuRef}
        className={`${
          menuExpand ? "mb-60" : "mb-0"
        } my-transition flex w-full transform flex-col justify-between px-5 md:py-2 py-2.5 align-middle transition duration-500 ease-out md:mb-auto md:flex-row`}
      >
        <div className="md:w-1/3 flex items-center">
          <div className="max-w-16 h-10 items-center justify-center flex ">
            <button
              className="m-0 p-0"
              onClick={(e) => handleScroll(e, "home")}
            >
              <p className="uppercase poppins-bold">LOGO</p>
            </button>
          </div>
        </div>
        <ul
          className={`${
            menuExpand ? "top-10" : "-top-40"
          } poppins-semibold absolute mx-auto flex w-[90vw] flex-col justify-center gap-1 align-middle uppercase duration-300 md:relative md:top-auto md:w-1/3 md:flex-row md:gap-7 md:px-6 md:duration-0`}
        >
          <button
            onClick={(e) => handleScroll(e, "sudojet")}
            className="flex items-center justify-center py-1 text-center text-xs md:transition-none transition-colors hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faRocket} className="text-base mr-2" />
            SudoJet
          </button>
          <button
            onClick={(e) => handleScroll(e, "editor")}
            className="flex items-center justify-center py-1 text-center text-xs md:transition-none transition-colors hover:text-blue-500"
          >
            Editor
          </button>
          <button
            onClick={(e) => handleScroll(e, "features")}
            className="flex items-center justify-center py-1 text-center text-xs md:transition-none transition-colors hover:text-blue-500"
          >
            Features
          </button>
        </ul>

        <ul
          className={`${
            menuExpand ? "top-36" : "-top-36"
          } poppins-light my-transition duration-200 ease-out absolute flex w-[90vw] flex-col gap-1.5 align-middle md:relative md:top-auto md:mt-0 md:w-1/3 md:flex-row md:justify-end md:gap-3 md:pt-0`}
        >
          <button className="px-5 py-3" onClick={toggleTheme}>
            <FontAwesomeIcon
              size="xl"
              icon={theme === "dark" ? faMoon : faSun}
            />
          </button>

          <Link
            href="/login"
            onClick={handleClose}
            className="z-20 btn-framed md:my-2"
          >
            Login
          </Link>
          <Link
            href="/signup"
            onClick={handleClose}
            className="z-20 btn-framed fill-button md:my-2"
          >
            Signup
          </Link>
        </ul>
        <button
          onClick={handleExpand}
          className="fixed right-4 top-0 py-5 pl-16 pr-8 md:hidden"
        >
          {menuExpand ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </nav>
    </div>
  );
}
