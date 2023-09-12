"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const guestCount = params?.get("guestCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");

  // formatting search labels based on user query
  // location label
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  // date label / duration label
  const dateLabel = useMemo(() => {
    if (startDate && endDate) {
      let diff = differenceInDays(new Date(endDate), new Date(startDate));

      if (diff === 0) diff = 1;

      return `${diff} days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  // guest label
  const guestCountLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer"
    >
      <div
        className="
            flex 
            items-center justify-between"
      >
        <div
          className="
                text-sm     font-semibold px-6"
        >
          {locationLabel}
        </div>
        <div
          className="
                hidden 
                sm:block 
                text-sm 
                font-semibold 
                px-6 
                border-x-[1px] 
                flex-1 
                text-center"
        >
          {dateLabel}
        </div>
        <div
          className="
                text-sm 
                pl-6 
                pr-2 
                text-gray-600 
                flex 
                flex-row 
                items-center 
                gap-3"
        >
          <div className="hidden sm:block">{guestCountLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
