import { NextResponse } from "next/server";
import { db } from "@/db";
import { likes, scribes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, coderId, scribeId } = body;
    console.log(id);
    if (!id || !coderId || !scribeId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 402 }
      );
    }

    // Update the existing record in the database
    const deleteLike = await db
      .delete(likes)
      .where(and(eq(likes.scribeId, scribeId), eq(likes.coderId, coderId))); // Assuming `id` is the identifier
    console.log(deleteLike);
    return NextResponse.json(deleteLike);
  } catch (error) {
    console.error("Error liking the scribe", error);
    return NextResponse.json(
      { error: "An error occurred while liking the scribe." },
      { status: 500 }
    );
  }
}
