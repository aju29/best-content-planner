import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavLinks from "@/components/NavLinks";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Content Planner",
  description: "Internal content ops tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <nav className="border-b border-gray-200 bg-white px-8 py-4">
          <div className="max-w-6xl mx-auto flex items-center gap-6">
            <span className="text-gray-900 font-bold tracking-tight">
              Content Planner
            </span>
            <NavLinks />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
