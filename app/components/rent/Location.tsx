"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";

interface LocationProps {
  location: CountrySelectValue;
  setter: (id: string, value: any) => void;
}

const Location: React.FC<LocationProps> = ({ location, setter }) => {
    
  // dynamically import map
  const Map = useMemo(() => {
    return dynamic(() => import("../Map"), { ssr: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place Located?"
        subTitle="Help guests find you!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setter("location", value)}
      />

      <Map center={location?.latlng} />
    </div>
  );
};

export default Location;
