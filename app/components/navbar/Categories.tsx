"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { categories } from "@/app/utils/categories";
import CategoryBox from "../CategoryBox";
import Container from "../Container";

const Categories = () => {
  const params = useSearchParams();

  const category = params?.get("category");

  const pathname = usePathname();

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories?.map((el) => (
          <CategoryBox key={el.label} label={el.label} icon={el.icon} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
