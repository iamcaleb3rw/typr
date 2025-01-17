import { NextResponse } from "next/server";
import { db } from "@/db";
import { coders, scribes, likes } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const coderWithMostLikes = await db
      .select({
        coderId: coders.id,
        username: coders.username,
        email: coders.email,
        totalLikes: sql<number>`COUNT(${likes.id})`.as("totalLikes"),
      })
      .from(coders)
      .leftJoin(scribes, eq(coders.id, scribes.authorId))
      .leftJoin(likes, eq(scribes.id, likes.scribeId))
      .groupBy(coders.id, coders.username, coders.email)
      .orderBy(desc(sql<number>`COUNT(${likes.id})`));

    return NextResponse.json(coderWithMostLikes);
  } catch (error) {
    console.log("Get leaderboard", error);
    return new NextResponse("Error fetching leaderboard", { status: 500 });
  }
}
