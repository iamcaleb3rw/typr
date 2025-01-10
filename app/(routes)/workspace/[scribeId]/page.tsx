import CodeEditor from "@/components/code-editor";
import { db } from "@/db";
import { scribes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const ScribeId = async ({ params }: { params: { scribeId: string } }) => {
  // Await params before accessing its propertie
  const { scribeId } = await params;
  if (!scribeId) {
    return redirect("/");
  }

  let scribe = null;
  try {
    scribe = await db
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
        <CodeEditor
          initialHtml={html}
          initialCss={css}
          initialJs={js}
          id={scribeId}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching scribe:", error);

    // Handle redirect if there's an error
    return redirect("/");
  }
};

export default ScribeId;
