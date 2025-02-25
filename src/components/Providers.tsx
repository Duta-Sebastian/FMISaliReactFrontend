'use client'

import { ThemeProvider } from 'next-themes'
import React from "react";
import {AuthProvider} from "@/components/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    )
}