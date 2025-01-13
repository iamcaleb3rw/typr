import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { db } from "@/db";
import { coders, scribes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, not } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Heart, Ellipsis } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import defaultAvatar from "@/public/defaultAvatar.png";

import React from "react";
import { formatDistanceToNow } from "date-fns";

const Explore = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-up");
  }

  // Fetch public scribes
  const publicScribes = await db
    .select()
    .from(scribes)
    .where(not(eq(scribes.authorId, userId)));

  // Fetch authors for the scribes
  const scribesWithAuthors = await Promise.all(
    publicScribes.map(async (scribe) => {
      const author = await db
        .select()
        .from(coders)
        .where(eq(coders.id, scribe.authorId))
        .then((res) => res[0]); // Assuming author exists
      return { ...scribe, author };
    })
  );

  return (
    <div className="px-3">
      <h1 className="text-2xl tracking-tighter font-semibold border-b">
        Explore scribes from other users
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
        {scribesWithAuthors.map((project) => {
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
                  <div className="text-xl p-2 flex justify-between items-center">
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
                              Go to scribe
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
                      src={defaultAvatar}
                      alt="Author profile"
                      width={30}
                      height={30}
                      className="ring-2 rounded-full"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground flex flex-col">
                    <Link
                      href={`/dashboard/${project.authorId}`}
                      className="underline"
                    >
                      <div>
                        By - {project.author.username || project.author.email}
                      </div>
                    </Link>

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

export default Explore;
