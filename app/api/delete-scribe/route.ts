import { db } from "@/db";
import { scribes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 402 }
      );
    }

    const deletedScribe = await db.delete(scribes).where(eq(scribes.id, id));

    return NextResponse.json(deletedScribe);
    console.log(id);
  } catch (error) {
    console.log("DELETE SCRIBE", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
