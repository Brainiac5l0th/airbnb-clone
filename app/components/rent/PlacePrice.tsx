"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Heading from "../Heading";
import Input from "../inputs/Input";

interface PlacePriceProps {
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  errors: FieldErrors;
}
const PlacePrice: React.FC<PlacePriceProps> = ({
  errors,
  register,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subTitle="How much do you charge per night?"
      />
      <Input
        id={"price"}
        label="Price"
        errors={errors}
        register={register}
        disabled={disabled}
        type={"number"}
        formatPrice
        required
      />
    </div>
  );
};

export default PlacePrice;
