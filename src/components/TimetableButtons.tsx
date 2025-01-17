"use client";

import React from "react";
import PdfReactPdf from "@/components/PDFViewer";

export default function TimetableButtons() {
    const [fileId, setFileId] = React.useState<number>(1);
    const [selectedTimetable, setSelectedTimetable] = React.useState<string | null>("students");

    const selectTimetable = (timetable: string) => {
        if (selectedTimetable !== "students" && timetable === "students") {
            setSelectedTimetable(timetable);
            setFileId(1);
            return;
        }
        if (selectedTimetable !== "professors" && timetable === "professors") {
            setSelectedTimetable(timetable);
            setFileId(2);
            return;
        }
    };

    return (
        <div className="h-screen overflow-hidden">
            <div className="flex justify-center items-center space-x-4 mt-6 pb-2">
                <button
                    className="px-6 py-3 bg-blue-600 text-white font-medium text-lg
                     rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    onClick={() => selectTimetable("students")}
                >
                    Orar Studenți
                </button>
                <button
                    className="px-6 py-3 bg-green-600 text-white font-medium text-lg
                     rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    onClick={() => selectTimetable("professors")}
                >
                    Orar Profesori
                </button>
            </div>
            <PdfReactPdf fileId={fileId} getTitle={true} />
        </div>
    );
}
