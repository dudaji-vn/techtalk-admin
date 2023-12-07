import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import VocabularyIcon from '../Icons/VocabularyIcon';
import { ROUTE } from '../../const/path';
import VocabularyActiveIcon from '../Icons/VocabularyActiveIcon';
import LectureActiveIcon from '../Icons/LectureActiveIcon';
import LectureIcon from '../Icons/LectureIcon';
import { overrideTailwindClasses } from 'tailwind-override';
import MenuIcon from '../Icons/MenuIcon';
import DashboardActiveIcon from '../Icons/DashboardActiveIcon';
import DashboardIcon from '../Icons/DashboardIcon';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

interface NavigationLink {
  href: string;
  text: string;
  active: boolean;
  iconActive: any;
  icon: any;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const sidebar = useRef<HTMLElement | null>(null);

  const navigationLinks: NavigationLink[] = [
    {
      href: ROUTE.dashboard,
      text: 'Dashboard',
      active: pathname.includes('dashboard'),
      iconActive: <DashboardActiveIcon />,
      icon: <DashboardIcon />,
    },
    {
      href: ROUTE.lectures,
      text: 'Lectures',
      active: pathname.includes('lectures'),
      iconActive: <LectureActiveIcon />,
      icon: <LectureIcon />,
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`bg-sidebar absolute left-0 top-0 pt-4 z-9999 flex items-center flex-col h-screen w-20  overflow-y-hidden `}
    >
      <div className="flex items-center justify-between gap-2 ">
        <MenuIcon />
      </div>

      <div className="no-scrollbar flex flex-col">
        <nav className="mt-8">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {navigationLinks.map((link) => (
                <div
                  className={overrideTailwindClasses(
                    `p-4 rounded-2xl flex items-center font-medium text-secondaryText ${!link.active && 'hover:bg-sidebarHover '} ${
                      link.active && 'border rounded-2xl bg-lightSidebar'
                    }`
                  )}
                  key={link.href}
                >
                  <Link className="w-full flex gap-2.5" href={link.href}>
                    {link.active ? link.iconActive : link.icon}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
