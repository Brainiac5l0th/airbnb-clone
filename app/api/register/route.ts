import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

const handler = async (req: Request) => {
  // get body data from request
  const body = await req.json();

  // destructuring body datas
  const { email, password, name } = body;

  // salt round for hashing
  const SALT = 12;

  // hash the password
  const hashedPassword = await bcrypt.hash(password, SALT);

  // create user in the database
  const user = await prisma?.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // return response
  return NextResponse.json(user);
};

export { handler as POST };
