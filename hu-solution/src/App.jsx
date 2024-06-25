import { useState } from "react";
import Header from "./components/Header";
import { exportBookings, getCalendarRange } from "./lib/utils";
import CalendarDays from "./components/calendar/CalendarDays";
import { useRooms } from "./hooks/useRooms";
import { useBookings } from "./hooks/useBookings";
import RoomRow from "./components/rooms/RoomRow";
import RoomTypes from "./components/filter/RoomTypes";
import UnassignedBookingItem from "./components/bookings/UnassignedBookingItem";
import { useRef } from "react";
import UnassignedBookingContainer from "./components/bookings/UnassignedBookingContainer";

/**
 * Store the room types
 */
export const roomTypes = {
  Deluxe: "#3d5876",
  Standard: "#528c7f",
  Suite: "#2f80ed",
  Single: "#00b4e4",
  Double: "#e56f8c",
};

/**
 * Store the api base
 */
export const API_BASE = "http://hh-hotel.kr:7078/api/v1";

/**
 * The entrypoint of the application
 */
const App = () => {
  const mainRef = useRef(null);

  /**
   * Fetch the data
   */
  const { rooms, resetRooms } = useRooms();
  const { bookings, resetBookings, setBookings } = useBookings();

  /**
   * Important state
   */
  const [activeDay, setActiveDay] = useState(8);
  const calendarRange = getCalendarRange(activeDay);
  const [selectedRoomType, setSelectedRoomType] = useState(
    Object.keys(roomTypes)[0]
  );

  /**
   * DND states
   */
  const [draggedBooking, setDraggedBooking] = useState(null);
  const [draggedUnassignedBooking, setDraggedUnassignedBooking] =
    useState(null);

  return (
    <main ref={mainRef}>
      <Header
        bookings={bookings}
        mainRef={mainRef}
        setBookings={setBookings}
        onResetBtnClick={() => Promise.all([resetRooms(), resetBookings()])}
        onExportBtnClick={() =>
          exportBookings(
            bookings.filter(
              (x) => !!x.roomId && x.roomType === selectedRoomType
            )
          )
        }
      />

      <div className="row main-wrapper">
        {/* Calendar View */}
        <div className="calendar">
          <CalendarDays
            calendarRange={calendarRange}
            onDayClick={(day) => setActiveDay(day)}
          />
          {rooms
            .filter((x) => x.roomType === selectedRoomType)
            .map((room) => (
              <RoomRow
                draggedUnassignedBooking={draggedUnassignedBooking}
                setDraggedUnassignedBooking={setDraggedUnassignedBooking}
                room={room}
                key={room.id}
                bookings={bookings.filter((x) => x.roomId == room.id)}
                calendarRange={calendarRange}
                draggedBooking={draggedBooking}
                setDraggedBooking={setDraggedBooking}
                setBookings={setBookings}
              />
            ))}
        </div>

        {/* Room Filtering */}
        <div className="room-filtering">
          <RoomTypes
            selectedRoomType={selectedRoomType}
            onRoomTypeSelect={(roomType) => setSelectedRoomType(roomType)}
          />

          <UnassignedBookingContainer
            draggedBooking={draggedBooking}
            setBookings={setBookings}
            setDraggedBooking={setDraggedBooking}
          >
            {bookings
              .filter((x) => !x.roomId && x.roomType === selectedRoomType)
              .map((booking) => (
                <UnassignedBookingItem
                  booking={booking}
                  key={booking.id}
                  setActiveDay={setActiveDay}
                  draggedBooking={draggedBooking}
                  draggedUnassignedBooking={draggedUnassignedBooking}
                  setDraggedUnassignedBooking={setDraggedUnassignedBooking}
                />
              ))}
          </UnassignedBookingContainer>
        </div>
      </div>
    </main>
  );
};

export default App;
