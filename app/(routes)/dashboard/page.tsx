import DotPattern from "@/components/ui/dot-pattern";
import { db } from "@/db";
import { scribes } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const DashBoardPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-up");
  }
  const scribesProjects = await db
    .select()
    .from(scribes)
    .where(eq(scribes.authorId, userId));

  return (
    <div className="px-3">
      <h1 className="text-2xl tracking-tighter font-semibold border-b">
        My Scribes
      </h1>
      <div className="grid grid-cols-1 gap-2 mt-3">
        {scribesProjects.map((project) => {
          const htmlLength = (project.html ?? "").length;
          const cssLength = (project.css ?? "").length;
          const jsLength = (project.js ?? "").length;

          const totalLength = htmlLength + cssLength + jsLength;

          const htmlPercentage = totalLength
            ? ((htmlLength / totalLength) * 100).toFixed(2)
            : "0.00";
          const cssPercentage = totalLength
            ? ((cssLength / totalLength) * 100).toFixed(2)
            : "0.00";
          const jsPercentage = totalLength
            ? ((jsLength / totalLength) * 100).toFixed(2)
            : "0.00";

          return (
            <div
              key={project.id}
              className="overflow-hidden border min-h-[200px] rounded-xl grid grid-rows-5"
            >
              <div className="relative flex items-center justify-center overflow-hidden row-span-3 text-3xl border-b p-2">
                {project.title[0]}
              </div>
              <div className="row-span-2 p-2">
                <p className="text-sm">
                  Total Code Length: {totalLength} characters
                </p>
                <p className="text-sm">HTML: {htmlPercentage}%</p>
                <p className="text-sm">CSS: {cssPercentage}%</p>
                <p className="text-sm">JS: {jsPercentage}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoardPage;
