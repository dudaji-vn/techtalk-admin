import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  styles?: 'primary' | 'secondary';
  variant?: 'text' | 'outlined' | 'contained';
}

const Button: React.FC<ButtonProps> = ({ children, icon, className, styles, variant, disabled, ...rest }) => {
  return (
    <button
      className={overrideTailwindClasses(`flex text-primary items-center px-4 py-[10px] rounded-lg font-semibold ${className} 
        ${styles === 'primary' && 'bg-primary text-white'}
        ${styles === 'secondary' && 'bg-secondary text-black'}
        ${disabled && 'bg-gray400 text-gray100 cursor-not-allowed'}
        `)}
      {...rest}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
