export type SideBarNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideBarNavItem[];
};
