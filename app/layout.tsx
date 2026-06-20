import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
            <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/tasks" className="text-gray-500 hover:text-gray-900 transition-colors font-medium">
              Tasks
            </Link>
            <Link href="/resources" className="text-gray-500 hover:text-gray-900 transition-colors font-medium">
              Resources
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
