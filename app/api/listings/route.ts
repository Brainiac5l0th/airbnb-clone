import { NextResponse as res } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

const handler = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return res.error();
  }
  // get body from next/request data
  const body = await req.json();

  // destructure the body send by the user
  const {
    category,
    location,
    roomCount,
    bathroomCount,
    guestCount,
    imageSrc,
    title,
    description,
    price,
  } = body;

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       return res.error();
  //     }
  //   });

  // save information in the database
  const listing = await prisma?.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      title,
      description,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return res.json(listing);
};

export { handler as POST };
