'use client'

import { ThemeProvider } from 'next-themes'
import React from "react";
import {AuthProvider} from "@/components/AuthProvider";
import {UserProvider} from "@/components/UserContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
            <AuthProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}