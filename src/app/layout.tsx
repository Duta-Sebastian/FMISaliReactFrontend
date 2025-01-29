import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar"
import { Providers } from "./providers";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FMI",
  description: "Generated by create next app",
  icons: {
    icon: "/FMI.png",  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased` }
        >
        <Providers>
            <NavBar/>
            <main>
                {children}
            </main>
        </Providers>
        </body>
    </html>
  );
}
