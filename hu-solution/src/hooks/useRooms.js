import { useEffect } from "react";
import { useState } from "react";
import { API_BASE } from "../App";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Hook that fetches the rooms
 */
export function useRooms() {
  const [rooms, setRooms] = useState([]);

  /**
   * Fetch the rooms
   */
  useEffect(() => {
    (async () => {
      const roomsFromLs = localStorage.getItem("rooms");
      if (roomsFromLs) {
        setRooms(JSON.parse(roomsFromLs));
        return;
      }

      const res = await fetch(`${API_BASE}/rooms`);
      const json = await res.json();
      setRooms(json);
    })();
  }, []);

  /**
   * Update the rooms in the local storage
   */
  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  /**
   * Function for resetting the rooms
   */
  async function resetRooms() {
    const res = await fetch(`${API_BASE}/rooms`);
    const json = await res.json();
    setRooms(json);
  }

  return { rooms, setRooms, resetRooms };
}
