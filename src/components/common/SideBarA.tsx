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
              <Sidebar.Item
                  as="div"
                  className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                  onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center w-full px-4 py-2 cursor-pointer">
                  <HiHome className="mr-2" />
                  Home
                </div>
              </Sidebar.Item>
            </Link>

            <Link href="/orarstud" passHref legacyBehavior>
              <Sidebar.Item
                  as="div"
                  className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                  onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center w-full px-4 py-2 cursor-pointer">
                  <HiCalendarDays className="mr-2" />
                  Orar Studenți
                </div>
              </Sidebar.Item>
            </Link>

            <Link href="/orarprof" passHref legacyBehavior>
              <Sidebar.Item
                  as="div"
                  className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                  onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center w-full px-4 py-2 cursor-pointer">
                  <HiCalendarDays className="mr-2" />
                  Orar Profesori
                </div>
              </Sidebar.Item>
            </Link>

            <Link href="/orarsali" passHref legacyBehavior>
              <Sidebar.Item
                  as="div"
                  className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                  onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center w-full px-4 py-2 cursor-pointer">
                  <HiCalendarDays className="mr-2" />
                  Orar Săli
                </div>
              </Sidebar.Item>
            </Link>

            <Link href="/Rezervare" passHref legacyBehavior>
              <Sidebar.Item
                  as="div"
                  className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                  onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center w-full px-4 py-2 cursor-pointer">
                  <HiPresentationChartBar className="mr-2" />
                  Rezervare Săli
                </div>
              </Sidebar.Item>
            </Link>

            <Link href="/verificare" passHref legacyBehavior>
              <Sidebar.Item
                  as="div"
                  className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                  onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center w-full px-4 py-2 cursor-pointer">
                  <HiTicket className="mr-2" />
                  Verificare Săli
                </div>
              </Sidebar.Item>
            </Link>

            <Link href="/autentificare" passHref legacyBehavior>
              <Sidebar.Item
                  as="div"
                  className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                  onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center w-full px-4 py-2 cursor-pointer">
                  <HiArrowSmRight className="mr-2" />
                  Sign In
                </div>
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  );
}
