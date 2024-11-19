import React from 'react';
import { useForm } from 'react-hook-form';

interface IInputDateProps {
    type: 'date' | 'time';
    name: string;
    placeholder?: string;
    className?: string;
    error?: string;
    register: ReturnType<typeof useForm>['register'];
    min?: string;
    max?: string;
}

const InputDate: React.FC<IInputDateProps> = ({ name, placeholder, className, error, register, min, max, type }) => {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                className={`form-control ${className} ${error ? 'is-invalid' : ''}`
                }
                {...register(name)}
                min={min}
                max={max}
            />
            {error && typeof error === 'string' && <span className="error" > {error} </span>}
        </div>
    );
};

export default InputDate;
