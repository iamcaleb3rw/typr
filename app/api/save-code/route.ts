import { NextResponse } from "next/server";
import { db } from "@/db";
import { scribes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, html, css, js } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 402 }
      );
    }

    // Update the existing record in the database
    const updateResult = await db
      .update(scribes)
      .set({ html: html, css: css, js: js })
      .where(eq(scribes.id, id)); // Assuming `id` is the identifier

    return NextResponse.json(updateResult);
  } catch (error) {
    console.error("Error updating code:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the code." },
      { status: 500 }
    );
  }
}
