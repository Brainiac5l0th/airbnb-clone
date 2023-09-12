"use client";

import { useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface ErrorProps {
  error?: Error;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <EmptyState title="Oh ho!!" subtitle="Something went wrong! Try again." />
  );
};

export default Error;
