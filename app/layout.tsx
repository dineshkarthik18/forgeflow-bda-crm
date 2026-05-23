import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Factory, GitBranch, UsersRound } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ForgeFlow BDA CRM",
  description: "Manufacturing business development workflow for lead pipelines, quotations, communication, and team performance."
};

const nav = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "#pipeline", label: "Pipeline", icon: GitBranch },
  { href: "#team", label: "Team", icon: UsersRound }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/92 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
              <span className="grid h-9 w-9 place-items-center rounded bg-steel text-white">
                <Factory size={19} />
              </span>
              <span>ForgeFlow BDA CRM</span>
            </Link>
            <nav className="flex items-center gap-1">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="focus-ring flex h-10 items-center gap-2 rounded px-3 text-sm font-medium text-ink/72 transition hover:bg-white hover:text-ink"
                  >
                    <Icon size={17} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
