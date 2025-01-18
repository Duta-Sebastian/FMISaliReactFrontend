import React from "react";
import PDFTimetableButtons from "@/components/PDFTimetableButtons";

export default function Home() {
    return (
        <div suppressHydrationWarning={true}>
            <PDFTimetableButtons />
        </div>
    );
}
