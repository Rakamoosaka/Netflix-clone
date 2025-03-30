import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
