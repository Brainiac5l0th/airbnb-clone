"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { categories } from "@/app/utils/categories";
import CategoryBox from "../CategoryBox";
import Container from "../Container";

const Categories = () => {
  // hooks
  const params = useSearchParams();

  // get category from the params
  const category = params?.get("category");

  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;
  return (
    <Container>
      <div
        className="pt-4 flex flex-row items-center justify-between overflow-x-auto scrollbar 
        scrollbar-h-[3px]
        scrollbar-rounded-lg scrollbar-thumb-rose-400"
      >
        {categories?.map((el) => (
          <CategoryBox
            key={el.label}
            label={el.label}
            icon={el.icon}
            selected={category === el.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
