import { db } from "@/db";
import { scribes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import Editor from "@/app/(routes)/workspace/_components/editor";

const ScribeId = async ({ params }: { params: { scribeId: string } }) => {
  // Await params before accessing its properties
  const { scribeId } = await params;

  if (!scribeId) {
    return redirect("/");
  }

  // Fetch the scribe from the database
  const scribe = await db
    .select()
    .from(scribes)
    .where(eq(scribes.id, scribeId))
    .limit(1);

  if (scribe.length < 1) {
    return redirect("/");
  }

  const { html, css, js } = scribe[0];

  return (
    <div>
      <Editor
        initialHtml={html}
        initialCss={css}
        initialJs={js}
        id={scribeId}
      />
    </div>
  );
};

export default ScribeId;
