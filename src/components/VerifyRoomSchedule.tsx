"use client";
import DateTimeRangePicker from "@/components/DateTimeRangePicker";
import RoomTable from "@/components/RoomCardTable";
import {useState} from "react";
import useFetchAvailableRooms from "@/hooks/useFetchAvailableRooms";
import {DateRange} from "@/types/dateRange";
import {roomFilter} from "@/types/roomFilter";

export default function VerificareSali () {
    const [dateRange, setDateRange] = useState<DateRange | null>(null);
    const [roomFilter, setRoomFilter] = useState<roomFilter | null>(null);
    const {availableRooms} = useFetchAvailableRooms(dateRange, roomFilter);

    const handleDateRangeAndFilterChange= (newDateRange: DateRange, newFilter: roomFilter | null) => {
        console.log(newDateRange.start);
        setDateRange(newDateRange);
        setRoomFilter(newFilter);
    }
    return (
        <div>
            <div className="flex items-center justify-center w-full">
                <DateTimeRangePicker
                    onChange={handleDateRangeAndFilterChange }
                />
            </div>
            <div className="flex justify-center items-center">
                <RoomTable rooms={availableRooms} />
            </div>
        </div>
    )
}