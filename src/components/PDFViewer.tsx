'use client';

import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useFetchPDF } from '@/hooks/useFetchPDF';
import { usePdfTitles } from '@/hooks/useTitlesPDF';
import AutocompleteSelect from "@/components/AutocompleteSelect";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PdfProps {
    fileId: number;
    getTitle: boolean;
}

export default function PdfReactPdf({ fileId, getTitle }: PdfProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pdfUrl = useFetchPDF(fileId);
    const titles = usePdfTitles(pdfUrl);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        console.log("Page loaded");
    }

    const goToPage = (page: string) => {
        const pageNum = Array.from(titles.entries())
            .find(([, title]) => title.toLowerCase() === page.toLowerCase())?.[0];
        if (pageNum) {
            setPageNumber(pageNum);
        }
    };

    const prevPage = () => {
        setPageNumber((prevPage) => (prevPage === 1 ? (numPages || 1) : prevPage - 1));
    };

    const nextPage = () => {
        setPageNumber((prevPage) => (prevPage === (numPages || 1) ? 1 : prevPage + 1));
    };

    if (!pdfUrl) {
        return <div>Loading PDF...</div>;
    }

    return (
        <div className="relative flex justify-center items-center h-screen w-full bg-background-light dark:bg-background-dark p-4">
            <div className="absolute top-0 left-0 w-full z-10 pt-2">
                {getTitle && titles.size > 0 && (
                    <AutocompleteSelect
                        options={Array.from(titles.entries()).map(([key, value]) => ({
                            label: value,
                            value: key,
                        }))}
                        onChange={goToPage}
                    />
                )}

                <div className="flex justify-center mb-4 space-x-4">
                    <button
                        onClick={prevPage}
                        className="p-2 bg-primary text-button-text rounded-lg border
                         border-button-border-color dark:bg-primary-dark
                          dark:border-button-border-color dark:text-button-text
                           hover:bg-primary-hover dark:hover:bg-primary-dark-hover"
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextPage}
                        className="p-2 bg-primary text-button-text rounded-lg border border-button-border-color dark:bg-primary-dark dark:border-button-border-color dark:text-button-text hover:bg-primary-hover dark:hover:bg-primary-dark-hover"
                    >
                        Next
                    </button>
                </div>
            </div>

            <div
                className="my-react-pdf w-full max-w-7xl"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    pointerEvents: 'auto',
                }}
            >
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={900}
                            renderAnnotationLayer={true}
                            renderTextLayer={true}
                        />
                    </div>
                </Document>
                <div className="flex justify-center items-center mt-4">
                    <p className="text-text-light dark:text-text-dark text-lg font-medium">
                        Page {pageNumber} of {numPages}
                    </p>
                </div>
            </div>
        </div>
    );
}
