"use client";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ro } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import {DateRange} from "@/types/dateRange";

interface DateTimePeriodPickerProps {
    onChange: (dateRange: DateRange) => void;
}

const DateTimePeriodPicker: React.FC<DateTimePeriodPickerProps> = ({ onChange }) => {
    const [startDateTime, setStartDateTime] = useState<Date | null>(null);
    const [period, setPeriod] = useState(60);

    const handlePeriodChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPeriod = parseInt(e.target.value, 10);
        setPeriod(selectedPeriod);
        if (!startDateTime) return;
        const endDateTime = new Date((startDateTime as Date).getTime() + period * 60000);
        onChange({ start: startDateTime, end: endDateTime });
    };

    const handleDateChange = (date: Date | null) => {
        setStartDateTime(date);
        if (!startDateTime) return;
        const endDateTime = new Date((startDateTime as Date).getTime() + period * 60000);
        onChange({ start: startDateTime, end: endDateTime });
    };

    const filterTimes = (time: Date) => {
        const hours = time.getHours();
        return hours >= 8 && hours <= 21;
    }

    return (
        <div className="p-4 space-y-4 align-items-center flex-wrap">
            <div>
                <label className="block text-sm font-medium mb-1">Select Date and Start Time</label>
                <DatePicker
                    selected={startDateTime}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="d MMMM yyyy, hh:mm"
                    className="border p-2 rounded"
                    filterTime={filterTimes}
                    locale={ro}
                />
            </div>

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
        </div>
    );
};

export default DateTimePeriodPicker;