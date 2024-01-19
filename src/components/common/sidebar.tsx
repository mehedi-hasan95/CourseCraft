import { SidebarRoute } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="flex h-full p-6 w-full pr-0">
      <div className="hidden md:flex w-full">
        <SidebarRoute />
      </div>
    </div>
  );
};
