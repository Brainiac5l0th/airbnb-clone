import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Navbar from "./components/navabar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Air BnB",
  description: "Airbnb clone website using full stack next",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
