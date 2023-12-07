import React, { ReactNode, InputHTMLAttributes } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<IInputProps> = ({ icon, placeholder, className, ...rest }) => {
  return (
    <div className="min-w-[320px] flex items-center relative ">
      {icon && <div className="absolute left-2 ">{icon}</div>}
      <input
        className={overrideTailwindClasses(
          `pl-8 w-full rounded-lg border border-stroke bg-white py-[10px]  font-medium outline-none focus:border-green active:border-green disabled:cursor-default  ${className}`
        )}
        type="text"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
