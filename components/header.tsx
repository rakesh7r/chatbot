import ThemeSwitch from '@/components/custom/themeSwitch';
import Logo from '../public/logo.svg';
import Image from 'next/image';
export const Header = () => {
  return (
    <div className="w-screen shadow-md p-[1rem] flex justify-between items-center sticky top-0 dark:border-b-2 dark:border-e-gray-600 z-10">
      <Image src={Logo} alt="Cognito Assistant" height={50} />
      <ThemeSwitch />
    </div>
  );
};
export default Header;
