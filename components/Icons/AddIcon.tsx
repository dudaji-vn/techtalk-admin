import React from 'react';

interface IAddIconProps {
  color?: string;
}
const AddIcon = ({ color }: IAddIconProps) => {
  return (
    <div className="cursor-pointer">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.00001 3.33337V12.6667M3.33334 8.00004H12.6667"
          stroke={color ?? 'white'}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default AddIcon;
