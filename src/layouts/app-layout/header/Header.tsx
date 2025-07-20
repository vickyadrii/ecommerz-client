import Avatar from "react-avatar";

const Header = () => {
  return (
    <header className="fixed md:block hidden top-0 bg-[#1b1919] w-full md:h-14 text-white z-50">
      <div className="px-5 py-3.5 flex items-center justify-between gap-10">
        <h1>Ecommerz</h1>

        <div className="flex items-center gap-2">
          <Avatar name="Vicky Adri" size="28" alt="Vicky Adri" color="#30f95f" fgColor="black" />
          <h3 className="text-xs font-medium">Vicky Adri</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
