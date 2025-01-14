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
<<<<<<< HEAD
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
                      {profile[0].username || profile[0].email}
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
=======
>>>>>>> parent of b3d8910 (Addtional fetching on user profile)
    </div>
  );
};

export default ScribeId;
