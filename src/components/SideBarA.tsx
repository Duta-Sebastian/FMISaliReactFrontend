"use client";

import { Sidebar } from "flowbite-react";
import {HiArrowSmRight, HiHome, HiPresentationChartBar, HiTicket} from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";
import Link from "next/link";
import {AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from "@azure/msal-react";
import {loginRequest} from "@/auth/authConfig";

interface SideBarProps {
  setIsOpenAction: (isOpen: boolean) => void;
}

export default function SideBarAPP({ setIsOpenAction }: SideBarProps) {
  const handleLinkClick = () => {
    setIsOpenAction(false);
  };

  const { instance, accounts } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleLoginRedirect = () => {
    instance
        .loginPopup({
          ...loginRequest,
          prompt: 'create',
        })
        .catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
      account: accounts[0],
    });
    window.location.reload();
  }

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

            <div>
              <Sidebar.Item
                  as="div"
                  className="text-lg hover:bg-gray-400 dark:hover:bg-gray-700"
                  onClick={handleLinkClick}
              >
                <AuthenticatedTemplate>
                  {activeAccount ? (
                      <div
                          className="flex items-center justify-center w-full px-4 py-2 cursor-pointer"
                          onClick={handleLogoutRedirect}
                      >
                        <HiArrowSmRight className="mr-2" />
                        Log Out
                      </div>
                  ) : null}
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  <div
                      className="flex items-center justify-center w-full px-4 py-2 cursor-pointer"
                      onClick={handleLoginRedirect}
                  >
                    <HiArrowSmRight className="mr-2" />
                    Sign In
                  </div>
                </UnauthenticatedTemplate>
              </Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
  );
}
