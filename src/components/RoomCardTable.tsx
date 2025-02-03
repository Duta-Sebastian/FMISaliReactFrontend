import React from "react";
import RoomCard from "./RoomCard";

interface Room {
    name: string;
    type: string;
    capacity: number;
    facilities: string[];
}

interface RoomTableProps {
    rooms: Room[] | null;
}

const RoomTable: React.FC<RoomTableProps> = ({ rooms }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {rooms ? (
                rooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        name={room.name}
                        type={room.type}
                        capacity={room.capacity}
                        facilities={room.facilities}
                    />
                ))
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default RoomTable;
