import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const usePdfTitles = (pdfUrl: string | null) => {
    const [titles, setTitles] = useState<Map<number, string>>(new Map());

    useEffect(() => {
        const extractTitles = async () => {
            if (!pdfUrl) return;

            const pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
            const newTitles: Map<number, string> = new Map();

            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const textContent = await page.getTextContent();
                const textItems = textContent.items as TextItem[];

                const lastItem = textItems[textItems.length - 1]?.str;

                if (lastItem && lastItem.trim()) {
                    newTitles.set(i, lastItem.trim());
                }
            }

            setTitles(newTitles);
        };

        extractTitles().then(() => console.log("Titles mapped successfully."));
    }, [pdfUrl]);

    return titles;
};

export default usePdfTitles;