import React, { useState, useRef, useEffect } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import ArrowDownIcon from '../Icons/ArrowDownIcon';

interface IOption {
  label: string;
  value: string;
}
interface DropdownProps {
  defaultValue?: string;
  label?: string;
  className?: string;
  options: IOption[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, className, onChange, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IOption>(options[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (option: IOption) => {
    setSelectedValue(option);
    onChange(option.value);
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (defaultValue) {
      const selectedOption = options.find((item) => [item.value, item.label].includes(defaultValue));
      if (selectedOption) {
        setSelectedValue(selectedOption);
      }
    }
  }, [defaultValue]);
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={overrideTailwindClasses(`${className}`)}>
      <label className=" flex justify-between text-xs font-bold">{label}</label>
      <div className="relative z-20 bg-white">
        <div
          className="z-20 w-11 h-11 flex items-center justify-center rounded border bg-primary outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input cursor-pointer"
          onClick={toggleDropdown}
        >
          <ArrowDownIcon />
        </div>
        {isOpen && (
          <div className="max-h-[300px] w-[120px] overflow-y-auto absolute right-0 mt-2 bg-white  border border-stroke rounded">
            {options.map((option) => (
              <div
                key={option.value}
                className={overrideTailwindClasses(
                  `cursor-pointer  p-2 transition hover:bg-sidebarHover hover:text-white ${
                    option.value === selectedValue.value && 'text-white bg-primary'
                  }`
                )}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
