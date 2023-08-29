"use client";

import Image from "next/image";
interface AvatarProps {
  imgSrc: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ imgSrc }) => {
  return (
    <Image
      className="rounded-full"
      src={imgSrc || "/images/placeholder.png"}
      alt="avatar"
      height={"30"}
      width={"30"}
    />
  );
};

export default Avatar;
