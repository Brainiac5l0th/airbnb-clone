"use client";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRendModal";

import { categories } from "@/app/utils/categories";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
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
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };

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
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subTitle="Pick a Category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto scrollbar scrollbar-w-[5px] scrollbar-rounded-lg scrollbar-thumb-rose-400 scrollbar-track-neutral-500">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={() => {}}
                selected={false}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
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
