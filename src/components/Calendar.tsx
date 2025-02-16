"use client";

import React, {useCallback, useRef, useState} from "react";
import AutocompleteSelect from "./AutocompleteSelect";
import useFetchRooms from "@/hooks/useFetchRooms";
import FilterMenu from "@/components/FilterRoomsMenu";
import {roomFilter} from "@/types/roomFilter";
import useFetchRoomSchedule from "@/hooks/useFetchRoomSchedule";
import FullCalendarWrapper from "@/components/FullCalendarWrapper";

const CalendarWithRoom: React.FC = () => {
    const [filters, setFilters] = useState<roomFilter | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const {events} = useFetchRoomSchedule(selectedRoom);
    const [pageWidth,] = useState<number>(900);
    const [pageHeight,] = useState<number>(600);
    const containerRef = useRef<HTMLDivElement>(null);
    const rooms = useFetchRooms(filters);
    const changeFilters = useCallback((roomFilters: roomFilter) => {
        setFilters(roomFilters);
    }, []);

    const handleRoomChange = (room: string) => {
        if (selectedRoom === room)
            return;
        setSelectedRoom(room);
    };

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
                {events ? <FullCalendarWrapper events={events} /> : <div />}
            </div>
        </div>
    );
};

export default CalendarWithRoom;
