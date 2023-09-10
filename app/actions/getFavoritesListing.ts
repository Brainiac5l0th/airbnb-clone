import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

const getFavoriteListing = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((el) => ({
      ...el,
      createdAt: el.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getFavoriteListing;
