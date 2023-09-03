"use client";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRendModal";

import CategoryList from "../rent/CategoryList";
import Information from "../rent/Information";
import Location from "../rent/Location";
import PlaceDescription from "../rent/PlaceDescription";
import PlaceImage from "../rent/PlaceImage";
import PlacePrice from "../rent/PlacePrice";
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
  const [isLoading, setIsLoading] = useState(false);

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
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

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
    bodyContent = <Location location={location} setter={setCustomValue} />;
  }

  //
  if (step === STEPS.INFO) {
    bodyContent = (
      <Information
        roomCount={roomCount}
        guestCount={guestCount}
        bathroomCount={bathroomCount}
        setter={setCustomValue}
      />
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = <PlaceImage imageSrc={imageSrc} setter={setCustomValue} />;
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <PlaceDescription
        register={register}
        errors={errors}
        disabled={isLoading}
      />
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <PlacePrice register={register} errors={errors} disabled={isLoading} />
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
