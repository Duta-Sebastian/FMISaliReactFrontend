"use client";

import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
            <Link
                href="https://fmi.unibuc.ro/"
                className="text-lg font-serif font-bold text-gray-800 dark:text-gray-100"
            >
                Facultatea de Matematică și Informatică
            </Link>
            <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700
                 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Home
            </Link>
            <ThemeSwitch/>
        </nav>
    );
}

export default NavBar;