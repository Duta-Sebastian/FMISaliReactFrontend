import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar"
import { Providers } from "@/components/Providers";
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
  title: "FMI - Orare și Săli",
  description: "Accesează orarele și informațiile despre sălile de curs pentru" +
      " Facultatea de Matematică și Informatică (FMI). Găsește detalii actualizate" +
      " despre programul cursurilor și locațiile acestora.\"\n",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
