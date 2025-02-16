import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";
import {CalendarEvent} from "@/types/calendarEvent";

interface FullCalendarWrapperProps {
    events: CalendarEvent[];
}

const FullCalendarWrapper: React.FC<FullCalendarWrapperProps> = ({ events }) => {
    return (
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
            timeZone="local"
            locale="RO-ro"
            eventBackgroundColor="rgb(59, 130, 246)"
            eventBorderColor="rgb(29, 78, 216)"
            eventTextColor="white"
            eventOverlap={false}
            allDaySlot={false}
            firstDay={1}
            dayHeaderClassNames="dark:text-white"
        />
    )
}

export default FullCalendarWrapper;