"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiHome, HiPresentationChartBar, HiTicket } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";
import Link from "next/link";

interface SideBarProps {
  setIsOpenAction: (isOpen: boolean) => void;
}

export default function SideBarAPP({ setIsOpenAction }: SideBarProps) {
  const handleLinkClick = () => {
    setIsOpenAction(false);
  };

  return (
      <Sidebar aria-label="Meniu principal" className="bg-gray-200 dark:bg-gray-800">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link href="/" passHref legacyBehavior>
              <a className="block w-full">
                <Sidebar.Item
                    as="div"
                    className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                    onClick={handleLinkClick}
                >
                  <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                    <HiHome />
                    Home
                  </div>
                </Sidebar.Item>
              </a>
            </Link>

            <Link href="/orarstud" passHref legacyBehavior>
              <a className="block w-full">
                <Sidebar.Item
                    as="div"
                    className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                    onClick={handleLinkClick}
                >
                  <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                    <HiCalendarDays />
                    Orar Studenți
                  </div>
                </Sidebar.Item>
              </a>
            </Link>

            <Link href="/orarprof" passHref legacyBehavior>
              <a className="block w-full">
                <Sidebar.Item
                    as="div"
                    className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                    onClick={handleLinkClick}
                >
                  <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                    <HiCalendarDays />
                    Orar Profesori
                  </div>
                </Sidebar.Item>
              </a>
            </Link>

            <Link href="/orarsali" passHref legacyBehavior>
              <a className="block w-full">
                <Sidebar.Item
                    as="div"
                    className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                    onClick={handleLinkClick}
                >
                  <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                    <HiCalendarDays />
                    Orar Săli
                  </div>
                </Sidebar.Item>
              </a>
            </Link>

            <Link href="/Rezervare" passHref legacyBehavior>
              <a className="block w-full">
                <Sidebar.Item
                    as="div"
                    className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                    onClick={handleLinkClick}
                >
                  <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                    <HiPresentationChartBar />
                    Rezervare Săli
                  </div>
                </Sidebar.Item>
              </a>
            </Link>

            <Link href="/verificare" passHref legacyBehavior>
              <a className="block w-full">
                <Sidebar.Item
                    as="div"
                    className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                    onClick={handleLinkClick}
                >
                  <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                    <HiTicket />
                    Verificare Săli
                  </div>
                </Sidebar.Item>
              </a>
            </Link>

            <Link href="/autentificare" passHref legacyBehavior>
              <a className="block w-full">
                <Sidebar.Item
                    as="div"
                    className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                    onClick={handleLinkClick}
                >
                  <div className="flex items-center justify-between w-full px-4 py-2 cursor-pointer">
                    <HiArrowSmRight />
                    Sign In
                  </div>
                </Sidebar.Item>
              </a>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  );
}