import React from "react";

/**
 * Component for displaying one room cell in the calendar
 */
const RoomCell = ({
  bookings,
  day,
  visible,
  draggedBooking,
  setDraggedBooking,
  draggedUnassignedBooking,
}) => {
  if (!visible) return null;

  // Get the bookings
  const filteredBookings = bookings.filter((booking) => {
    const bookingFrom = new Date(booking.checkInDate).getDate();
    const bookingTo = new Date(booking.checkOutDate).getDate();

    return bookingFrom <= day && bookingTo >= day;
  });

  return (
    <div
      className="room-cell"
      style={{ pointerEvents: draggedUnassignedBooking ? "none" : "unset" }}
    >
      {filteredBookings.length === 0 && "---"}
      {filteredBookings.map((booking) => (
        <div
          draggable
          onDragStart={() => setDraggedBooking(booking)}
          onDragEnd={() => setDraggedBooking(null)}
          onClick={() =>
            "clipboard" in navigator
              ? navigator.clipboard.writeText(JSON.stringify(booking))
              : alert("Your browser does not support the copying!")
          }
          className="booking-cell-item"
          style={{
            backgroundColor: `#DD${booking.id.at(-2)}D${booking.id.at(-1)}D`,
            opacity: draggedBooking?.id === booking.id ? 0.25 : 1,
          }}
        >
          {booking.id.at(-3) + booking.id.at(-2) + booking.id.at(-1)}
        </div>
      ))}
    </div>
  );
};

export default RoomCell;
