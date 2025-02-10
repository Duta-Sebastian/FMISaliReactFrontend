"use client";
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import { ro } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import {DateRange} from "@/types/dateRange";
import FilterMenu from "@/components/FilterRoomsMenu";
import {roomFilter} from "@/types/roomFilter";

interface DateTimePeriodPickerProps {
    onChange: (dateRange: DateRange, filter: roomFilter | null) => void;
}

const DateTimePeriodPicker: React.FC<DateTimePeriodPickerProps> = ({ onChange }) => {
    const [startDateTime, setStartDateTime] = useState<Date | null>(null);
    const [period, setPeriod] = useState(60);
    const [roomFilter, setRoomFilter] = useState<roomFilter | null>(null);

    const handlePeriodChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPeriod = parseInt(e.target.value, 10);
        setPeriod(selectedPeriod);
    };

    const filterTimes = (time: Date) => {
        const hours = time.getHours();
        return hours >= 8 && hours <= 21;
    }

    useEffect(() => {
        if (!startDateTime || !roomFilter) return;
        const endDateTime = new Date((startDateTime as Date).getTime() + period * 60000);
        onChange({ start: startDateTime, end: endDateTime }, roomFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDateTime, period, roomFilter]);

    return (
        <div className="p-4 space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Select Date and Start Time</label>
                <DatePicker
                    selected={startDateTime}
                    onChange={setStartDateTime}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="d MMMM yyyy, hh:mm"
                    className="border p-2 rounded"
                    filterTime={filterTimes}
                    locale={ro}
                />
            </div>

            <div className="flex items-center gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Select Period</label>
                    <select
                        value={period}
                        onChange={handlePeriodChange}
                        className="border p-2 rounded"
                    >
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1.5 hours</option>
                        <option value={120}>2 hours</option>
                    </select>
                </div>

                <div className="flex justify-center flex-1">
                    <FilterMenu onFilterChange={setRoomFilter} />
                </div>
            </div>
        </div>

    );
};

export default DateTimePeriodPicker;