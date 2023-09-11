"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";

import useSearchModal from "@/app/hooks/useSearchModal";

import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Modal from "./Modal";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  // hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchModal = useSearchModal();

  // states
  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // dynamically import map based on location
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  // action label for the modal
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  // secondary action label for modal
  const secondartyActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  // handlers
  // handler for stepper to move back
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  // handler for stepper to move next
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // submit handler
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    // if there is any searchparams already, parse them into one
    if (searchParams) {
      currentQuery = queryString.parse(searchParams.toString());
    }

    // create object as query to pass to router
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    //if there is date convert them into string
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    // make passable url with help of querystring
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // set stepper on first step
    setStep(STEPS.LOCATION);
    // close the modal
    searchModal.onClose();

    // push the url to the router
    router.push(url);
  }, [
    step,
    onNext,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    location?.value,
    router,
    searchModal,
    searchParams,
  ]);

  let bodyContent;

  // default body content
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you wanna go?"
          subTitle="Find the perfect location."
        />
        <CountrySelect
          value={location}
          onChange={(value) => {
            setLocation(value as CountrySelectValue);
          }}
        />
        <hr />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you wanna go?"
          subTitle="Make sure everyone is available."
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subTitle="Find your perfect place" />
        <Counter
          title="Guests"
          subTitle="How many guests are coming?"
          value={guestCount}
          onChange={(value: number) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subTitle="How many Rooms you want?"
          value={roomCount}
          onChange={(value: number) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms preferrable?"
          value={bathroomCount}
          onChange={(value: number) => setBathroomCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondartyActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
