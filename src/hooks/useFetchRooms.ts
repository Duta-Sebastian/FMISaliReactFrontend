import { useEffect, useState } from "react";

interface Room {
    label: string;
    value: number;
}

const useFetchRooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('https://localhost:7057/api/rooms/getAllRooms');
                if (!response.ok) {
                    throw new Error(`Failed to fetch rooms. Status:  ${response.statusText}`);
                }
                const data = await response.json();
                const formattedRooms = data.map((room: { id: number; name: string }) => ({
                    label: room.name,
                    value: room.id,
                }));
                setRooms(formattedRooms);
            } catch (error) {
                setError(error instanceof Error ? error.message : `Unknown error: ${error}`);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms().then(() => console.log("Rooms fetched successfully."));
    }, [])

    return { rooms, loading, error };
};

export default useFetchRooms;