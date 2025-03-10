// components/layout/Sidebar.tsx
import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { defaultNavItems } from "./defaultnavitems";
import { useOnClickOutside } from "usehooks-ts";
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
};
const Sidebar = ({ open, navItems = defaultNavItems, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  const handleLogout = (item) => {
    const token = sessionStorage.getItem('token');
    if ((token && token != 'undefined') && item.href =="/login") {
      sessionStorage.clear();
    }
  };
  return (
    <div
      className={classNames({
        "flex flex-col justify-between": true, // layout
        "bg-black text-zinc-50": true, // colors
        "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true, // positioning
        "md:h-[calc(100vh_-_64px)] h-full w-[200px]": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        "-translate-x-full ": !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >

      <nav className="md:sticky top-0 md:top-16">
        {/* nav items */}
        <ul className="py-2 flex flex-col gap-2">
          {navItems.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    "text-gray-100 hover:bg-gray-600": true, //colors
                    "flex gap-4 items-center ": true, //layout
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-2": true, //self style
                  })} onClick={() => handleLogout(item)}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      {/* account  */}
      <div className="border-t border-t-gray-700 p-4">
        <div className="flex gap-4 items-center">
          <Image
            src={
              "/images/default-profile.png"
            }
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          />
          <div className="flex flex-col ">
            <Link target="_blank" href="https://www.linkedin.com/in/nicolaslizarazo/" className="text-gray-200 text-sm">
            <span className="text-gray-50 my-0">Made by: Nicolas lizarazo</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;