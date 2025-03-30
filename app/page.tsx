// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientHomeContent from "@/components/ClientHomeContent";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieListDiv from "@/components/MovieListDiv";
import InfoModalClient from "@/components/InfoModalClient";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="">
      <InfoModalClient />
      <Navbar />
      <Billboard />
      <MovieListDiv />
    </div>
  );
}
