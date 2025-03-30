// app/api/favourite/route.ts
import { NextResponse } from "next/server";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function POST(request: Request) {
  try {
    const { currentUser } = await serverAuth();
    const body = await request.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const user = await prismadb.user.update({
      where: { email: currentUser.email || "" },
      data: { favouriteIds: { push: movieId } },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { currentUser } = await serverAuth();
    const body = await request.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const updatedFavouriteIds = without(currentUser.favouriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: { email: currentUser.email || "" },
      data: { favouriteIds: updatedFavouriteIds },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
