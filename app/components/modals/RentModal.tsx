"use client";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRendModal";

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

  // states
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

  // decide what to render
  // main body content
  // let : beacause content will change
  let bodyContent;

  if (step === STEPS.CATEGORY) {
    bodyContent = <CategoryList />;
  }

  return (
    <Modal
      title="Airbnb! Your home"
      onSubmit={() => {
        console.log("submit");
      }}
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
