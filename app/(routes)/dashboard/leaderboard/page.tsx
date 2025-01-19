import React from "react";
import LeaderboardTable from "@/components/LeaderboardTable";

const page = async () => {
  // Fetch coders whose scribes received the most likes // Order by the number of likes // Fetch top 10 coders

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
