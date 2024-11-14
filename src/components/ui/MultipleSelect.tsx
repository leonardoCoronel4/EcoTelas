import React, { useCallback, useMemo, useState } from 'react';

interface ISelectProps {
    name: string;
    options: { value: string; label: string }[];
    value?: { value: string; label: string }[];
    onChange?: (selectedOptions: string[]) => void;
    className?: string;
    error?: string;
}

const MultipleSelect: React.FC<ISelectProps> = ({ name, options, value = [], onChange, className, error }) => {
    const [selectedOptions, setSelectedOptions] = useState<{ value: string; label: string }[]>(value);

    const availableOptions = useMemo(() => {
        return options.filter(
            (option) => !selectedOptions.some((selected) => selected.value === option.value)
        );
    }, [selectedOptions, options]);

    const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedOption = options.find(option => option.value === selectedValue);

        if (selectedOption && !selectedOptions.some(option => option.value === selectedOption.value)) {
            const newSelectedOptions = [
                ...selectedOptions,
                { value: selectedValue, label: selectedOption.label }
            ];

            const selectedOptionsMap = [
                ...selectedOptions.map(option => option.value),
                selectedValue
            ];
            setSelectedOptions(newSelectedOptions);

            if (onChange) {
                onChange(selectedOptionsMap);
            }
        }
    }, [options, selectedOptions, onChange]);

    const handleRemove = (value: string) => {
        setSelectedOptions(selectedOptions.filter((item) => item.value !== value));
    };

    return (
        <div>
            <div className={`rounded-2 d-flex mb-1 bg-white ${className}`} style={{ border: `1px solid ${error ? 'red' : 'gray'}`, minHeight: '48px' }}>
                {selectedOptions.map((selectedValue) => {
                    return (
                        <div key={selectedValue.value} className="m-1 p-1 rounded-3" style={{ border: `1px solid gray`, minHeight: '15px', backgroundColor: '#e9e3d0' }}>
                            <span>{selectedValue.label}</span>
                            <button
                                type="button"
                                className='border-0 bg-transparent'
                                onClick={() => handleRemove(selectedValue.value)}
                            >
                                ❌
                            </button>
                        </div>
                    );
                })}
            </div>
            <select
                name={name}
                value={''}
                onChange={handleSelect}
                className={`form-control ${className} ${error ? 'is-invalid' : ''}`}
            >
                <option value="" disabled>Seleccione una opción</option>
                {availableOptions.map((option) => (
                    <option key={option.value} value={option.value} label={option.label}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default MultipleSelect;