import type { Metadata } from "next";
import { Sofia } from "next/font/google";
import "./globals.css";

const inter = Sofia({ weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "StoryAI by CodeVinu",
  description: "GenAI Project by CodeVinu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
