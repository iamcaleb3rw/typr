"use client";
import React from "react";
import { ModeToggle } from "./mode-toggle";

import { CommandDialogDemo } from "./Palette";

import { DiGithubBadge } from "react-icons/di";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav className="border-b flex items-center justify-between px-4 py-3">
      <div>
        <h1 className="text-2xl font-semibold">
          ty<span className="text-lime-400">pr_</span>
        </h1>
      </div>
      <div className="flex items-center gap-2 ">
        <SignedIn>
          <div className="hidden md:block">
            <CommandDialogDemo />
          </div>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>Log In</Button>
          </SignInButton>

          <SignUpButton>
            <Button variant="outline">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <Link href={"https://github.com/iamcaleb3rw"} target="_blank">
          <DiGithubBadge className="w-6 h-6" />
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
