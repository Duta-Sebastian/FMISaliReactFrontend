"use client";

import React from "react";
import PdfViewer from "@/components/PDFViewer";
import CalendarWithRoom from "@/components/Calendar";

enum ActiveView {
    OrarStudenti = 1,
    OrarProfesori,
    OrarSali
}

export default function PDFTimetableButtons() {
    const [fileId, setFileId] = React.useState<number>(1);
    const [activeView, setActiveView] = React.useState<ActiveView | null>(null);

    return (
        <div className="h-screen overflow-hidden">
            <div className="flex flex-wrap justify-center items-center gap-4 mt-6 pb-2">
                <button
                    className="px-6 py-3 bg-blue-600 text-white font-medium text-lg
                     rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    onClick={() => {
                        setActiveView(ActiveView.OrarStudenti);
                        setFileId(ActiveView.OrarStudenti)
                    }
                    }
                >
                    Orar Studenți
                </button>
                <button
                    className="px-6 py-3 bg-green-600 text-white font-medium text-lg
                     rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    onClick={() => {
                        setActiveView(ActiveView.OrarProfesori);
                        setFileId(ActiveView.OrarProfesori)
                    }
                    }
                >
                    Orar Profesori
                </button>
                <button
                    className="px-6 py-3 bg-purple-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                    onClick={() => setActiveView(ActiveView.OrarSali)}
                >
                    Orar Săli
                </button>
            </div>

            {activeView === ActiveView.OrarStudenti || activeView === ActiveView.OrarProfesori ? (
                <PdfViewer fileId={fileId} getTitle={false}/>
            ) : (
                <CalendarWithRoom/>
            )}
        </div>
    );
}
