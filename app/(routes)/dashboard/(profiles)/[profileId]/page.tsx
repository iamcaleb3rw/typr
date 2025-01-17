import CodeEditor from "@/components/code-editor";
import { db } from "@/db";
import { coders, likes, scribes } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";

import { and, count, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import defaultAvatar from "@/public/defaultAvatar.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Define types for the page props
type Params = Promise<{ profileId: string }>;

const ScribeId = async (props: { params: Params }) => {
  const { userId } = await auth();
  const user = await currentUser();
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

  const scribesProjects = await db
    .select()
    .from(scribes)
    .where(eq(scribes.authorId, profileId));
  console.log(scribesProjects);
  return (
    <div className="flex flex-col px-3  py-2">
      <div className="flex justify-around">
        <div className=" flex justify-center p-2">
          <Image
            src={user?.imageUrl || defaultAvatar}
            alt="profile"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="ml-4">
            <p className="text-xl">{profile[0].username || profile[0].email}</p>
          </div>
          <div className="flex">
            <div className="border h-[150px] flex flex-col items-center justify-center aspect-square ml-3 mt-3 bg-muted rounded-2xl shadow-xl">
              <p className="text-4xl font-bold">10</p>
              <p className="text-muted-foreground">posts</p>
            </div>
            <div className="border h-[150px] flex flex-col items-center justify-center aspect-square ml-3 mt-3 bg-muted rounded-2xl shadow-xl">
              <p className="text-4xl font-bold">10</p>
              <p className="text-muted-foreground">Likes</p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl tracking-tighter font-semibold border-b mt-2">
        Scribes
      </h1>
      <div>
        {scribesProjects.length >= 1 ? (
          <div>there is at least one scribe</div>
        ) : (
          <div className="min-h-[200px] border-gray-600 rounded-lg border flex items-center justify-center border-dashed mt-2">
            {userId === profileId && (
              <div className="text-center">
                <p className="italic text-muted-foreground text-lg">
                  You have not created a scribe yet
                </p>
                <Link href={"/dashboard/newscribe"}>
                  <Button>
                    Create a scribe
                    <PlusCircle />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScribeId;
