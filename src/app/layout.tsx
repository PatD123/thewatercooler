"use client";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <html lang="en" className="scroll-smooth">
      <SessionProvider>
        <body className={poppins.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
