import React, { useState, useEffect } from 'react';
import Select from 'react-select';

interface AutocompleteSelectProps {
    options: { label: string; value: number }[];
    onChange: (selectedValue: string) => void;
}

const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({ options, onChange }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [width, setWidth] = useState<number>(300);
    const [isReady, setIsReady] = useState<boolean>(false);

    const handleInputChange = (newValue: string) => {
        if (newValue === inputValue) return;
        setInputValue(newValue);
        onChange(newValue);
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    useEffect(() => {
        setIsReady(false);

        const calculateWidth = () => {
            const tempDiv = document.createElement('div');
            tempDiv.style.visibility = 'hidden';
            tempDiv.style.position = 'absolute';
            tempDiv.style.whiteSpace = 'nowrap';
            tempDiv.style.fontSize = '16px';
            document.body.appendChild(tempDiv);

            let maxWidth = 0;
            options.forEach((option) => {
                tempDiv.textContent = option.label;
                maxWidth = Math.max(maxWidth, tempDiv.offsetWidth);
            });
            document.body.removeChild(tempDiv);

            const screenWidth = window.innerWidth;
            if (screenWidth < 640) {
                setWidth(Math.min(maxWidth + 50, screenWidth * 0.9));
            } else if (screenWidth < 1024) {
                setWidth(Math.min(maxWidth + 50, 600));
            } else {
                setWidth(Math.min(maxWidth + 50, 800));
            }
        };

        calculateWidth();
        window.addEventListener('resize', calculateWidth);

        setIsReady(true);

        return () => {
            window.removeEventListener('resize', calculateWidth);
        };
    }, [options]);

    return (
        <div className="flex justify-center items-center pb-4 z-20 w-full">
            <div className="w-full max-w-lg flex justify-center items-center">
                {isReady ? (
                    <Select
                        inputValue={inputValue}
                        onInputChange={handleInputChange}
                        options={filteredOptions}
                        onChange={(selectedOption) =>
                            selectedOption && onChange(selectedOption.label)
                        }
                        isClearable
                        placeholder="Căutați sau selectați o opțiune!"
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: `${width}px`,
                                padding: '4px 12px',
                                borderRadius: '6px',
                                borderColor: '#D1D5DB',
                                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                backgroundColor: 'var(--select-bg-light)',
                                color: 'var(--select-text-light)',
                                justifyContent: 'center',
                                '&:hover': {
                                    borderColor: '#3B82F6',
                                },
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected
                                    ? '#3B82F6'
                                    : state.isFocused
                                        ? '#E0F2FE'
                                        : 'white',
                                color: state.isSelected ? 'white' : 'black',
                                padding: '10px',
                                borderRadius: '4px',
                                '&:active': {
                                    backgroundColor: '#2563EB',
                                },
                                justifyContent: 'center',
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: '#9CA3AF',
                                fontStyle: 'italic',
                                textAlign: 'center',
                            }),
                            valueContainer: (base) => ({
                                ...base,
                                justifyContent: 'center',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: 'var(--select-text-light)',
                            }),
                        }}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default AutocompleteSelect;