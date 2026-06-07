import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "P.I.N.T",
  description: "Pals Imbibing Notable Tipples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-screen flex flex-col bg-stone-950 text-amber-50">
        <nav className="border-b border-amber-900/40 bg-stone-950/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black tracking-[0.25em] text-amber-400 hover:text-amber-300 transition-colors"
            >
              P.I.N.T
            </Link>
            <div className="flex gap-8">
              <Link href="/" className="text-amber-200 hover:text-amber-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-amber-200 hover:text-amber-400 transition-colors font-medium">
                About
              </Link>
              <Link href="/people" className="text-amber-200 hover:text-amber-400 transition-colors font-medium">
                People
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-amber-900/40 py-6 text-center text-amber-700 text-sm">
          🍺 P.I.N.T — Pals Imbibing Notable Tipples · Est. somewhere between the first and third round
        </footer>
      </body>
    </html>
  );
}
