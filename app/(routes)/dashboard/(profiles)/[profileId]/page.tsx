import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/db";
import { coders, likes, scribes } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { profileEnd } from "console";
import { and, count, eq } from "drizzle-orm";
import Image from "next/image";
import { Ellipsis, Heart } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import defaultAvatar from "@/public/defaultAvatar.png";
import { formatDistanceToNow } from "date-fns";
import { UserProfile } from "@clerk/nextjs";
import Profile from "../../_components/user-profile";
import UserProfilePage from "@/app/user-profile/[[...user-profile]]/page";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

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
  const coderScribes = await db
    .select()
    .from(scribes)
    .where(eq(scribes.authorId, profileId));
  console.log(profileId);

  const totalLikes = await db
    .select({ likesCount: count(likes.id) })
    .from(likes)
    .innerJoin(scribes, eq(likes.scribeId, scribes.id))
    .where(eq(scribes.authorId, profileId));

  return (
    <div className="flex flex-col px-1 md:px-3 w-full">
      <h1 className="text-2xl tracking-tighter font-semibold border-b">
        Coder profile
      </h1>
      <div className="relative flex items-center justify-center rounded-lg overflow-hidden mt-2 border w-full h-[150px]">
        <AnimatedGradientText>
          <div
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            <p className="text-3xl font-bold">
              {profile[0].username || profile[0].email}
            </p>
          </div>
        </AnimatedGradientText>
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.03}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        <div className="border min-h-[150px] bg-muted/20 flex items-center flex-col justify-center rounded-md">
          <h1 className="text-4xl font-bold">
            {totalLikes[0]?.likesCount || 0}
          </h1>
          <p className="text-muted-foreground text-lg">Likes</p>
        </div>
        <div className="border min-h-[150px] bg-muted/20 flex items-center flex-col justify-center rounded-md">
          <h1 className="text-4xl font-bold">{coderScribes.length}</h1>
          <p className="text-muted-foreground text-lg">Scribes</p>
        </div>
        <div className="border min-h-[150px] bg-muted/20 flex items-center flex-col justify-center rounded-md">
          <h1 className="text-4xl font-bold">4</h1>
          <p className="text-muted-foreground text-lg">Views</p>
        </div>
      </div>
      <h1 className="text-2xl tracking-tighter font-semibold border-b mt-4">
        Scribes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
        {coderScribes.map((project) => {
          const htmlLength = (project.html ?? "").length;
          const cssLength = (project.css ?? "").length;
          const jsLength = (project.js ?? "").length;

          const totalLength = htmlLength + cssLength + jsLength;

          const htmlPercentage = totalLength
            ? ((htmlLength / totalLength) * 100).toFixed(1)
            : "0.00";
          const cssPercentage = totalLength
            ? ((cssLength / totalLength) * 100).toFixed(1)
            : "0.00";
          const jsPercentage = totalLength
            ? ((jsLength / totalLength) * 100).toFixed(1)
            : "0.00";

          return (
            <div
              key={project.id}
              className="relative overflow-hidden border h-[270px] pb-2 rounded-xl grid grid-rows-5"
            >
              <div className="relative justify-between flex flex-col overflow-auto row-span-3 border-b bg-muted">
                <div>
                  <div className="text-xl  p-2 flex justify-between items-center">
                    <div className="mx-3 my-1">{project.title}</div>
                    <div className="flex gap-1">
                      <div>
                        <Heart className="font-thin w-5 h-5" fill="#fff" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Scribe Menu</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link
                              href={`/workspace/${project.id}`}
                              target="_blank"
                            >
                              Go to scribe scribe
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={`/workspace/${project.id}`}
                              target="_blank"
                            >
                              Edit scribe
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mx-3 p-3">
                    {project.description || "No description"}
                  </div>
                </div>
                <div className="flex gap-2 mx-3 p-3">
                  <div>
                    <Image
                      src={user?.imageUrl || defaultAvatar}
                      alt="User profile"
                      width={30}
                      height={30}
                      className="ring-2 rounded-full"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground flex flex-col">
                    <div>
                      By-
                      {profile[0].email || profile[0].email}
                    </div>
                    <div>
                      <span>Last updated •</span>
                      <span>
                        {project.updatedAt
                          ? `${formatDistanceToNow(
                              new Date(project.updatedAt)
                            )} ago`
                          : "No update available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-span-2 p-2 mt-2">
                <p className="text-xs">
                  Total Code Length: {totalLength} characters
                </p>
                <div className="text-xs flex items-center gap-1">
                  <span className="h-3 w-3 bg-orange-500 rounded-full"></span>
                  <p>HTML: {htmlPercentage}%</p>
                </div>
                <div className="text-xs flex items-center gap-1">
                  <span className="h-3 w-3 bg-blue-500 rounded-full"></span>
                  <p>CSS: {cssPercentage}%</p>
                </div>
                <div className="text-xs flex items-center gap-1">
                  <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                  <p>JS: {jsPercentage}%</p>
                </div>
              </div>
              <div className="w-full h-2 px-3">
                <div className="w-full h-full rounded-sm flex overflow-hidden">
                  {/* Dynamically set widths based on percentages */}
                  <div
                    className="bg-orange-500 h-full"
                    style={{ width: `${htmlPercentage}%` }}
                  ></div>
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${cssPercentage}%` }}
                  ></div>
                  <div
                    className="bg-yellow-500 h-full"
                    style={{ width: `${jsPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className="text-2xl tracking-tighter font-semibold border-b mt-4">
        Theme
      </h1>
      <div></div>
    </div>
  );
};

export default ScribeId;
