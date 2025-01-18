import React, { useState, useEffect } from 'react';
import Select from 'react-select';

interface AutocompleteSelectProps {
    options: { label: string; value: number }[];
    onChange: (selectedValue: string) => void;
}

const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({ options, onChange }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [width, setWidth] = useState<number | undefined>(undefined);

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
        onChange(newValue);
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    useEffect(() => {
        const longestLabel = options.reduce((longest, option) =>
            option.label.length > longest.length ? option.label : longest, ''
        );

        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.style.whiteSpace = 'nowrap';
        tempDiv.textContent = longestLabel;
        document.body.appendChild(tempDiv);

        setWidth(tempDiv.clientWidth + 40);

        document.body.removeChild(tempDiv);
    }, [options]);

    return (
        <div className="flex justify-center items-center pb-4 z-1000 w-full">
            <div style={{ width: width ? `${width}px` : '100%' }}>
                <Select
                    inputValue={inputValue}
                    onInputChange={handleInputChange}
                    options={filteredOptions}
                    onChange={(selectedOption) =>
                        selectedOption && onChange(selectedOption.label)}
                    isClearable
                    placeholder="Căutați sau selectați o opțiune!"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                        "control": (base) => ({
                            ...base,
                            width: '100%',
                            padding: '8px',
                            borderRadius: '8px',
                            borderColor: '#D1D5DB',
                            '&:hover': {
                                borderColor: '#3B82F6',
                            },
                            boxShadow: 'none',
                            backgroundColor: 'var(--select-bg-light)',
                            color: 'var(--select-text-light)',
                            paddingLeft: '12px',
                            paddingRight: '12px',
                        }),
                        "option": (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#E0F2FE' : 'white',
                            color: state.isSelected ? 'white' : 'black',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            '&:active': {
                                backgroundColor: '#2563EB',
                            },
                        }),
                        "placeholder": (base) => ({
                            ...base,
                            color: '#9CA3AF',
                            fontStyle: 'italic',
                            textAlign: 'center',
                        }),
                    }}
                />
            </div>
        </div>
    );
};

export default AutocompleteSelect;
