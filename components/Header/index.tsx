import { keyStorage } from "@/const/keyStorage";
import { useParams, usePathname, useRouter } from "next/navigation";
import LogoutIcon from "../Icons/LogoutIcon";
import Typography from "../Typo";
import { ROUTE } from "../../const/path";
import { useMemo } from "react";
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem(keyStorage.accessToken);
    router.push("/auth/signin");
  };
  const renderTitle = useMemo(() => {
    if (pathname.includes(ROUTE.dashboard)) {
      return "Dashboard";
    }
    if (pathname.includes(ROUTE.lectures)) {
      return "Lectures";
    }
    if (pathname.includes(ROUTE.certificates)) {
      return "User's certificates";
    }

    return "Admin page";
  }, [pathname]);
  return (
    <header className="sticky top-0 z-999 flex justify-between bg-mainBg p-4 border border-gray50">
      <Typography type="semi-bold">{renderTitle}</Typography>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3.5  px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <LogoutIcon />
        Log Out
      </button>
    </header>
  );
};

export default Header;
