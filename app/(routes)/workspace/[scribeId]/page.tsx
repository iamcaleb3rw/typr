import CodeEditor from "@/components/code-editor";
import { db } from "@/db";
import { scribes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

// Define types for the page props
interface PageProps {
  params: {
    scribeId: string;
  };
}

const ScribeId = async ({ params }: PageProps) => {
  const { scribeId } = params;

  if (!scribeId) {
    return redirect("/");
  }

  let scribe = null;

  try {
    // Fetch the scribe from the database asynchronously
    scribe = await db
      .select()
      .from(scribes)
      .where(eq(scribes.id, scribeId))
      .limit(1);

    if (scribe.length < 1) {
      throw new Error("Scribe not found");
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
  } finally {
    // This block will run regardless of success or error
    console.log("Scribe fetch attempt finished");
  }
};

export default ScribeId;
