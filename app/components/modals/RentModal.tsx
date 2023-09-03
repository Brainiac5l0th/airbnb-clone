"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useRentModal from "@/app/hooks/useRendModal";

import {
  CategoryList,
  Information,
  Location,
  PlaceDescription,
  PlaceImage,
  PlacePrice,
} from "@/app/components/rent";
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
  const router = useRouter();
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

  // hanlder to hanle submit
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // if stepper is not at the last step return next call
    if (step !== STEPS.PRICE) return onNext();

    setIsLoading(true);

    // post the data to the Listings database
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((e) => {
        toast.error("Something went Wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
  // watch list
  // check whether it's value is changing or not
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  // custom value setter function to set value with some feature
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  // decide what to render
  // main body content
  // let : because content will vary for diff step
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
      onSubmit={handleSubmit(onSubmit)}
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
