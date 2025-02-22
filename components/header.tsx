import ThemeSwitch from '@/components/custom/themeSwitch';

export const Header = () => {
  return (
    <div className="w-screen shadow-md p-[1rem] flex justify-between items-center sticky top-0 dark:border-b-2 dark:border-e-gray-600 z-10">
      <h1 className="text-2xl">Assistant</h1>
      <ThemeSwitch />
    </div>
  );
};
export default Header;
