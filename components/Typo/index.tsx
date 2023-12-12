// TypoComponent.tsx

import React, { FC, HTMLProps } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';

interface TypoProps extends HTMLProps<HTMLParagraphElement> {
  type: 'xs' | 'small' | 'normal' | 'italic' | 'semi-bold' | '3xl';
}

const Typography: FC<TypoProps> = ({ type: typoStyle, children, ...rest }) => {
  let className = '';

  switch (typoStyle) {
    case 'xs':
      className = 'text-secondaryText text-xs';
      break;
    case 'small':
      className = 'text-sm';
      break;
    case 'normal':
      className = 'text-base font-normal';
      break;
    case 'italic':
      className = 'italic';
      break;
    case 'semi-bold':
      className = 'font-semibold';
      break;
    case '3xl':
      className = 'text-3xl font-semibold';
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
