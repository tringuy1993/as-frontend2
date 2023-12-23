"use client";

import * as React from "react";
import Image from "next/image";
import { ModeToggle } from "./ui/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";

const components: { title: string; href: string }[] = [
  {
    title: "Home",
    href: "/",
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

export function NavMain() {
  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center gap-6 text-sm">
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
      </nav>
    </div>
  );
}
