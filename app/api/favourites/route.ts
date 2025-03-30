// app/api/favourites/route.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser.favouriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
