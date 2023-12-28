"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/app/authentication/context";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect } from "react";

export function UserMenu() {
  const { tenant, isAuthLoading, handleSignOut } = useAuth();
  useEffect(() => {}, [tenant?.photoURL]);
  return (
    <>
      {isAuthLoading ? null : !tenant ? (
        <Link href="/authentication/signin" passHref>
          <Button>SignIn</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={tenant?.photoUrl} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile" passHref>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSignOut()}>
              SignOut
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
