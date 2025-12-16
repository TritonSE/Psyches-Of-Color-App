import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "../contexts/AuthContext";

import type { Metadata } from "next";

import { ContextEditorProvider } from "@/contexts/ContentEditorContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Psyches of Color - Admin Portal",
  description: "Admin portal for Psyches of Color app management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <ContextEditorProvider>{children}</ContextEditorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
