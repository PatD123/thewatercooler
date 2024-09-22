"use client";

import { useSession, SessionProvider } from "next-auth/react";
import Dashboard from "./dashboard";

export default function Home() {
  return (
    <SessionProvider>
      <Auth>
        <Dashboard />
      </Auth>
    </SessionProvider>
  );
}

function Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession();

  if (status === "authenticated") {
    return <div className="w-full h-full">{children}</div>;
  }

  return <div>Loading...</div>;
}
