"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AutocompleteSelect from "./AutocompleteSelect";
import useFetchRooms from "@/hooks/useFetchRooms";
import FilterMenu from "@/components/FilterRoomsMenu";
import {roomFilters} from "@/types/roomFilters";

interface Event {
    title: string;
    start: string;
    end: string;
}

const CalendarWithRoom: React.FC = () => {
    const [filters, setFilters] = useState<roomFilters | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [pageWidth,] = useState<number>(900);
    const [pageHeight,] = useState<number>(600);
    const containerRef = useRef<HTMLDivElement>(null);
    const rooms = useFetchRooms(filters);
    const changeFilters = useCallback((roomFilters: roomFilters) => {
        setFilters(roomFilters);
    }, []);

    const handleRoomChange = (room: string) => {
        setSelectedRoom(room);
        console.log("Selected Room:", room);
    };

    useEffect(() => {
        if (selectedRoom) {
            const roomEvents: Event[] = [
                {
                    title: `${selectedRoom} Event 1`,
                    start: "2025-01-20T08:00:00",
                    end: "2025-01-20T10:00:00",
                },
                {
                    title: `${selectedRoom} Event 2`,
                    start: "2025-01-21T09:00:00",
                    end: "2025-01-21T11:00:00",
                },
            ];
            setEvents(roomEvents);
        }
    }, [selectedRoom]);

    return (
        <div
            className="relative flex flex-col justify-center items-center
             bg-background-light dark:bg-background-dark"
            ref={containerRef}
        >
            <div className="top-0 left-0 w-full pt-2 flex justify-center align-middle">
                    <div className="flex items-center space-x-4">
                        <AutocompleteSelect
                            options={rooms.map((room) => ({
                                label: room.label,
                                value: room.value,
                            }))}
                            onChange={handleRoomChange}
                        />

                        <div>
                            <FilterMenu
                            onFilterChange={changeFilters}/>
                        </div>
                    </div>
            </div>

            <div
                className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                style={{
                    width: `${pageWidth}px`,
                    height: `${pageHeight}px`,
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    events={events}
                    height="100%"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "timeGridDay,timeGridWeek",
                    }}
                    slotMinTime="08:00:00"
                    slotMaxTime="22:00:00"
                    slotDuration="00:30:00"
                    eventResizableFromStart={false}
                    eventClassNames="h-full w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md dark:bg-blue-700 dark:text-gray-100"
                    eventContent={(arg) => (
                        <div
                            className="w-full h-full flex justify-center items-center bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-100"
                            style={{
                                borderRadius: "0.5rem",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            }}
                        >
                            {arg.event.title}
                        </div>
                    )}
                    locale="ro-RO"
                    eventBackgroundColor="rgb(59, 130, 246)"
                    eventBorderColor="rgb(29, 78, 216)"
                    eventTextColor="white"
                    eventOverlap={false}
                    allDaySlot={false}
                    firstDay={1}
                    dayHeaderClassNames="dark:text-white"
                />
            </div>
        </div>
    );
};

export default CalendarWithRoom;
