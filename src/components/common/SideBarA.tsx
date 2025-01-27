"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiCalendar, HiChartPie, HiHome, HiInbox, HiPresentationChartBar, HiShoppingBag, HiTable, HiTicket, HiUser, HiViewBoards } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";

export default function SideBarAPP() {
  return (
    <Sidebar aria-label="Default sidebar example" className="bg-gray-200 dark:bg-gray-800">
  <Sidebar.Items>
    <Sidebar.ItemGroup>
      <Sidebar.Item href="/" icon={HiHome} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
        Home
      </Sidebar.Item>
      <Sidebar.Item href="/orarstud" icon={HiCalendarDays} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
        Orar Studenti
      </Sidebar.Item>
      <Sidebar.Item href="/orarprof" icon={HiCalendarDays} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
        Orar Profesori
      </Sidebar.Item>
      <Sidebar.Item href="/Rezervare" icon={HiPresentationChartBar} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
        Rezervare Sali
      </Sidebar.Item>
      <Sidebar.Item href="/verificare" icon={HiTicket} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
        Verificare Sali
      </Sidebar.Item>
      <Sidebar.Item href="/autentificare" icon={HiArrowSmRight} className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700">
        Sign In
      </Sidebar.Item>
    </Sidebar.ItemGroup>
  </Sidebar.Items>
</Sidebar>

  );
}