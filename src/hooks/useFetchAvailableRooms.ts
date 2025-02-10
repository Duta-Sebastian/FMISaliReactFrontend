import {useEffect, useState} from "react";
import {RoomCardProp} from "@/types/roomCardProp";
import {DateRange} from "@/types/dateRange";
import {transformFacilitiesToNL, transformNLToFacilities} from "@/utils/facilitiesNameTransform";
import {roomFilter} from "@/types/roomFilter";

const useFetchAvailableRooms = (dateRange: DateRange | null, roomFilter: roomFilter | null = null) => {
    const [availableRooms, setAvailableRooms] = useState<RoomCardProp[] | null>(null);

    useEffect(() => {
        const fetchAvailableRooms = async () => {
            if (!dateRange || !roomFilter) return;
            roomFilter.Facilities = new Set(transformNLToFacilities(Array.from(roomFilter.Facilities)));
            try {
                const response = await fetch(`https://localhost:7057/api/schedule/availableRoomsOnDate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        startDate: dateRange.start.toISOString(),
                        endDate: dateRange.end.toISOString(),
                        roomFilter: {
                            minCapacity: roomFilter.minCapacity,
                            maxCapacity: roomFilter.maxCapacity,
                            Facilities: Array.from(roomFilter.Facilities),
                        },
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch available rooms.`);
                }
                const data = await response.json();
                const availableRooms: RoomCardProp[] = data.map((room: RoomCardProp) => ({
                    name: room.name,
                    type: room.type,
                    capacity: room.capacity,
                    facilities: room.facilities?.length ? transformFacilitiesToNL(room.facilities) : ['No facilities available']
                }));
                setAvailableRooms(availableRooms);
            }
            catch {
                console.error("Failed to fetch available rooms.");
                setAvailableRooms([]);
            }
        }
        fetchAvailableRooms();
    },[dateRange, roomFilter]);

    return {availableRooms};
}

export default useFetchAvailableRooms;