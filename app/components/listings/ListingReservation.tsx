"use client";

import { Range } from "react-date-range";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: void;
}
const ListingReservation: React.FC<ListingReservationProps> = () => {
  return <div>ListingReservation</div>;
};

export default ListingReservation;
