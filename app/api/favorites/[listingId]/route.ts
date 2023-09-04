import { NextResponse as res } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

const handler = async (req: Request, { params }: { params: IParams }) => {
  //get logged in user's information
  const currentUser = await getCurrentUser();

  // if there is no loggedin user, throw error
  if (!currentUser) return res.error();

  // get listing id from the params
  const { listingId } = params;

  // check if the data is correct or not
  if (!listingId || typeof listingId !== "string") {
    throw new Error("invalid ID.");
  }

  // get the duplicate of ids immutably
  let favoriteIds = [...(currentUser?.favoriteIds || [])];

  // if user request for posting like OR adding it to the favorites
  if (req.method === "POST") {
    favoriteIds.push(listingId);
  }

  // if user request for deleting like OR removing it to the favorites
  if (req.method === "DELETE") {
    favoriteIds = favoriteIds.filter((id) => id !== listingId);
  }

  // update the user information in the database
  // with updated favorite ids
  const user = await prisma?.user.update({
    where: { id: currentUser?.id },
    data: { favoriteIds },
  });

  // return the updated user information
  return res.json(user);
};

export { handler as DELETE, handler as POST };
