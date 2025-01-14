import { db } from "@/db";
import { coders, likes } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";
import React from "react";
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

const page = async () => {
  // Fetch coders with the most likes
  const coderWithMostLikes = await db
    .select({
      coderId: coders.id,
      username: coders.username,
      email: coders.email,
      totalLikes: sql<number>`COUNT(${likes.id})`.as("totalLikes"),
    })
    .from(coders)
    .leftJoin(likes, eq(coders.id, likes.coderId))
    .groupBy(coders.id, coders.username, coders.email)
    // Use COUNT directly in ORDER BY
    .orderBy(desc(sql<number>`COUNT(${likes.id})`))
    .limit(10); // Change limit as per your needs, for top 10 users

  return (
    <div className="px-3">
      <h1 className="text-2xl tracking-tighter font-semibold border-b">
        Leaderboard
      </h1>
<<<<<<< HEAD
      <div className="mt-4  overflow-auto">
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
=======
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Total Likes</th>
            </tr>
          </thead>
          <tbody>
>>>>>>> parent of b3d8910 (Addtional fetching on user profile)
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
      </div>
    </div>
  );
};

export default page;
