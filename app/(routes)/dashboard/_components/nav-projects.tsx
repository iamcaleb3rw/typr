"use client";

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NavProjects() {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Support</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Card>
            <CardHeader>
              <CardTitle>Support the movement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-1">
                Contribute to the maintainance of the platform by supporting the
                creators
              </p>
              <Button className="w-full">Donate</Button>
            </CardContent>
          </Card>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
