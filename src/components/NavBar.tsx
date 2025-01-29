"use client";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import SideBarAPP from "@/components/common/SideBarA";
import {useRef, useState} from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useOutsideClick(menuRef,buttonRef,setIsOpen);

    return (
        <nav className="relative flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 h-[8vh] z-50">
            <div className="flex items-center">
                <button
                    onClick={toggleMenu}
                    ref={buttonRef}
                    className="flex flex-col justify-center items-center space-y-1 p-2"
                >
                    <div
                        className={`w-6 h-1 bg-gray-800 dark:bg-gray-100 transition-transform duration-300 ${
                            isOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                    ></div>
                    <div
                        className={`w-6 h-1 bg-gray-800 dark:bg-gray-100 transition-opacity duration-300 ${
                            isOpen ? "opacity-0" : ""
                        }`}
                    ></div>
                    <div
                        className={`w-6 h-1 bg-gray-800 dark:bg-gray-100 transition-transform duration-300 ${
                            isOpen ? "-rotate-45 translate-y-[-7.5px]" : ""
                        }`}
                    ></div>
                </button>
            </div>

            <Link
                href="https://fmi.unibuc.ro/"
                className="text-lg font-serif font-bold text-gray-800 dark:text-gray-100"
            >
                Facultatea de Matematică și Informatică
            </Link>

            <div className="flex-shrink-0 pl-2">
                <ThemeSwitch />
            </div>

            <div
                className={`absolute top-full left-0 bg-gray-200 text-black dark:bg-gray-800
                dark:text-white p-4 transition-transform duration-300 ease-in-out z-50 ${
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
                }`}
                ref={menuRef}
            >
                <SideBarAPP />
            </div>
        </nav>
    );
};

export default NavBar;
