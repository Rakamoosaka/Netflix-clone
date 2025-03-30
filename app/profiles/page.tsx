import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ClientProfiles from "@/components/ClientProfiles";

export default async function ProfilesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  return <ClientProfiles />;
}
