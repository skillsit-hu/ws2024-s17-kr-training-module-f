import React from "react";

/**
 * Component for displayign the calendar days
 */
const CalendarDays = ({ calendarRange, onDayClick }) => {
  return (
    <div className="calendar-row" style={{ marginLeft: "78px" }}>
      {Array.from({ length: calendarRange.to - calendarRange.from + 1 })
        .fill("")
        .map((_, idx) => (
          <button
            key={idx + calendarRange.from}
            className="day-btn"
            onClick={() => onDayClick(idx + calendarRange.from)}
          >
            {idx + calendarRange.from}
          </button>
        ))}
    </div>
  );
};

export default CalendarDays;
