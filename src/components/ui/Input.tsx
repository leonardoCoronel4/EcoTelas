import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

interface IInputProps {
    type: 'text' | 'number' | 'email' | 'password' | 'tel';
    name: string;
    step?: number;
    placeholder?: string;
    className?: string;
    error?: string;
    register: ReturnType<typeof useForm>['register'];
}

const Input: React.FC<IInputProps> = ({ type, name, placeholder, className, error, register, step }) => {
    return (
        <div>
            <input
                type={type}
                step={step ? step : undefined}
                placeholder={placeholder}
                className={`form-control ${className} ${error ? 'is-invalid' : ''}`}
                {...register(name)}
            />
            {error && typeof error === 'string' && <span className="error">{error}</span>}
        </div>
    );
};

export default Input;