"use client";
import { Suspense } from "react";

import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

import Loading from "@/app/loading";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white shadow-md z-[10]">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Suspense fallback={<Loading />}>
              <Search />
            </Suspense>
            <UserMenu user={currentUser} />
          </div>
        </Container>
      </div>
      <Suspense fallback={<Loading />}>
        <Categories />
      </Suspense>
    </div>
  );
};

export default Navbar;
