"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

import Link from "next/link";

const components: { title: string; href: string }[] = [
  {
    title: "Greek",
    href: "/options",
  },
  {
    title: "Greek Time",
    href: "/greektime",
  },
  {
    title: "Back Test",
    href: "/backtest",
  },
  {
    title: "Music",
    href: "/music",
  },
  { title: "About", href: "/about" },
];

const nonUserMenu: { title: string; href: string }[] = [
  { title: "SignIn", href: "/authentication/signin" },
];

const userMenu: { title: string; href: string }[] = [
  { title: "SignOut", href: "" },
  { title: "Settings", href: "/authentication/settings" },
];

export function NavMenus() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {components.map((component) => (
              <Link
                key={`${component.href}+${component.title}`}
                href={component.href}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {component.title}
                </NavigationMenuLink>
              </Link>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
