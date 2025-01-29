import React, {useState, useEffect, useRef} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useFetchMinMaxCapacity from '@/hooks/useFetchMinMaxCapacity';
import useFetchFacilities from '@/hooks/useFetchFacilities';
import {roomFilters} from "@/types/roomFilters";
import useOutsideClick from "@/hooks/useOutsideClick";

const FilterMenu: React.FC<{onFilterChange: (roomFilters : roomFilters) => void}> = ({onFilterChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
    const { minCapacity, maxCapacity } = useFetchMinMaxCapacity();
    const [range, setRange] = useState<number | number[]>();
    const [finalRange, setFinalRange] = useState<number | number[]>();
    const facilities = useFetchFacilities();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleToggle = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleCheckboxChange = (option: string) => {
        setSelectedOptions((prevSelected) => {
            const updated = new Set(prevSelected);
            if (updated.has(option)) {
                updated.delete(option);
            } else {
                updated.add(option);
            }
            return updated;
        });
    };

    const handleFilterReset = () => {
        setSelectedOptions(new Set());
        if (minCapacity !== null && maxCapacity !== null)
            setRange([minCapacity, maxCapacity]);
    }

    useEffect(() => {
        if (minCapacity !== null && maxCapacity !== null) {
            setRange([minCapacity, maxCapacity]);
        }
    }, [minCapacity, maxCapacity]);

    useOutsideClick(menuRef,buttonRef,setIsOpen);

    useEffect(() => {
        if (!finalRange) return;
        const [minCapacity, maxCapacity] = finalRange as number[];
        onFilterChange(
            {
            minCapacity:minCapacity,
            maxCapacity:maxCapacity,
            Facilities:selectedOptions
            });
    }, [finalRange, onFilterChange, selectedOptions]);

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                ref={buttonRef}
                className="p-2 bg-primary text-white rounded-lg focus:outline-none hover:bg-primary-dark transition-colors"
            >
                <div className="w-6 h-6 flex flex-col justify-between items-center">
                    <span className="block w-6 h-1 bg-white"></span>
                    <span className="block w-6 h-1 bg-white"></span>
                    <span className="block w-6 h-1 bg-white"></span>
                </div>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white
                 dark:bg-gray-800 shadow-lg rounded-md z-20"
                 ref={menuRef}>
                    <div className="p-4">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Select Options:
                        </p>
                        {facilities.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.has(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                    className="mr-2 form-checkbox h-5 w-5 text-primary rounded focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary"
                                />
                                <label className="text-gray-900 dark:text-gray-200">
                                    {option}
                                </label>
                            </div>
                        ))}
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                            Adjust Value:
                        </p>
                        <div className="mb-4">
                            {range !== undefined ? (
                                <Slider
                                    range
                                    min={minCapacity ?? 0}
                                    max={maxCapacity ?? 240}
                                    value={range}
                                    onChange={(newRange: number | number[]) => {
                                        setRange(newRange);
                                    }}
                                    onChangeComplete={(newRange: number | number[]) => setFinalRange(newRange)}
                                    styles={{
                                        track: {
                                            backgroundColor: '#3B82F6',
                                        },
                                        handle: {
                                            backgroundColor: '#3B82F6',
                                            borderColor: '#3B82F6',
                                        },
                                        rail: {
                                            backgroundColor: '#E5E7EB',
                                        },
                                    }}
                                />
                            ) : (
                                <div />
                            )}
                        </div>

                        <div className="flex items-center justify-center">
                            <p className="text-gray-900 dark:text-white">
                                Selected Range: {Array.isArray(range) ? range.join(' - ') : range}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="p-2 bg-primary rounded-lg focus:outline-none
                                hover:bg-primary-dark transition-colors text-gray-900 dark:text-white"
                                onClick={handleFilterReset}
                                >
                            Resetează filtrele
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;