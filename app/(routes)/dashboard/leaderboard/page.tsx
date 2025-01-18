import { db } from "@/db";
import { coders, scribes, likes } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";
import React from "react";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Suspense } from "react";
import Loading from "./loading";

const page = async () => {
  // Fetch coders whose scribes received the most likes // Order by the number of likes // Fetch top 10 coders

  return (
    <div className="px-3">
      <h1 className="text-2xl tracking-tighter font-semibold border-b">
        Leaderboard
      </h1>
      <div className="mt-4  overflow-auto">
        <Suspense fallback={<Loading />}>
          <LeaderboardTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
