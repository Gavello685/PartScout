import type { Metadata } from "next";
import { ReactNode } from "react";
import { AppNav } from "./components/app-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "PartScout",
  description: "Electronics BOM price comparison tool"
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <div className="brand">PartScout</div>
            <AppNav />
          </aside>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
