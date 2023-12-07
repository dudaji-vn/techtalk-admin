import React, { ReactNode } from 'react';

export interface ITabProps {
  label: string;
  children: ReactNode;
}

const Tab: React.FC<ITabProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Tab;
