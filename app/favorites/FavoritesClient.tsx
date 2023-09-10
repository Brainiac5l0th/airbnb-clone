"use client";
import React from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
  currentUser?: SafeUser | null;
  favoritesListing: SafeListing[];
}
const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favoritesListing,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favoritesListing.map((el) => (
          <ListingCard
            key={el.id}
            showHeart={false}
            data={el}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
