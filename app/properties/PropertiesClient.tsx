"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

import { SafeListing, SafeUser } from "../types";

interface PropertiesClientProps {
  properties: SafeListing[];
  currentUser?: SafeUser | null;
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  properties,
  currentUser,
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");
  // handlers
  // function :: onCancel
  // @params :: id, string type
  // api call to remove id from reservation list
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Property deleted!");
          router.refresh();
        })
        .catch((error: any) => toast.error("Something went wrong!"))
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties." />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties?.map((el) => (
          <ListingCard
            key={el.id}
            onAction={onCancel}
            data={el}
            actionLabel={"Delete Property"}
            showHeart={false}
            disabled={deletingId === el.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
