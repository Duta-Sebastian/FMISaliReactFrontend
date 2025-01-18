"use client";
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch";
import "./Navbar.css";
import { useState } from "react";

const NavBar = () => {

    //DropDown Button
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
            <div className="relative">
                <button
                    onClick={toggleMenu}
                    className="flex flex-col justify-center items-center space-y-1 p-2"
                >
                    <div className="w-6 h-1 bg-gray-800 dark:bg-gray-100"></div>
                    <div className="w-6 h-1 bg-gray-800 dark:bg-gray-100"></div>
                    <div className="w-6 h-1 bg-gray-800 dark:bg-gray-100"></div>
                </button>
                {isOpen && (
                    <div className="absolute left-0 mt-2 p-4 bg-gray-200 text-white dark:bg-gray-900">
                        <ul>
                            <li className="text-lg text-gray-800 items:center dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                                <Link href="/" className="block px-10 py-2">
                                    Home
                                </Link>
                            </li>
                            <li className="text-lg text-gray-800 items:center dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                                <Link href="/about" className="block px-10 py-2">
                                    Toate Sălile
                                </Link>
                            </li>
                            <li className="text-lg text-gray-800 items:center dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out">
                                <Link href="/rezervare" className="block px-10 py-2">
                                    Rezervare Sală
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <Link
                href="https://fmi.unibuc.ro/"
                className="text-lg font-serif font-bold text-gray-800 dark:text-gray-100 items-center"
            >
                Facultatea de Matematică și Informatică
            </Link>
            {/* <div className="flex-grow flex justify-center">
                <Link
                    href="/"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700
                     dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Home
                </Link>
            </div> */}
            <div className="flex-shrink-0 pl-2 items-center">
                <ThemeSwitch/>
            </div>
        </nav>
    );
}

export default NavBar;