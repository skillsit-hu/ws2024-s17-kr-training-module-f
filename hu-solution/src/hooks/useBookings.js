import { useEffect } from "react";
import { useState } from "react";
import { API_BASE } from "../App";

/**
 * Hook that fetches the bookings
 */
export function useBookings() {
  const [bookings, setBookings] = useState([]);

  /**
   * Fetch the bookings
   */
  useEffect(() => {
    (async () => {
      const bookingsFromLs = localStorage.getItem("bookings");
      if (bookingsFromLs) {
        setBookings(JSON.parse(bookingsFromLs));
        return;
      }

      const res = await fetch(`${API_BASE}/bookings`);
      const json = await res.json();
      setBookings(json);
    })();
  }, []);

  /**
   * Update the bookings in the local storage
   */
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  /**
   * Function for resetting the bookings
   */
  async function resetBookings() {
    const res = await fetch(`${API_BASE}/bookings`);
    const json = await res.json();
    setBookings(json);
  }

  return { bookings, setBookings, resetBookings };
}
