// TypoComponent.tsx

import React, { FC, HTMLProps } from "react";
import { overrideTailwindClasses } from "tailwind-override";

interface TypoProps extends HTMLProps<HTMLParagraphElement> {
  type: "xs" | "small" | "normal" | "italic" | "semi-bold" | "3xl";
}

const Typography: FC<TypoProps> = ({ type: typoStyle, children, className, ...rest }) => {
  let _className = "";

  switch (typoStyle) {
    case "xs":
      _className = "text-secondaryText text-xs";
      break;
    case "small":
      _className = "text-sm";
      break;
    case "normal":
      _className = "text-base font-normal";
      break;
    case "italic":
      _className = "italic";
      break;
    case "semi-bold":
      _className = "font-semibold";
      break;
    case "3xl":
      _className = "text-3xl font-semibold";
      break;

    default:
      break;
  }

  return (
    <p className={overrideTailwindClasses(`text-black text-lg ${_className} ${className}`)} {...rest}>
      {children}
    </p>
  );
};

export default Typography;
