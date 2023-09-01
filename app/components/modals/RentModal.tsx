"use client";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRendModal";

import dynamic from "next/dynamic";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import CategoryList from "../rent/CategoryList";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  // hooks
  const rentModal = useRentModal();
  // form controll using hooks
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      roomCount: 1,
      guestCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      title: "",
      description: "",
      price: 1,
    },
  });

  // states
  // page count: for stepper
  const [step, setStep] = useState(STEPS.CATEGORY);

  // handlers
  // onBack helps to get back on stepper
  const onBack = () => {
    setStep((value) => value - 1);
  };

  // on Next helps to go to next on stepper
  const onNext = () => {
    setStep((value) => value + 1);
  };

  // action label filtering for each other page
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";

    return "Next";
  }, [step]);

  // secondary action label
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  // For category list
  // telling useform-hook to watch changes in category
  const category = watch("category");
  const location = watch("location");

  // dynamically import map
  const Map = useMemo(() => {
    return dynamic(() => import("../Map"), { ssr: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  //
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };
  // decide what to render
  // main body content
  // let : beacause content will change
  let bodyContent;

  if (step === STEPS.CATEGORY) {
    bodyContent = <CategoryList category={category} onClick={setCustomValue} />;
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place Located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb! Your home"
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      isOpen={rentModal.isOpen}
      body={bodyContent}
    />
  );
};

export default RentModal;
