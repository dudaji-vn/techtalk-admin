import React, { useState } from "react";
import { ITabProps } from "../tab";
import { Box } from "@mui/material";

interface TabsProps {
  tabs: ITabProps[];
  handleTabClick?: (index: number) => void;
  indexActive?: number;
}

const Tabs: React.FC<TabsProps> = ({ tabs, handleTabClick, indexActive = 0 }) => {
  const [activeTab, setActiveTab] = useState(indexActive > 0 ? indexActive : 0);

  const _handleTabClick = (index: number) => {
    setActiveTab(index);
    handleTabClick && handleTabClick(index);
  };

  return (
    <div className="w-full flex">
      <Box
        sx={{
          height: "calc(100vh - 200px)",
        }}
        className="flex flex-col overflow-y-auto min-w-[270px]"
      >
        {tabs.map((tab, index) => {
          return (
            <div
              key={index}
              onClick={() => _handleTabClick(index)}
              className={`cursor-pointer text-sm text-left min-w-[250px] p-4 ${
                activeTab === index ? "bg-gray200" : "bg-gray-200"
              }`}
            >
              {tab.label}
            </div>
          );
        })}
      </Box>
      <div className="w-full overflow-hidden">{tabs[activeTab].children}</div>
    </div>
  );
};

export default Tabs;
