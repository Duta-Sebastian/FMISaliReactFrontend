import { useEffect, useState } from "react";

export const useFetchPDF = (fileId: number) => {
    const [PDFUrl, setPDFUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchPDF = async () => {
            try {
                const response = await fetch(`https://localhost:7057/api/files/download/${fileId}`);
                if (!response.ok) {
                    console.error("Failed to fetch PDF. Status: ", response.status);
                    return;
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setPDFUrl(url);
            }
            catch (error) {
                console.log("Error fetching PDF: ", error);
            }
        }
        fetchPDF().then(() => console.log("Successfully fetched PDF"));
    }, [fileId]);
    return PDFUrl;
};