type NavbarProps = {
  setIsPicking: (isPicking: boolean) => void;
  isPicking: boolean;
};
const Navbar = ({ setIsPicking, isPicking }: NavbarProps) => {
  return (
    <nav
      className="fixed h-16 -translate-x-1/2 border rounded-full left-1/2 bottom-4 border-neutral-900 bg-neutral-700 w-fit"
      id="live-comments-navbar"
    >
      <button
        onClick={(e) => {
          console.log("click");
          e.preventDefault();
          e.stopPropagation();
          setIsPicking(!isPicking);
        }}
      >
        {isPicking ? "Stop Picking" : "Start Picking"}
      </button>
    </nav>
  );
};

export default Navbar;
