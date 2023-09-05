"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "../hooks/useFavorite";

import { SafeUser } from "../types";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
  bigger?: boolean;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
  bigger,
}) => {
  // hooks
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={bigger ? 32 : 28}
        className={"fill-white absolute -top-[2px] -right-[2px]"}
      />
      <AiFillHeart
        size={bigger ? 28 : 24}
        className={`${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
    </div>
  );
};

export default HeartButton;
