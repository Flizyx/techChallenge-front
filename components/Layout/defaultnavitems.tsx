// components/layout/defaultNavItems.tsx
import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./sidebar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Log in",
    href: "/login",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  // {
  //   label: typeof window !== 'undefined' && sessionStorage.getItem('token') ? "Log out" : "Log in",
  //   href: typeof window !== 'undefined' && sessionStorage.getItem('token') ? "/logout" : "/login",
  //   icon: <UserGroupIcon className="w-6 h-6" />,
  // },
//   {
//     label: "Classrooms",
//     href: "/Students",
//     icon: <FolderIcon className="w-6 h-6" />,
//   },
  {
    label: "Admin",
    href: "/admin",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];
