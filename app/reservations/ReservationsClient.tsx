"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";

interface ReservationsClientProps {
  reservations: SafeReservation[] | undefined;
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      // api call for deleting reservation
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled!");

          // refresh the router
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations?.map((el) => (
          <ListingCard
            key={el.id}
            reservation={el}
            data={el.listing}
            actionLabel="Cancel guest reservation"
            actionId={el.id}
            disabled={el.id === deletingId}
            currentUser={currentUser}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
