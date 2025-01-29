"use client";

import PdfViewer from "@/components/PDFViewer";
import React from "react";

export default function orarStudenti() {
    return (
        <div className="relative -z-10">
            <PdfViewer fileId={1} getTitle={true}/>
        </div>
    )
}