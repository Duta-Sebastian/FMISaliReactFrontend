import { useEffect, useState } from "react";
import {roomFilters} from "@/types/roomFilters";
import {transformNLToFacilities} from "@/utils/facilitiesNameTransform";

interface Room {
    label: string;
    value: number;
}

const useFetchRooms = (props: roomFilters | null = null) => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            console.log(props);
            try {
                let response: Response;
                if (!props) {
                    console.log("No filters provided. Fetching all rooms.");
                    response = await fetch('https://localhost:7057/api/rooms/getAllRooms');
                }
                else {
                    const {minCapacity, maxCapacity, Facilities} = props as roomFilters;
                    const facilitiesArray = transformNLToFacilities(Array.from(Facilities));
                    const requestBody = {
                        minCapacity,
                        maxCapacity,
                        Facilities: facilitiesArray,
                    };

                    response = await fetch('https://localhost:7057/api/rooms/getFilteredRooms', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    });
                }

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
                console.error(error);
            }
        };
        fetchRooms();
    }, [props])

    return rooms;
};

export default useFetchRooms;