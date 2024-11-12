import React from 'react';
import { useForm } from 'react-hook-form';

interface CheckboxProps {
    label: string;
    name: string;
    register: ReturnType<typeof useForm>['register'];
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, register }) => {
    return (
        <div className="flex flex-col">
            <label>
                <input
                    type="checkbox"
                    className="form-control"
                    {...register(name)}
                />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;