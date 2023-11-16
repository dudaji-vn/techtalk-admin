import { keyStorage } from "@/const/keyStorage";
import { useRouter } from "next/navigation";
import LogoutIcon from "../Icons/LogoutIcon";
const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem(keyStorage.accessToken);
    router.push("/auth/signin");
  };
  return (
    <header className="sticky top-0 justify-end z-999 flex w-full bg-white pt-4">
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
