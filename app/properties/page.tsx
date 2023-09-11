import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  // if there is no logged in user, show emptystate
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  // if there is a user, get all property list againt the user
  const properties = await getListings({ userId: currentUser?.id });

  // if there is no properties, show empty state
  if (properties?.length === 0) {
    return (
      <EmptyState
        title="No properties found!"
        subtitle="Looks like you haven't submitted any property details yet."
      />
    );
  }
  return <PropertiesClient properties={properties} currentUser={currentUser} />;
};

export default PropertiesPage;
