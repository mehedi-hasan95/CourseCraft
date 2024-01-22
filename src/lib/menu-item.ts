import {
  BarChart,
  Compass,
  FilePlus,
  Layout,
  List,
  UserCheck,
} from "lucide-react";

export const userMenu = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

export const teacherMenu = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const adminMenu = [
  {
    icon: UserCheck,
    label: "Admin",
    href: "/admin",
  },
  {
    icon: FilePlus,
    label: "Category",
    href: "/admin/category",
  },
];
