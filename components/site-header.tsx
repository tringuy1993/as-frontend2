"use client";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./ui/theme-toggle";
import { Icons } from "./icons";
import { NavMobile } from "./nav-mobile";
import { NavMain } from "./nav-main";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Icons.logo className="h-10 w-10" />
          <span className="hidden font-bold md:inline-block">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <NavMain />
          {/* <div></div> */}
          <div></div>
          <NavMobile />
          <nav className="flex items-center space-x-1">
            <ModeToggle />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </div>
    </header>
  );
}
