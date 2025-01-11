// pages/api/scribes/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { scribes, coders } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = await auth();
  const scribeId = uuidv4().toString();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await currentUser(); // Get user details from Clerk

  // Check if the user exists in the 'coders' table
  let coder = await db
    .select()
    .from(coders)
    .where(eq(coders.id, userId))
    .limit(1);

  // If user doesn't exist, create a new user in the 'coders' table
  if (coder.length === 0) {
    try {
      await db.insert(coders).values({
        id: userId,
        username:
          user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
      });
    } catch (error) {
      console.error("Error creating coder:", error);
      return new NextResponse("Internal server error", { status: 500 });
    }
  }

  // Insert the new scribe into the database
  const { title, description } = body;
  try {
    const newScribe = await db.insert(scribes).values({
      id: scribeId,
      title: title || "Untitled1", // Default values or get them from the form if applicable
      description: description || "",
      html: "",
      css: "",
      js: "",
      authorId: userId, // Use the userId to link the scribe to the user
    });
    return new NextResponse(JSON.stringify({ id: scribeId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating scribe:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
