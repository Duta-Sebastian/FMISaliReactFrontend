import {useEffect, useState} from "react";
import {CalendarEvent} from "@/types/calendarEvent";

const useFetchRoomSchedule = (roomName : string | null) => {
    const [scheduleEvents, setScheduleEvents] = useState<CalendarEvent[]>([]);
    useEffect(() => {
        const fetchRoomSchedule = async () => {
            if (!roomName) return;
            try {
                console.log("Fetching schedule", roomName);
                const encodedRoomName = encodeURIComponent(roomName);
                const response = await fetch(`https://localhost:7057/api/schedule/events?roomName=${encodedRoomName}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch rooms schedule");
                }
                const data = await response.json();
                if (data.length === 0) {
                    throw new Error("Failed to fetch rooms schedule");
                }
                const events: CalendarEvent[] = data.map((event: CalendarEvent) => ({
                    title: event.title,
                    start: event.start.toLocaleString(),
                    end: event.end.toLocaleString()
                }));
                console.log("Schedule events", events);
                setScheduleEvents(events);
            }
            catch {
                console.error("Failed to fetch rooms schedule");
                setScheduleEvents([]);
            }
        }
        fetchRoomSchedule();
    },[roomName]);
    return {events: scheduleEvents};
}

export default useFetchRoomSchedule;