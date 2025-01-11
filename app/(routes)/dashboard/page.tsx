import { db } from "@/db";
import { scribes } from "@/db/schema";

import { auth, currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import Image from "next/image";
import defaultAvatar from "@/public/defaultAvatar.png";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const DashBoardPage = async () => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId) {
    return redirect("/sign-up");
  }
  const scribesProjects = await db
    .select()
    .from(scribes)
    .where(eq(scribes.authorId, userId))
    .orderBy(desc(scribes.updatedAt));

  return (
    <div className="px-3">
      <h1 className="text-2xl tracking-tighter font-semibold border-b">
        My Scribes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
        {scribesProjects.map((project) => {
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
              className="overflow-hidden border h-[270px] pb-2 rounded-xl grid grid-rows-5"
            >
              <div className="relative justify-between flex flex-col overflow-auto row-span-3 border-b bg-muted">
                <div>
                  <div className="text-xl  p-2 flex justify-between items-center">
                    <div className="mx-3 my-1">{project.title}</div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant={"outline"} className="h-8 w-8">
                            <Ellipsis className="h-5 w-5" />
                          </Button>
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
                    <div>By-{user?.username}</div>
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
    </div>
  );
};

export default DashBoardPage;
