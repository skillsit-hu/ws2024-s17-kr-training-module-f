/**
 * Function for calculating the calendar range based on the active calendar position
 */
export function getCalendarRange(day) {
  if (day <= 7) {
    return { from: 1, to: 15 };
  }

  if (day >= 24) {
    return { from: 16, to: 30 };
  }

  return { from: day - 7, to: day + 7 };
}

/**
 * Exporting the current room assingment
 */
export function exportBookings(bookings) {
  let csv = "bookingId,roomId\n";
  for (const b of bookings) {
    csv += `${b.id},${b.roomId}\n`;
  }

  // Export
  const a = document.createElement("a");
  a.download = "hhh-bookings.csv";
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/plain" }));
  a.click();
}

/**
 * Function for detecting whether two date paris are overlapped
 */
export function areDatesOverlapping(dateFrom1, dateTo1, dateFrom2, dateTo2) {
  const dateFrom1Day = dateFrom1.getDate();
  const dateTo1Day = dateTo1.getDate();
  const dateFrom2Day = dateFrom2.getDate();
  const dateTo2Day = dateTo2.getDate();

  return (
    between(dateFrom1Day, [dateFrom2Day, dateTo2Day], false) ||
    between(dateTo1Day, [dateFrom2Day, dateTo2Day], false) ||
    (dateFrom1Day < dateFrom2Day && dateTo1Day > dateTo2Day)
  );
}

/**
 * Function for calculating the between
 */
export function between(what, [x, y], equals = true) {
  if (equals) {
    return what >= x && what <= y;
  } else {
    return what > x && what < y;
  }
}
