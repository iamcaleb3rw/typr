"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Leader = {
  rank: string;
  username: string;
  totalLikes: number;
  email: string;
};

export const columns: ColumnDef<Leader>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "totalLikes",
    header: "Likes",
  },
];
