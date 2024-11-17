import React from 'react';
import { useForm } from 'react-hook-form';

interface CheckboxProps {
    label: string;
    name: string;
    className?: string;
    register: ReturnType<typeof useForm>['register'];
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, register, className }) => {
    return (
        <div className="d-flex  ">
            {label}
            <input
                type="checkbox"
                className={`${className}`}
                {...register(name)}
            />
        </div>
    );
};

export default Checkbox;