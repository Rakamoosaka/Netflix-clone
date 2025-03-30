import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

interface IParams {
  params: {
    movieId: string;
  };
}

export async function GET(request: Request, { params }: IParams) {
  try {
    await serverAuth();

    const { movieId } = params;

    if (!movieId || typeof movieId !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const movie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
