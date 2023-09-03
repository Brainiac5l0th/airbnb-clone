import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import ToasterProvider from "./providers/ToasterProvider";

import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Air BnB",
  description: "Airbnb clone website using full stack next",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
