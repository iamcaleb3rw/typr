import { NextResponse } from "next/server";
import { db } from "@/db";
import { likes, scribes, coders } from "@/db/schema"; // Import coders table as well
import { eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = await auth();
    const user = await currentUser();
    const { id, coderId, scribeId } = body;

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if all required fields are provided
    if (!id || !coderId || !scribeId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 402 }
      );
    }

    // Check if the coderId exists in the coders table
    let coderExists = await db
      .select()
      .from(coders)
      .where(eq(coders.id, userId));

    // If the coder does not exist, insert a new coder record
    if (coderExists.length === 0) {
      await db.insert(coders).values({
        id: coderId,
        username:
          user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "",
        email: user?.primaryEmailAddress?.emailAddress ?? "",
      });
    }

    // Now insert the like into the likes table
    const updateResult = await db.insert(likes).values({
      id: id, // Assuming `id` is the unique identifier for the like record (not the userId)
      scribeId: scribeId,
      coderId: userId, // Associate the like with the user who liked
    });

    return NextResponse.json(updateResult);
  } catch (error) {
    console.error("Error liking the scribe", error);
    return NextResponse.json(
      { error: "An error occurred while liking the scribe." },
      { status: 500 }
    );
  }
}
