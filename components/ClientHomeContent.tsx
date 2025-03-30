"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import ClientSignOutButton from "@/components/ClientSignOutButton";

export default function ClientHomeContent() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-4xl text-amber-400">Netflix clone</h1>
      <p className="text-white">Name: {user?.name}</p>
      <p className="text-white">Email: {user?.email}</p>
      <ClientSignOutButton />
    </>
  );
}
