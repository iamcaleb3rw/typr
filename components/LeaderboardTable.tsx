"use client";

import axios from "axios";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heart } from "lucide-react";

// Axios-based fetcher function
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface Coder {
  coderId: number;
  username: string;
  email: string;
  totalLikes: number;
}

export default function LeaderboardTable() {
  const { data: coderWithMostLikes, error } = useSWR<Coder[]>(
    "/api/get-leaderboard",
    fetcher,
    {
      refreshInterval: 5000, // Refresh every 5 seconds
    }
  );

  if (error) return <div>Failed to load</div>;
  if (!coderWithMostLikes) return <div>Loading...</div>;

  return (
    <Table className="border">
      <TableCaption>Most Liked Coders | Leaderboard</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Username</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead className="text-right">Total Likes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coderWithMostLikes.map((coder, index) => (
          <TableRow
            key={coder.coderId}
            className={index % 2 === 0 ? "bg-muted/30" : ""}
          >
            <TableCell className="font-medium">
              {index === 0 ? (
                <span className="p-2">🥇</span>
              ) : index === 1 ? (
                <span className="p-2 text-white">🥈</span>
              ) : index === 2 ? (
                <span className="p-2 bg-bronze-500">🥉</span>
              ) : (
                <span className="p-2">{index + 1}</span>
              )}
            </TableCell>
            <TableCell>
              <span className="block max-w-[150px] truncate">
                {coder.username}
              </span>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {coder.email}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex text-right items-center gap-1 justify-end">
                <Heart color="red" fill="red" />
                {coder.totalLikes}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
