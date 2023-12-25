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
  // console.log(tenant, isAuthLoading);
  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 50));
  //   };
  //   checkAuthentication();
  // }, [tenant]);
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
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
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
