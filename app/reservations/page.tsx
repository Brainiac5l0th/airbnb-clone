import React from "react";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

interface ReservationPageProps {}

const ReservationPage: React.FC<ReservationPageProps> = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState subtitle="Please login" title="Unauthorized!" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations && reservations?.length === 0) {
    return (
      <EmptyState
        title="No reservations found!"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }
  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationPage;
