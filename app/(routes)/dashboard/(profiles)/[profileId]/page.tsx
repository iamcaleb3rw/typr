import CodeEditor from "@/components/code-editor";
import Background from "@/components/eldoraui/novatrixbg";
import { db } from "@/db";
import { coders, likes, scribes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { profileEnd } from "console";
import { and, count, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

// Define types for the page props
type Params = Promise<{ profileId: string }>;

const ScribeId = async (props: { params: Params }) => {
  const { userId } = await auth();
  const params = await props.params;
  const profileId = params.profileId;
  if (!userId) {
    return redirect("/sign-up");
  }

  if (!profileId) {
    return redirect("/");
  }

  const profile = await db
    .select()
    .from(coders)
    .where(eq(coders.id, profileId))
    .limit(1);
  if (profile.length < 1) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col px-3">
      <div className="relative w-[1000px]">
        <div className="relative flex items-center justify-center z-10 h-[150px] w-full overflow-hidden rounded-lg border bg-background">
          <p className="absolute text-orange-500 font-bold text-3xl">
            {profile[0].username || profile[0].email}
          </p>
          <Background />
        </div>
      </div>
    </div>
  );
};

export default ScribeId;
