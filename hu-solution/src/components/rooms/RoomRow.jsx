import React from "react";
import { roomTypes } from "../../App";
import RoomCell from "./RoomCell";
import { useState } from "react";
import { areDatesOverlapping } from "../../lib/utils";

/**
 * Component for displaying one room
 */
const RoomRow = ({
  room,
  bookings,
  calendarRange,
  draggedBooking,
  setDraggedBooking,
  draggedUnassignedBooking,
  setDraggedUnassignedBooking,
  setBookings,
}) => {
  const [draggedOver, setDraggedOver] = useState(false);

  const hasOverlappingBooking = !draggedUnassignedBooking
    ? false
    : bookings.some((x) =>
        areDatesOverlapping(
          new Date(draggedUnassignedBooking.checkInDate),
          new Date(draggedUnassignedBooking.checkOutDate),
          new Date(x.checkInDate),
          new Date(x.checkOutDate)
        )
      );

  function handleDrop() {
    setDraggedOver(false);
    if (!draggedUnassignedBooking) return null;
    if (hasOverlappingBooking) return;

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id == draggedUnassignedBooking.id
          ? { ...booking, roomId: room.id }
          : booking
      )
    );
    setDraggedUnassignedBooking(null);
  }

  return (
    <div
      className="calendar-row"
      onDragOver={(e) => {
        e.preventDefault();
        if (draggedUnassignedBooking) setDraggedOver(true);
      }}
      onDragLeave={() => setDraggedOver(false)}
      onDrop={handleDrop}
      style={{
        outlineOffset: "2px",
        outline: draggedOver
          ? hasOverlappingBooking
            ? "2px solid red"
            : "2px solid green"
          : undefined,
        background: draggedOver
          ? hasOverlappingBooking
            ? "#ff000030"
            : "#00ff0030"
          : undefined,
      }}
    >
      <div
        className="room-name"
        style={{
          backgroundColor: roomTypes[room.roomType],
          pointerEvents: draggedUnassignedBooking ? "none" : "unset",
        }}
      >
        {room.id}
      </div>

      {/* Bookings */}
      {Array.from({ length: 30 })
        .fill("")
        .map((_, idx) => (
          <RoomCell
            key={`${idx}-${room.id}`}
            day={idx + 1}
            bookings={bookings}
            room={room}
            draggedUnassignedBooking={draggedUnassignedBooking}
            visible={
              calendarRange.from <= idx + 1 && calendarRange.to >= idx + 1
            }
            draggedBooking={draggedBooking}
            setDraggedBooking={setDraggedBooking}
          />
        ))}
    </div>
  );
};

export default RoomRow;
