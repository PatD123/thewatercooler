import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "the water cooler",
  description: "A cool website to see what your friends are currently watching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="navbar">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl">
              <h1 className="text-xl font-bold text-info">
                <span className="text-teal-900">the</span>
                <span className="text-teal-700">watercooler</span>
              </h1>
              <Image
                className="object-fill"
                src="/favicon.ico"
                width={35}
                height={35}
                alt="Picture of the author"
              />
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Pricing</a>
              </li>
              <li>
                <a>FAQ</a>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            <a className="btn">Sign In</a>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
