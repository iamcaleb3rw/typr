import { db } from "@/db";
import { coders, likes } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";
import React from "react";

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
            {coderWithMostLikes.map((coder, index) => (
              <tr
                key={coder.coderId}
                className={`rounded-md ${index % 2 === 0 ? "bg-muted/30" : ""}`}
              >
                <td className="rounded-tl-lg rounded-bl-lg px-4 py-2 w-16">
                  {index === 0 ? (
                    <span className="p-2">🥇</span>
                  ) : index === 1 ? (
                    <span className="p-2 text-white">🥈</span>
                  ) : index === 2 ? (
                    <span className=" p-2 bg-bronze-500">🥉</span>
                  ) : (
                    <span className="p-2">{index + 1}</span>
                  )}
                </td>
                <td className="px-4 py-2">{coder.username}</td>
                <td className="px-4 py-2">{coder.email}</td>
                <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
                  {coder.totalLikes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
