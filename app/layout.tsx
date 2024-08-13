// UI BASED STYLING SETUP 
import { Lato } from "next/font/google";
import "./globals.css";
// TYPES
import type { Metadata } from "next";
import { ReactNode } from "react";

const inter = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "The Prime Store",
  description: "One stop shopping solution for all your needs",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
