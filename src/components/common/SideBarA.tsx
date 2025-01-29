"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiHome, HiPresentationChartBar, HiTicket } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";

export default function SideBarAPP() {
  return (
    <Sidebar aria-label="Meniu principal" className="bg-gray-200 dark:bg-gray-800">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiHome} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
            Home
          </Sidebar.Item>
          <Sidebar.Item href="/orarstud" icon={HiCalendarDays} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
            Orar Studenți
          </Sidebar.Item>
          <Sidebar.Item href="/orarprof" icon={HiCalendarDays} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
            Orar Profesori
          </Sidebar.Item>
          <Sidebar.Item href="/orarsali" icon={HiCalendarDays} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
            Orar Săli
          </Sidebar.Item>
          <Sidebar.Item href="/Rezervare" icon={HiPresentationChartBar} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
            Rezervare Săli
          </Sidebar.Item>
          <Sidebar.Item href="/verificare" icon={HiTicket} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
            Verificare Săli
          </Sidebar.Item>
          <Sidebar.Item href="/autentificare" icon={HiArrowSmRight} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
            Sign In
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}