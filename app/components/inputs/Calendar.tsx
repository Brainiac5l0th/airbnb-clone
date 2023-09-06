"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

// css for date range
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  onChange,
  value,
  disabledDates,
}) => {
  return (
    <DateRange
      color="#ffe4e6"
      disabledDates={disabledDates}
      ranges={[value]}
      onChange={onChange}
      date={new Date()}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      showMonthAndYearPickers={false}
    />
  );
};

export default Calendar;
