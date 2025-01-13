import { db } from "@/db";
import { scribes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description } = body;

    const updateScribe = await db
      .update(scribes)
      .set({
        title: title,
        description: description,
      })
      .where(eq(scribes.id, id));
    return NextResponse.json(updateScribe);
  } catch {
    return new NextResponse("Error", { status: 500 });
    console.log("Error");
  }
}
