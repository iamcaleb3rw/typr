import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Hero = () => {
  return (
    <div className="h-[88vh] flex flex-col justify-center items-center text-center">
      <div>
        <p className="h-[40px] border border-dashed border-b-0 border-t-0"></p>
        <p className="text-6xl font-bold tracking-tighter max-w-[900px] border-dashed border p-4">
          The HTML playground for modern web developers
        </p>
        <p className="text-lg text-muted-foreground max-w-[1200px] border-t-0 border-dashed border">
          Interact with our code editors and{" "}
          <span className="text-foreground font-semibold">share</span> your work{" "}
          <span className="text-foreground font-semibold">
            with the community
          </span>
        </p>
        <div className="py-8 flex items-center gap-3 justify-center">
          <Button size={"lg"}>
            <SignedIn>
              <Link href={"/dashboard"}>Go to Dashboard</Link>
            </SignedIn>
            <SignedOut>
              <SignInButton>Get Started</SignInButton>
            </SignedOut>
          </Button>
          <Link href="https://www.linkedin.com/in/iamcaleb3rw/" target="_blank">
            <Button size={"lg"} variant={"outline"}>
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
