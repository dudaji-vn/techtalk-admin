import { keyStorage } from '@/const/keyStorage';
import { useRouter } from 'next/navigation';
import LogoutIcon from '../Icons/LogoutIcon';
import Typography from '../Typo';
const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem(keyStorage.accessToken);
    router.push('/auth/signin');
  };
  return (
    <header className="sticky top-0 z-999 flex justify-between bg-white p-4">
      <Typography type="semi-bold">Admin page</Typography>
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
