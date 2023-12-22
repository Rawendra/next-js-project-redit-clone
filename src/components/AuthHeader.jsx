"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { signIn, signOut } from "@/actions";
export default function AuthHeader() {
  const session = useSession();

  return (
    <>
      {session.status === "loading" ? null : (
        <>
          {" "}
          {session?.data?.user ? (
            <>
              <Popover placement="left">
                <PopoverTrigger>
                  <Avatar src={session?.data?.user?.image || ""} />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-4">
                    <form action={signOut}>
                      <Button type="submit">Sign Out</Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <NavbarItem>
                <form action={signIn}>
                  <Button type="submit" color="secondary" variant="bordered">
                    Sign In
                  </Button>
                </form>
              </NavbarItem>

              <NavbarItem>
                <form action={signIn}>
                  <Button type="submit" color="primary" variant="flat">
                    Sign Up
                  </Button>
                </form>
              </NavbarItem>
            </>
          )}
        </>
      )}
    </>
  );
}
