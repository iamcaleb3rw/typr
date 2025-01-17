import { redirect } from "next/navigation";
import { db } from "@/db";
import { scribes, likes } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardDialog from "@/components/DashboardDialog";
import { Ellipsis, SquareArrowOutUpRight, Trash } from "lucide-react";
import { sql, eq, desc, count } from "drizzle-orm";
import defaultAvatar from "@/public/defaultAvatar.png";
interface LikesData {
  scribeId: string;
  count: number;
}

const DashBoardPage = async () => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId) {
    return redirect("/sign-up");
  }

  // Fetch scribe projects
  const scribesProjects = await db
    .select()
    .from(scribes)
    .where(eq(scribes.authorId, userId))
    .orderBy(desc(scribes.updatedAt));

  // Get likes count for all scribe IDs in one query
  const scribeIds = scribesProjects.map((project) => project.id);

  let likesData: LikesData[] = [];
  if (scribeIds.length > 0) {
    likesData = await db
      .select({
        scribeId: likes.scribeId,
        count: count(),
      })
      .from(likes)
      .where(sql`${likes.scribeId} IN (${sql.join(scribeIds, sql`, `)})`)
      .groupBy(likes.scribeId);
  }

  // Map likes count to the respective scribe
  const likesMap = likesData.reduce((acc, like) => {
    acc[like.scribeId] = like.count;
    return acc;
  }, {} as Record<string, number>);

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

          const likesCount = likesMap[project.id] || 0; // Get likes count for the current scribe

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
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Scribe Menu</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex">
                            <Link
                              href={`/workspace/${project.id}`}
                              target="_blank"
                              className="flex items-center gap-2"
                            >
                              <span>
                                <SquareArrowOutUpRight />
                              </span>{" "}
                              Go to scribe
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <DashboardDialog
                              title={"Edit scribe"}
                              description={
                                <span>
                                  Make changes to the scribe here. Do not worry
                                  you can change this later.
                                </span>
                              }
                              buttonText={"Save changes"}
                              initialTitle={project.title}
                              initialDescription={project.description || ""}
                              scribeId={project.id}
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <span>
                              <Trash />
                            </span>{" "}
                            Delete
                          </DropdownMenuItem>
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
                      By-{" "}
                      {user?.username ||
                        user?.firstName ||
                        user?.primaryEmailAddress?.emailAddress}
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
              <div className="row-span-2 p-2 mt-1">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {likesCount}
                  </span>{" "}
                  likes
                </p>
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
              <div className="w-full h-2 px-3 mt-4">
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

export default DashBoardPage;
