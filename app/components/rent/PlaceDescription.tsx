"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import Heading from "../Heading";
import Input from "../inputs/Input";

interface PlaceDescriptionProps {
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  errors: FieldErrors;
}
const PlaceDescription: React.FC<PlaceDescriptionProps> = ({
  register,
  disabled,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subTitle="Short and sweet works best"
      />
      <Input
        id="title"
        label="Title"
        disabled={disabled}
        required
        register={register}
        errors={errors}
      />
      <hr />
      <Input
        id="description"
        label="Description"
        disabled={disabled}
        required
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default PlaceDescription;
