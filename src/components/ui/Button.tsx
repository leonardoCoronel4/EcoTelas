import React from 'react';

interface IButtonProps {
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<IButtonProps> = ({ type, onClick, children, className }) => {
    return (
        <button type={type} onClick={onClick} className={`btn ${className}`}>
            {children}
        </button>
    );
};

export default Button;