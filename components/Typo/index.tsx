// TypoComponent.tsx

import React, { FC, HTMLProps } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

interface TypoProps extends HTMLProps<HTMLParagraphElement> {
  type: 'small' | 'normal' | 'italic' | 'semi-bold';
}

const Typography: FC<TypoProps> = ({ type: typoStyle, children, ...rest }) => {
  let className = '';

  switch (typoStyle) {
    case 'small':
      className = 'text-sm';
      break;
    case 'normal':
      className = 'font-normal';
      break;
    case 'italic':
      className = 'italic';
      break;
    case 'semi-bold':
      className = 'font-semibold';
      break;

    default:
      break;
  }

  return (
    <p className={overrideTailwindClasses(`text-black text-lg ${className}`)} {...rest}>
      {children}
    </p>
  );
};

export default Typography;
