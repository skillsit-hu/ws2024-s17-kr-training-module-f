import React from "react";
import { roomTypes } from "../../App";

/**
 * Compoennt for displaying one unassigned booking
 */
const UnassignedBookingItem = ({
  booking,
  setActiveDay,
  draggedBooking,
  draggedUnassignedBooking,
  setDraggedUnassignedBooking,
}) => {
  function handleBookingClick() {
    const bookingStart = new Date(booking.checkInDate).getDate();
    const bookingEnd = new Date(booking.checkOutDate).getDate();

    setActiveDay(bookingStart + Math.floor((bookingEnd - bookingStart) / 2));
  }

  return (
    <div
      onClick={handleBookingClick}
      className="unassigned-booking"
      draggable
      onDragStart={() => setDraggedUnassignedBooking(booking)}
      onDragEnd={() => setDraggedUnassignedBooking(null)}
      style={{
        borderColor: roomTypes[booking.roomType],
        pointerEvents: !draggedBooking ? "unset" : "none",
        opacity: draggedUnassignedBooking?.id == booking.id ? 0.5 : 1,
      }}
    >
      <span>{booking.id}</span>
      <span>{booking.guestName}</span>
      <span style={{ marginLeft: "auto" }}>{booking.checkInDate}</span>
      <span>{booking.checkOutDate}</span>
      <span>{booking.numberOfGuests}</span>
    </div>
  );
};

export default UnassignedBookingItem;
