import { useState } from "react";
import UnassignedBookingItem from "./UnassignedBookingItem";

/**
 * Component for the unassigned booking container
 */
const UnassignedBookingContainer = ({
  children,
  draggedBooking,
  setDraggedBooking,
  setBookings,
}) => {
  const [draggedOver, setDraggedOver] = useState(false);

  function handleDrop() {
    setDraggedOver(false);
    if (!draggedBooking) return;

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id == draggedBooking.id ? { ...booking, roomId: "" } : booking
      )
    );
    setDraggedBooking(null);
  }

  return (
    <div
      className="unassigned-booking-container"
      onDragOver={(e) => {
        e.preventDefault();
        if (draggedBooking) {
          setDraggedOver(true);
        }
      }}
      onDragLeave={() => setDraggedOver(false)}
      onDrop={handleDrop}
      style={{
        background: draggedOver ? "#ccc" : "white",
      }}
    >
      {children}
      {draggedOver && (
        <div style={{ opacity: 0.25, pointerEvents: "none" }}>
          <UnassignedBookingItem
            booking={draggedBooking}
            draggedBooking={null}
          />
        </div>
      )}
    </div>
  );
};

export default UnassignedBookingContainer;
