import { NavMenus } from "./nav-menus";

export function NavMain() {
  return (
    <div className="mr-1 hidden md:flex">
      <nav className="flex items-center gap-6 text-sm">
        <NavMenus />
      </nav>
    </div>
  );
}
