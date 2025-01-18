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
    const { minCapacity, maxCapacity } = useFetchMinMaxCapacity();
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
        if (minCapacity !== null) {
            setSliderValue(minCapacity);
        }
    }, [minCapacity, maxCapacity]);

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className="p-2 bg-primary text-white rounded-lg focus:outline-none"
            >
                <div className="w-6 h-6 flex flex-col justify-between items-center">
                    <span className="block w-6 h-1 bg-white"></span>
                    <span className="block w-6 h-1 bg-white"></span>
                    <span className="block w-6 h-1 bg-white"></span>
                </div>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-fit bg-white shadow-lg rounded-md z-20">
                    <div className="pl-1 pr-1">
                        <p>Select Options:</p>
                        {options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.has(option)}
                                        onChange={() => handleCheckboxChange(option)}
                                        className="mr-2 ml-2"
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="pl-1 pr-1">
                        <p>Adjust Value:</p>
                        <div>
                            {minCapacity !== null && maxCapacity !== null ? (
                                <input
                                    type="range"
                                    min={minCapacity}
                                    max={maxCapacity}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                />
                            ) : (
                                <div />
                            )}
                        </div>
                        <div className=" flex items-center justify-center">
                            <p> {numberValue} </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;
