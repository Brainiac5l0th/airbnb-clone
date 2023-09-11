import prisma from "@/app/libs/prismadb";

export interface IPropertiesParams {
  userId?: string;
  guestCount?: string;
  roomCount?: string;
  bathroomCount?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
const getListings = async (params: IPropertiesParams) => {
  try {
    // destructuring
    const {
      userId,
      bathroomCount,
      category,
      endDate,
      guestCount,
      locationValue,
      roomCount,
      startDate,
    } = params;

    let query: any = {};

    // set userid to query userid
    if (userId) query.userId = userId;

    // set query params if there is any category
    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservation: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
            ],
          },
        },
      };
    }

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
