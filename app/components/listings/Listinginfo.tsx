"use client";

import dynamic from "next/dynamic";

import useCountries from "@/app/hooks/useCountries";

import { SafeListing, SafeUser } from "@/app/types";
import { CategoryType } from "@/app/utils/categories";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  info: SafeListing & { user: SafeUser };
  category: CategoryType | undefined;
}

const Listinginfo: React.FC<ListingInfoProps> = ({ category, info }) => {
  const {
    guestCount,
    roomCount,
    bathroomCount,
    description,
    locationValue,
    user,
  } = info;

  const { getByValue } = useCountries();

  const cordinates = getByValue(locationValue);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar imgSrc={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory category={category} />}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={cordinates?.latlng} />
    </div>
  );
};

export default Listinginfo;
