import React from "react";
import { roomTypes } from "../../App";

/**
 * Component for displaying the room types
 */
const RoomTypes = ({ onRoomTypeSelect, selectedRoomType }) => {
  return (
    <div className="row" style={{ marginTop: "12px" }}>
      {Object.entries(roomTypes).map(([name, color]) => (
        <button
          key={name}
          style={{
            backgroundColor: color,
            border:
              selectedRoomType == name
                ? "3px solid #9e9999"
                : `3px solid ${color}`,
          }}
          className="room-filter-btn"
          onClick={() => onRoomTypeSelect(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default RoomTypes;
