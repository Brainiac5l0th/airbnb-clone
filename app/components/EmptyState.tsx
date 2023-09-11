"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60h] flex flex-col items-center gap-2 justify-center">
      <Heading title={title} subTitle={subtitle} center />
      {showReset && (
        <div className="w-[250px]">
          <Button
            outline
            label={"Remove all filters"}
            onClick={() => router.push("/")}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
