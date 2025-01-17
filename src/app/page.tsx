import React from "react";
import TimetableButtons from "@/components/TimetableButtons";

export default function Home() {
    return (
        <div suppressHydrationWarning={true}>
            <TimetableButtons />
        </div>
    );
}
