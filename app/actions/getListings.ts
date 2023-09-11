import prisma from "@/app/libs/prismadb";

export interface IPropertiesParams {
  userId?: string;
}
const getListings = async (params: IPropertiesParams) => {
  try {
    // destructuring
    const { userId } = params;

    let query: any = {};

    // set userid to query userid
    if (userId) query.userId = userId;

    // search for listings with or without the listing id
    // query can be null object
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    // default type casting
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    // return the listings
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListings;
