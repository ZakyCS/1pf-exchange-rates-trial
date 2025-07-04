import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import {ThemeProvider} from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trial Project for Company 1.PF",
  description: "A trial project for Company 1.PF featuring exchange rates and currency data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-4xl mx-auto`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={['light', 'dark', 'system']}
        >
          <div className="min-h-screen">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}