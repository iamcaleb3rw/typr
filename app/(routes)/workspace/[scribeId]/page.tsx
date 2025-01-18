import CodeEditor from "@/components/code-editor";
import { db } from "@/db";
import { likes, scribes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, count, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

// Define types for the page props
type Params = Promise<{ scribeId: string }>;

const ScribeId = async (props: { params: Params }) => {
  const { userId } = await auth();
  const params = await props.params;
  const scribeId = params.scribeId;
  if (!userId) {
    return redirect("/sign-up");
  }

  if (!scribeId) {
    return redirect("/");
  }

  let scribe = null;
  let likeCount = null;
  let existingLike = null;

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

    likeCount = await db
      .select({ count: count() })
      .from(likes)
      .where(eq(likes.scribeId, scribeId));

    existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.scribeId, scribeId), eq(likes.coderId, userId)));
    const { html, css, js, title, authorId } = scribe[0];
    const isAlreadyLiked = existingLike.length > 0;
    const totalLikes = likeCount[0].count;

    return (
      <div>
        <CodeEditor
          initialHtml={html}
          authorId={authorId}
          initialCss={css}
          initialJs={js}
          id={scribeId}
          likes={totalLikes}
          title={title}
          isAlreadyLiked={isAlreadyLiked}
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
