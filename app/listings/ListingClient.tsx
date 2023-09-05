"use client";

import { useMemo } from "react";

import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "../types";
import { categories } from "../utils/categories";

import Container from "../components/Container";
import ListingHead from "../components/listings/ListingHead";
import Listinginfo from "../components/listings/Listinginfo";

interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  // get category object information from categories
  const category = useMemo(() => {
    return categories.find((el) => el.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <Listinginfo info={listing} category={category} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
