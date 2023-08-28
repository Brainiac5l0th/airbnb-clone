import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

const getCurrentUser = async () => {
  try {
    // get server session information
    const session = await getSession();

    // if there is no session return null
    if (!session?.user?.email) {
      return null;
    }

    // look up for the user information in the DB
    const currentUser = await prisma.user.findUnique({
      where: { email: session?.user.email },
    });

    if (!currentUser) return null;

    // return current user information
    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
