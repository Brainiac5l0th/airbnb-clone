"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import useRentModal from "@/app/hooks/useRendModal";
import { SafeUser } from "@/app/types";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  user?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  // states
  const [isOpen, setIsOpen] = useState(false);

  // handlers
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // handler to open rent modal
  const onRent = useCallback(() => {
    if (!user) return loginModal.onOpen();

    rentModal.onOpen();
  }, [loginModal, user, rentModal]);

  // content to render
  const guestContent = (
    <>
      <MenuItem onClick={loginModal.onOpen} label="Login" />
      <MenuItem onClick={registerModal.onOpen} label="Sign up" />
    </>
  );

  const loggedInUserContent = (
    <>
      <MenuItem onClick={() => router.push("/trips")} label="My Trips" />
      <MenuItem
        onClick={() => router.push("/favorites")}
        label="My Favorites"
      />
      <MenuItem
        onClick={() => router.push("/reservations")}
        label="My Reservations"
      />
      <MenuItem onClick={() => {}} label="My Properties" />
      <MenuItem onClick={onRent} label="Airbnb My Home" />
      <hr />
      <MenuItem onClick={() => signOut()} label="Logout" />
    </>
  );
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb Your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer tansition hover:shadow-md"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar imgSrc={user?.image as string} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {user ? loggedInUserContent : guestContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
