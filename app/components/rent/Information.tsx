"use client";

import Heading from "../Heading";
import Counter from "../inputs/Counter";

interface InformationProps {
  guestCount: number;
  bathroomCount: number;
  roomCount: number;
  setter: (id: string, value: any) => void;
}

const Information: React.FC<InformationProps> = ({
  guestCount,
  roomCount,
  bathroomCount,
  setter,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subTitle="What amenities do you have?"
      />

      <Counter
        title="Guests"
        subTitle="How many guests do you allow?"
        value={guestCount}
        onChange={(value) => setter("guestCount", value)}
      />
      <hr />
      <Counter
        title="Rooms"
        subTitle="How many rooms do you have?"
        value={roomCount}
        onChange={(value) => setter("roomCount", value)}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subTitle="How many bathrooms do you have?"
        value={bathroomCount}
        onChange={(value) => setter("bathroomCount", value)}
      />
    </div>
  );
};

export default Information;
