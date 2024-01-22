"use client";

import { adminMenu, teacherMenu, userMenu } from "@/lib/menu-item";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { useCurrentUserRole } from "@/hooks/use-current-user";

export const SidebarRoute = () => {
  const currentUserRole = useCurrentUserRole();
  const pathName = usePathname();
  const isTeacherPage = pathName?.includes("/teacher");
  const routes = isTeacherPage ? teacherMenu : userMenu;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      {currentUserRole === "ADMIN" &&
        adminMenu.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
    </div>
  );
};
