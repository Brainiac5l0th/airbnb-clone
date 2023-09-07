import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async (params: IParams) => {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) query.listingId = listingId;

    if (userId) query.userId = userId;

    if (authorId) query.listing = { userId: authorId };

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: "desc" },
    });

    // create safe reservation and convert date to string
    const safeReservations = reservations.map((el) => ({
      ...el,
      createdAt: el.createdAt.toISOString(),
      startDate: el.startDate.toISOString(),
      endDate: el.endDate.toISOString(),
      listing: {
        ...el.listing,
        createdAt: el.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    console.log("server side error!");
  }
};

export default getReservations;
