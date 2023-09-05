import prisma from "@/app/libs/prismadb";

interface ParamsType {
  listingId: string;
}

const getListingById = async (params: ParamsType) => {
  try {
    // destructure listing id from params object
    const { listingId } = params;

    // look up in the database for listing with this id
    const listing = await prisma?.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    // if no listing found, return null
    if (!listing) return null;

    // filter result and convert date data to string type data
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListingById;
