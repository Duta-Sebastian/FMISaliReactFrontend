import React, {useState} from "react";
import { RoomCardProp } from "@/types/roomCardProp";
import Modal from "@/components/Modal";
import FullCalendarWrapper from "@/components/FullCalendarWrapper";
import useFetchRoomSchedule from "@/hooks/useFetchRoomSchedule";

const RoomCard: React.FC<RoomCardProp> = ({ name, type, capacity, facilities }) => {
    const [showButtons, setShowButtons] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { events } = useFetchRoomSchedule(name);
    return (
        <div>
            <div
                className="relative bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 w-80 border border-gray-200 dark:border-gray-700 transition-all duration-300"
                onMouseEnter={() => setShowButtons(true)}
                onMouseLeave={() => setShowButtons(false)}
                onClick={() => setShowButtons(prev => !prev)}
            >
                <div className="transition-all duration-200">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{type}</p>

                    <div className="mt-3">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                            Capacitate: <span className="font-semibold">{capacity} { capacity == 1 ? "om" : "oameni"}</span>
                        </p>
                    </div>

                    <div className="mt-3">
                        <h3 className="text-gray-700 dark:text-gray-300 font-medium">Facilități:</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                            {facilities.map((facility, index) => (
                                <li key={index}>{facility}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div
                    className={`absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2 transition-all duration-200 ${
                        showButtons ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                >
                    <button
                        className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 dark:hover:bg-blue-700 transition-all"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Orar
                    </button>
                    <button
                        className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 dark:hover:bg-green-700 transition-all"
                    >
                        Rezervare
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Orarul sălii {name}</h2>
                <FullCalendarWrapper events={events} />
            </Modal>
        </div>
    );
};

export default RoomCard;
