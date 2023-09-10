import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoritesListing";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  // unauthorized if there is no logged in user
  if (!currentUser) {
    return <EmptyState title="Unauthorized!" subtitle="Please login." />;
  }

  const favorites = await getFavoriteListing();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No Favorites found!"
        subtitle="Click on Heart icon to add to favorites"
      />
    );
  }
  return <FavoritesClient currentUser={currentUser} favoritesListing={favorites}/>;
};

export default FavoritesPage;
