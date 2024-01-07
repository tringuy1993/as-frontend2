import Link from "next/link";

import { siteConfig } from "@/config/site";
import * as React from "react";
import { ModeToggle } from "./ui/theme-toggle";
import { Icons } from "./icons";
import { NavMobile } from "./nav-mobile";

import { UserMenu } from "./user-menu";
import { NavMain } from "./nav-main";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-4">
          <Icons.logo className="h-10 w-10" />
          <span className="hidden font-bold md:inline-block">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2 ">
          <NavMain />
          <div className="flex-grow md:flex md:flex-1"></div>
          <ModeToggle />
          <UserMenu />
        </div>
        <div className="flex ml-4 items-center">
          <NavMobile />
        </div>
      </div>
    </header>
  );
}
