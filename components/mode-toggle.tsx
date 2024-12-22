"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLight = () => {
    setTheme("light");
  };

  const handleDark = () => {
    setTheme("dark");
  };

  return (
    <div suppressHydrationWarning>
      {theme === "dark" ? (
        <Button size={"icon"} variant={"outline"} onClick={handleLight}>
          <Sun />
        </Button>
      ) : (
        <Button size={"icon"} variant={"outline"} onClick={handleDark}>
          <Moon />
        </Button>
      )}
    </div>
  );
};
