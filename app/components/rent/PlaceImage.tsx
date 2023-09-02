"use client";

import Heading from "../Heading";
import ImageUpload from "../inputs/ImageUpload";

interface PlaceImageProps {
  imageSrc: string;
  setter: (id: string, value: any) => void;
}

const PlaceImage: React.FC<PlaceImageProps> = ({ imageSrc, setter }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subTitle="show guests what your place looks like"
      />
      <ImageUpload
        value={imageSrc}
        onChange={(value) => setter("imageSrc", value)}
      />
    </div>
  );
};

export default PlaceImage;
