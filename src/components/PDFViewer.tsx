"use client";

import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Document, Page } from 'react-pdf';
import { useFetchPDF } from '@/hooks/useFetchPDF';
import usePdfTitles from '@/hooks/useTitlesPDF';
import AutocompleteSelect from "@/components/AutocompleteSelect";
import { useSwipeable } from 'react-swipeable';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PdfProps {
    fileId: number;
    getTitle: boolean;
}

export default function PdfViewer({ fileId, getTitle }: PdfProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageWidth, ] = useState<number>(900);
    const [pageHeight, ] = useState<number>(500);
    const [isTitlesReady, setIsTitlesReady] = useState(false);
    const pdfUrl = useFetchPDF(fileId);
    const titles = usePdfTitles(pdfUrl);
    const containerRef = useRef<HTMLDivElement>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        setPageNumber(1);
    }, [pdfUrl]);

    const goToPage = (page: string) => {
        const pageNum = Array.from(titles.entries())
            .find(([, title]) => title.toLowerCase() === page.toLowerCase())?.[0];
        if (pageNum) {
            setPageNumber(pageNum);
        }
    };

    const prevPage = useCallback(() => {
        setPageNumber((prevPage) => (prevPage === 1 ? (numPages || 1) : prevPage - 1));
    },[numPages]);

    const nextPage = useCallback(() => {
        setPageNumber((prevPage) => (prevPage === (numPages || 1) ? 1 : prevPage + 1));
    }, [numPages]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: nextPage,
        onSwipedRight: prevPage,
    });

    // Add keyboard event listener for arrow keys
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                prevPage();
            } else if (event.key === 'ArrowRight') {
                nextPage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [prevPage, nextPage]);

    useEffect(() => {
        if (titles && titles.size > 0) {
            setIsTitlesReady(true);
        }
    }, [titles]);

    return (
        <div
            {...swipeHandlers}
            className="flex flex-col justify-center items-center h-full w-full bg-background-light dark:bg-background-dark p-4 overflow-hidden"
            ref={containerRef}
        >
            {isTitlesReady ? (
                <>
                    {getTitle && titles.size > 0 && (
                        <div className="w-full mb-4 z-10">
                            <AutocompleteSelect
                                key={fileId}
                                options={Array.from(titles.entries()).map(([key, value]) => ({
                                    label: value,
                                    value: key,
                                }))}
                                onChange={goToPage}
                            />
                        </div>
                    )}

                    <div className="w-full flex justify-center items-center">
                        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                            {numPages ? (
                                <Page
                                    pageNumber={pageNumber}
                                    width={pageWidth}
                                    height={pageHeight}
                                    renderAnnotationLayer={true}
                                    renderTextLayer={true}
                                />
                            ) : (
                                <div className="flex justify-center items-center text-lg text-gray-600">
                                    Loading PDF...
                                </div>
                            )}
                        </Document>
                    </div>

                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            onClick={prevPage}
                            className="p-2 bg-primary text-button-text rounded-lg border border-button-border-color dark:bg-primary-dark dark:border-button-border-color dark:text-button-text hover:bg-primary-hover dark:hover:bg-primary-dark-hover"
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

                    <div className="flex justify-center items-center mt-4">
                        <p className="text-text-light dark:text-text-dark text-sm sm:text-lg font-medium">
                            Page {pageNumber} of {numPages}
                        </p>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center text-lg text-gray-600">Loading titles...</div>
            )}
        </div>
    );
}