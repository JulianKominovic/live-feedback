type NavbarProps = {
  setIsPicking: (isPicking: boolean) => void;
  isPicking: boolean;
};
const Navbar = ({ setIsPicking, isPicking }: NavbarProps) => {
  return (
    <nav
      className="lf-fixed lf-h-16 lf--translate-x-1/2 lf-border lf-rounded-full lf-left-1/2 lf-bottom-4 lf-border-neutral-900 lf-bg-neutral-700 lf-w-fit"
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
