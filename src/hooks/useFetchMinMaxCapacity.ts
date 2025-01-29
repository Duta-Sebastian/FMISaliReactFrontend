import { useEffect, useState } from "react";

const useFetchMinMaxCapacity = () => {
    const [minCapacity, setMinCapacity] = useState<number | null>(null);
    const [maxCapacity, setMaxCapacity] = useState<number | null>(null);

    useEffect(() => {
        const fetchMinMaxCapacity = async () => {
            try {
                const response = await fetch('https://localhost:7057/api/rooms/getMinMaxCapacity');
                if (!response.ok) {
                    throw new Error(`Failed to retrieve capacity. Status: ${response.statusText}`);
                }
                const data = await response.json();

                if (typeof data.minCapacity !== 'number' || typeof data.maxCapacity !== 'number') {
                    throw new Error("Invalid data format received from API.");
                }

                setMinCapacity(data.minCapacity);
                setMaxCapacity(data.maxCapacity);
            } catch (err: unknown) {
                console.error("Error fetching min/max capacity:", err);
            }
        };

        fetchMinMaxCapacity();
    }, []);
    return {minCapacity, maxCapacity};
};

export default useFetchMinMaxCapacity;
