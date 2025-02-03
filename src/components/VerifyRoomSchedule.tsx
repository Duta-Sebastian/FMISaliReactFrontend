"use client";
import DateTimeRangePicker from "@/components/DateTimeRangePicker";
import RoomTable from "@/components/RoomCardTable";
import {useState} from "react";
import useFetchAvailableRooms from "@/hooks/useFetchAvailableRooms";
import {DateRange} from "@/types/dateRange";

export default function VerificareSali () {
    const [dateRange, setDateRange] = useState<DateRange | null>(null);
    const {availableRooms} = useFetchAvailableRooms(dateRange);

    const hello = (newDateRange: DateRange) => {
        setDateRange(newDateRange);
    }
    return (
        <div>
            <div className="flex items-center justify-center w-full">
                <DateTimeRangePicker
                    onChange={hello}
                />
            </div>
            <div className="flex justify-center items-center">
                <RoomTable rooms={availableRooms} />
            </div>
        </div>
    )
}