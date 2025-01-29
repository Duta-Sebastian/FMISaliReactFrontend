"use client";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import SideBarAPP from "@/components/common/SideBarA";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 h-[8vh]">
      <div className="dark:bg-gray-800">
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center space-y-1 p-2"
        >
        <div
            className={`w-6 h-1 bg-gray-800 dark:bg-gray-100 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
        ></div>
        <div
            className={`w-6 h-1 bg-gray-800 dark:bg-gray-100 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
        ></div>
        <div
            className={`w-6 h-1 bg-gray-800 dark:bg-gray-100 transition-transform duration-300 ${isOpen ? '-rotate-45 translate-y-[-7.5px]' : ''}`}
        ></div>
        </button>
        
        <div
          className={`absolute left-0 mt-5 p-4 bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
            transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'}`}
        >
          <SideBarAPP />
        </div>
      </div>
      
      <Link
        href="https://fmi.unibuc.ro/"
        className="text-lg font-serif font-bold text-gray-800 dark:text-gray-100 items-center"
      >
        Facultatea de Matematică și Informatică
      </Link>
      
      <div className="flex-shrink-0 pl-2 items-center">
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default NavBar;
