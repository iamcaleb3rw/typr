"use client";

import { TbTrophy } from "react-icons/tb";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Cog, Compass, LayoutList, PlusCircle } from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const platformRoutes = [
  {
    label: "My Scribes",
    icon: LayoutList,
    path: "/dashboard",
  },
  {
    label: "Leaderboard",
    icon: TbTrophy,
    path: "/dashboard/leaderboard",
  },
  {
    label: "Explore",
    icon: Compass,
    path: "/dashboard/explore",
  },
  {
    label: "Create a scribe",
    icon: PlusCircle,
    path: "/dashboard/newscribe",
  },

  {
    label: "Settings",
    icon: Cog,
    path: "/dashboard/settings",
  },
];

export function NavMain() {
  const path = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {platformRoutes.map((route) => (
          <Link href={route.path} key={route.label}>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={route.label}
                className={cn(
                  ``,
                  route.path === path && "bg-muted-foreground/10"
                )}
              >
                <route.icon />
                <span>{route.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
