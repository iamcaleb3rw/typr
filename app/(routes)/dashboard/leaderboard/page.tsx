import { db } from "@/db";
import { coders, scribes, likes } from "@/db/schema";
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
import LeaderboardTable from "@/components/LeaderboardTable";

const page = async () => {
  // Fetch coders whose scribes received the most likes
  const coderWithMostLikes = await db
    .select({
      coderId: coders.id,
      username: coders.username,
      email: coders.email,
      totalLikes: sql<number>`COUNT(${likes.id})`.as("totalLikes"),
    })
    .from(coders)
    .leftJoin(scribes, eq(coders.id, scribes.authorId)) // Join coders with their scribes
    .leftJoin(likes, eq(scribes.id, likes.scribeId)) // Join scribes with likes
    .groupBy(coders.id, coders.username, coders.email)
    .orderBy(desc(sql<number>`COUNT(${likes.id})`));

  console.log(coderWithMostLikes); // Order by the number of likes // Fetch top 10 coders

  return (
    <div className="px-3">
      <h1 className="text-2xl tracking-tighter font-semibold border-b">
        Leaderboard
      </h1>
      <div className="mt-4  overflow-auto">
        <LeaderboardTable />
      </div>
    </div>
  );
};

export default page;
