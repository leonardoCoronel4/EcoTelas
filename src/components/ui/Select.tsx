import React from 'react';

interface ISelectProps {
    name: string;
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    multiple?: boolean;
    className?: string;
    error?: string;
}

const Select: React.FC<ISelectProps> = ({ name, options, value, onChange, multiple, className, error }) => {
    return (
        <div className="select-group">
            <select
                name={name}
                value={value}
                onChange={onChange}
                multiple={multiple}
                className={`form-control ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default Select;