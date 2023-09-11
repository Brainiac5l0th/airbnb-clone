import { NextResponse as Res } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

const handler = async (req: Request, { params }: { params: IParams }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return Res.error();

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") return Res.error();

    // deleteMany to check both userid and listing id
    const listing = await prisma.listing.deleteMany({
      where: { id: listingId, userId: currentUser.id },
    });

    return Res.json(listing);
  } catch (error) {
    return Res.error();
  }
};

export { handler as DELETE };
