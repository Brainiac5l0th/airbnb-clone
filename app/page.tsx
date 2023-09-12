import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IPropertiesParams } from "./actions/getListings";
import { SafeListing } from "./types";

import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IPropertiesParams;
}

export const dynamic = "force-dynamic";

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  // if there is nothing in the listings
  // show empty state
  if (listings.length === 0) {
    return (
      <Container>
        <div className="pt-24">
          <EmptyState showReset />
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div
        className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8"
      >
        {listings.map((el: SafeListing) => (
          <ListingCard key={el.id} data={el} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
