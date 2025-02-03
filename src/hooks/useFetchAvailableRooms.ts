import {useEffect, useState} from "react";
import {RoomCardProp} from "@/types/roomCardProp";
import {DateRange} from "@/types/dateRange";
import {transformFacilitiesToNL} from "@/utils/facilitiesNameTransform";

const useFetchAvailableRooms = (dateRange: DateRange | null) => {
    const [availableRooms, setAvailableRooms] = useState<RoomCardProp[] | null>(null);

    useEffect(() => {
        const fetchAvailableRooms = async () => {
            if (!dateRange) return;
            try {
                console.log(dateRange);
                const response = await fetch(`https://localhost:7057/api/schedule/` +
                    `availableRoomsOnDate?startDate=${dateRange.start.toISOString()}` +
                    `&endDate=${dateRange.end.toISOString()}`)
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
    },[dateRange]);

    return {availableRooms};
}

export default useFetchAvailableRooms;