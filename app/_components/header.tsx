import {
  NavigationMenu,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import ThemeSwitch from '@/components/custom/themeSwitch';

export const Header = () => {
  return (
    <div className="w-screen shadow-md p-[1rem] flex justify-between items-center">
      <h1 className="text-2xl">Assistant</h1>
      <ThemeSwitch />
    </div>
  );
};
export default Header;
