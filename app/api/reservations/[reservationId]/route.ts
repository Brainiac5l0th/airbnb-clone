import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

const handler = async (req: Request, { params }: { params: IParams }) => {
  try {
    // current user information
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    // destructure reservation id from the params
    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      return NextResponse.error();
    }

    // delete the object with this reservation id
    // also, creator of the listing also can delete reservation
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    // return response 
    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.error();
  }
};

export { handler as DELETE };
