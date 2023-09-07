import { NextResponse as res } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

const handler = async (req: Request) => {
  try {
    // get current user information
    const currentUser = await getCurrentUser();

    // if there is no loggedin user, return error
    if (!currentUser) return res.error();

    // parse body data from request
    const body = await req.json();

    // destructuring
    const { listingId, startDate, endDate, totalPrice } = body;

    // if any of the field is missing, return error
    if (!listingId || !startDate || !endDate || !totalPrice) return res.error();

    // update listing alongside creating new reservation
    const listingReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservation: {
          create: {
            userId: currentUser?.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    // if there is listing reservation created, return created/updated one
    res.json(listingReservation);
  } catch (error) {
    return res.json("Server side error");
  }
};

export { handler as POST };
