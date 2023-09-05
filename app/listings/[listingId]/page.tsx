import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

import EmptyState from "@/app/components/EmptyState";
import ListingClient from "../ListingClient";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  // if there is no listing
  // show emptystate
  if (!listing) return <EmptyState />;

  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
