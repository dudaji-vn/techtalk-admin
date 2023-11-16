import React, { useState, useRef, useEffect } from "react";
import { overrideTailwindClasses } from "tailwind-override";

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

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  className,
  onChange,
  defaultValue,
}) => {
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
      const selectedOption = options.find((item) =>
        [item.value, item.label].includes(defaultValue)
      );
      if (selectedOption) {
        setSelectedValue(selectedOption);
      }
    }
  }, [defaultValue]);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={overrideTailwindClasses(`mb-6 ${className}`)}
      ref={dropdownRef}
    >
      <label className="mb-2 flex justify-between text-xs font-bold">
        {label}
      </label>
      <div className="relative z-20 bg-white dark:bg-form-input">
        <div
          className="relative z-20 w-full rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedValue.label}
          <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill="#637381"
                ></path>
              </g>
            </svg>
          </span>
        </div>
        {isOpen && (
          <div className="max-h-[300px] w-full overflow-y-auto absolute left-0 mt-2 bg-white dark:bg-form-input border border-stroke rounded">
            {options.map((option) => (
              <div
                key={option.value}
                className={overrideTailwindClasses(
                  `py-2 px-4 cursor-pointer transition hover:bg-primary hover:text-white ${
                    option.value === selectedValue.value &&
                    "text-white bg-primary"
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
