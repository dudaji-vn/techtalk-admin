import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { overrideTailwindClasses } from "tailwind-override";
import { ROUTE } from "../../const/path";
import DashboardActiveIcon from "../Icons/DashboardActiveIcon";
import DashboardIcon from "../Icons/DashboardIcon";
import LectureActiveIcon from "../Icons/LectureActiveIcon";
import LectureIcon from "../Icons/LectureIcon";
import MenuIcon from "../Icons/MenuIcon";
import LogoIcon from "../Icons/LogoIcon";
import CertificateIcon from "../Icons/CertificateIcon";

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
      text: "Dashboard",
      active: pathname.includes("dashboard"),
      iconActive: <DashboardIcon />,
      icon: <DashboardIcon />,
    },
    {
      href: ROUTE.lectures,
      text: "Lectures",
      active: pathname.includes("lectures"),
      iconActive: <LectureIcon />,
      icon: <LectureIcon />,
    },
    {
      href: ROUTE.certificates,
      text: "Certificates",
      active: pathname.includes("certificates"),
      iconActive: <CertificateIcon />,
      icon: <CertificateIcon />,
    },
  ];

  return (
    <aside
      ref={sidebar}
      className={`bg-sidebar absolute left-0 top-0 pt-4 z-10 flex items-center flex-col h-screen w-20  overflow-y-hidden border-gray50 border-r `}
    >
      <div className="flex items-center justify-between gap-2 ">
        <LogoIcon />
      </div>

      <div className="no-scrollbar flex flex-col">
        <nav className="mt-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {navigationLinks.map((link) => (
                <div
                  className={overrideTailwindClasses(
                    `rounded-full flex items-center font-medium text-secondaryText ${!link.active && "hover:bg-[#E8DEF8]"} ${
                      link.active && "rounded-full bg-[#E8DEF8]"
                    }`
                  )}
                  key={link.href}
                >
                  <Link className="p-4 w-full flex gap-2.5 " href={link.href}>
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
