// app/api/random/route.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    await serverAuth(); // pass the request object

    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 400 });
  }
}
