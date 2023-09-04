"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  // hooks
  const router = useRouter();
  const loginModal = useLoginModal();

  // if post id exists in user's favorite ids
  // returns: Boolean
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser?.favoriteIds]);

  // handler function to delete/add post to favorite
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      // if there is no user open login page
      if (!currentUser) return loginModal.onOpen();

      try {
        let request;
        // url for adding post to favorite
        const URL = `/api/favorites/${listingId}`;
        if (hasFavorited) {
          // if already in favorite, delete from favorite
          request = () => axios.delete(URL);
        } else {
          // add post id to favorite
          request = () => axios.post(URL);
        }

        await request();

        router.refresh();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavorited, router, listingId, loginModal]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
