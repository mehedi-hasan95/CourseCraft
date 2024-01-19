"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { teacherMenu, userMenu } from "@/lib/menu-item";
import { AlignCenter } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const SidebarRoutesMobile = () => {
  const pathName = usePathname();
  const isTeacherPage = pathName?.includes("/teacher");
  const routes = isTeacherPage ? teacherMenu : userMenu;
  return (
    <Sheet>
      <SheetTrigger>
        <AlignCenter />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="flex flex-col w-full gap-y-2 mt-4">
          {routes.map((route) => (
            <SheetClose key={route.href} asChild>
              <Link
                href={route.href}
                className={cn(
                  "flex items-center gap-x-2 py-3 h-full text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                  pathName === route.href &&
                    pathName.startsWith(route.href) &&
                    "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
                )}
              >
                <route.icon />
                {route.label}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
