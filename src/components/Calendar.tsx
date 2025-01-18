import React, {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AutocompleteSelect from "./AutocompleteSelect";
import useFetchRooms from "@/hooks/useFetchRooms";
import FilterMenu from "@/components/FilterRoomsMenu";

interface Event {
    title: string;
    start: string;
    end: string;
}

const CalendarWithRoom: React.FC = () => {
    const { rooms, loading, error } = useFetchRooms();
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [pageWidth, setPageWidth] = useState<number>(900);
    const [pageHeight, setPageHeight] = useState<number>(600);
    const [, setIsResized] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;

                setPageWidth(Math.min(containerWidth * 0.9, 1200));
                setPageHeight(Math.min(containerHeight * 0.8, 800));

                setIsResized(true);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            const {current} = containerRef;
            if (!current) {
                return;
            }
            resizeObserver.unobserve(current);
        };
    }, []);

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

    const handleRoomChange = (room: string) => {
        setSelectedRoom(room);
        console.log("Selected Room:", room);
    };

    if (loading) return <p className="text-center text-lg">Loading rooms...</p>;
    if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

    return (
        <div
            className="relative flex flex-col justify-center items-center h-full
             w-full bg-background-light dark:bg-background-dark overflow-hidden"
            ref={containerRef}
        >
            <div className="absolute top-0 left-0 w-full z-10 pt-2 flex justify-center align-middle">
                {rooms.length > 0 && (
                    <div className="flex items-center space-x-4">
                        <AutocompleteSelect
                            options={rooms.map((room) => ({
                                label: room.label,
                                value: room.value,
                            }))}
                            onChange={handleRoomChange}
                        />

                        <div className="relative">
                            <FilterMenu />
                        </div>
                    </div>
                )}
            </div>

            <div
                className="absolute mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
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
                    eventClassNames="bg-blue-500 text-white font-semibold rounded-lg shadow-md"
                    eventContent={(arg) => (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgb(59, 130, 246)",
                                color: "white",
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
                />
            </div>
        </div>
    );
};

export default CalendarWithRoom;
