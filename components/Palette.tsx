"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); // Prevent the default browser search action
        setOpen((prev) => !prev);
      }
    };

    // Add keydown listener to the document
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        className="border bg-muted/30 hover:bg-muted/60 transition cursor-pointer rounded-xl gap-12 flex items-center py-1 px-1"
        onClick={() => setOpen(true)}
      >
        <div>
          <p className="text-muted-foreground text-sm ml-4 line-clamp-1">
            Browse the platform..
          </p>
        </div>
        <div className="bg-muted text-xs text-muted-foreground p-1 rounded-lg">
          Ctrl+K
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
