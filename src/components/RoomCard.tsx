import React from "react";
import {RoomCardProp} from "@/types/roomCardProp";

const RoomCard: React.FC<RoomCardProp> = ({ name, type, capacity, facilities }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-80 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-600">{type}</p>

            <div className="mt-3">
                <p className="text-gray-700 font-medium">
                    Capacity: <span className="font-semibold">{capacity} people</span>
                </p>
            </div>

            <div className="mt-3">
                <h3 className="text-gray-700 font-medium">Facilities:</h3>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                    {facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoomCard;
