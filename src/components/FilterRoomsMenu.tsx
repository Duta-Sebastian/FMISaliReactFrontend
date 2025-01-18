"use client";
import React, { useState, useEffect } from 'react';
import useFetchMinMaxCapacity from "@/hooks/useFetchMinMaxCapacity";

const useSelectOptions = () => {
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            const data = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
            setOptions(data);
        };

        fetchOptions();
    }, []);

    return options;
};

const FilterMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
    const {minCapacity, maxCapacity} = useFetchMinMaxCapacity();
    const [sliderValue, setSliderValue] = useState<number>(50);
    const [numberValue, setNumberValue] = useState<number>(50);
    const options = useSelectOptions();

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

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setSliderValue(value);
        setNumberValue(value);
    };

    useEffect(() => {
        if ( minCapacity !== null) {
            setSliderValue(minCapacity);
        }
    }, [minCapacity, maxCapacity]);

    return (
        <div>
            <button onClick={handleToggle}>
                {isOpen ? 'Close' : 'Open'} Menu
            </button>

            {isOpen && (
                <div>
                    <div>
                        <p>Select Options:</p>
                        {options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.has(option)}
                                        onChange={() => handleCheckboxChange(option)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <p>Adjust Value:</p>
                        <div>
                            {minCapacity !== null && maxCapacity !== null ? (
                            <input
                                type="range"
                                min={minCapacity}
                                max={maxCapacity}
                                value={sliderValue}
                                onChange={handleSliderChange}
                            /> ) : <div/> }
                        </div>
                        <span>{numberValue}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;
