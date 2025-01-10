"use client";

import * as React from "react";
import { WiMeteor } from "react-icons/wi";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { user } = useUser();
  console.log(user);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <WiMeteor size={20} />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate-1 font-semibold">
              {user?.username}&apos;s typr
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
